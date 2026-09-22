import joblib
from sklearn.ensemble import RandomForestClassifier

from preprocessing import load_data, preprocess_data


DATA_PATH = "../dataset/sensor_data.csv"
MODEL_PATH = "model.pkl"


# Load dataset
df = load_data(DATA_PATH)

# Preprocess dataset
X_train, X_test, y_train, y_test, scaler = preprocess_data(df)


# Create model
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)


# Train model
model.fit(X_train, y_train)


# Save model and scaler
joblib.dump(
    {
        "model": model,
        "scaler": scaler
    },
    MODEL_PATH
)

print("\nModel trained successfully!")
print("Model saved as:", MODEL_PATH)