# Predictive Maintenance System

An end-to-end Machine Learning application that predicts the failure risk of industrial machines using sensor data such as temperature, vibration, pressure, RPM, and current.

The system uses a Random Forest machine learning model for prediction, FastAPI for the backend REST API, and React.js for the frontend interface.

## Features

* Machine failure prediction using Machine Learning
* Random Forest classification model
* Sensor data preprocessing
* Failure probability prediction
* Input validation
* FastAPI REST API
* React.js frontend
* Real-time prediction through the web interface
* Model evaluation using classification metrics
* User-friendly dashboard for entering machine sensor values

## Technologies Used

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Random Forest

### Backend

* FastAPI
* Uvicorn
* Pydantic

### Frontend

* React.js
* JavaScript
* HTML
* CSS
* Vite

## Input Features

The model uses the following machine sensor parameters:

| Feature     | Description                                |
| ----------- | ------------------------------------------ |
| Machine ID  | Unique identifier of the machine           |
| Temperature | Machine operating temperature              |
| Vibration   | Machine vibration level                    |
| Pressure    | Operating pressure                         |
| RPM         | Revolutions per minute                     |
| Current     | Electrical current consumed by the machine |

## Output

The system provides:

* Predicted machine status
* Failure probability
* Normal operation / failure risk indication

Example:

```text
Prediction: Failure Risk
Failure Probability: 82.4%
```

## Project Structure

```text
predictive-maintenance-system/
│
├── backend/
│   ├── main.py
│   ├── model.py
│   ├── train_model.py
│   ├── requirements.txt
│   └── models/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── dataset/
│   └── predictive_maintenance.csv
│
├── README.md
└── .gitignore
```

## Machine Learning Workflow

```text
Sensor Dataset
      ↓
Data Preprocessing
      ↓
Feature Selection
      ↓
Train/Test Split
      ↓
Random Forest Model
      ↓
Model Evaluation
      ↓
Saved ML Model
      ↓
FastAPI Backend
      ↓
React Frontend
      ↓
Machine Failure Prediction
```

## Model

A Random Forest Classifier is used to predict whether a machine is likely to fail based on its sensor readings.

The model is trained using historical machine sensor data containing parameters such as:

* Temperature
* Vibration
* Pressure
* RPM
* Current

The trained model is saved and loaded by the FastAPI backend for making predictions.

## Backend API

The FastAPI backend receives machine sensor values from the React frontend and returns the prediction and failure probability.

Example request:

```json
{
  "temperature": 75,
  "vibration": 4.3,
  "pressure": 26.6,
  "rpm": 1470,
  "current": 10.7
}
```

Example response:

```json
{
  "prediction": 1,
  "status": "Failure Risk",
  "failure_probability": 82.4
}
```

## How to Run the Project

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd predictive-maintenance-system
```

### 2. Start the Backend

Open a terminal:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
python main.py
```

The backend will run locally.

FastAPI documentation can be accessed through:

```text
http://127.0.0.1:8000/docs
```

### 3. Start the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

Open the URL shown in the terminal, normally:

```text
http://localhost:5173
```

## API Integration

The React frontend communicates with the FastAPI backend using HTTP requests.

```text
React Frontend
      ↓
FastAPI API
      ↓
Random Forest Model
      ↓
Prediction + Failure Probability
      ↓
React Frontend
```

## Future Improvements

* Real-time IoT sensor integration
* Time-series based failure prediction
* Remaining Useful Life (RUL) prediction
* Automated maintenance alerts
* Database integration
* Cloud deployment
* Machine monitoring dashboard
* Historical prediction tracking

## Author

**Gowtham Madagoni**

Computer Science Engineering
CMR College of Engineering and Technology

GitHub: https://github.com/gowthammadagoni
