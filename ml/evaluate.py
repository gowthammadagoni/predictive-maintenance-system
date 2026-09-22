import joblib
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

from preprocessing import load_data, preprocess_data


DATA_PATH = "../dataset/sensor_data.csv"
MODEL_PATH = "model.pkl"


# Load dataset
df = load_data(DATA_PATH)

# Preprocess dataset
X_train, X_test, y_train, y_test, scaler = preprocess_data(df)


# Load trained model
saved_data = joblib.load(MODEL_PATH)

model = saved_data["model"]


# Make predictions
y_pred = model.predict(X_test)


# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)

print("\nModel Accuracy:", accuracy)

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))