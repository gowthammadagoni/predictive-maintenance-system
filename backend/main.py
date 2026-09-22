from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os


# --------------------------------------------------
# Create FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="Predictive Maintenance API",
    description="Machine failure prediction using sensor data",
    version="1.0"
)


# --------------------------------------------------
# CORS configuration
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Load trained ML model
# --------------------------------------------------

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "model.pkl"
)

model_data = joblib.load(MODEL_PATH)

model = model_data["model"]
scaler = model_data["scaler"]


# --------------------------------------------------
# Input data format
# --------------------------------------------------

class SensorData(BaseModel):
    temperature: float
    vibration: float
    pressure: float
    rpm: float
    current: float


# --------------------------------------------------
# Home API
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Predictive Maintenance API is running"
    }


# --------------------------------------------------
# Prediction API
# --------------------------------------------------

@app.post("/predict")
def predict(data: SensorData):

    # Create DataFrame with the SAME column names
    # used while training the scaler

    input_data = pd.DataFrame([{
        "temperature": data.temperature,
        "vibration": data.vibration,
        "pressure": data.pressure,
        "rpm": data.rpm,
        "current": data.current
    }])

    # Scale sensor data
    input_scaled = scaler.transform(input_data)

    # Make prediction
    prediction = model.predict(input_scaled)[0]

    # Calculate failure probability
    probability = model.predict_proba(input_scaled)[0][1]

    # Determine machine status
    if prediction == 1:
        status = "Failure Risk"
    else:
        status = "Normal"

    # Return result
    return {
        "prediction": int(prediction),
        "status": status,
        "failure_probability": round(
            float(probability) * 100,
            2
        )
    }


# --------------------------------------------------
# Run FastAPI server
# --------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000
    )