import pandas as pd
import numpy as np

np.random.seed(42)

n = 5000

machine_id = np.arange(1, n + 1)

temperature = np.random.normal(70, 10, n)
vibration = np.random.normal(5, 1.5, n)
pressure = np.random.normal(30, 5, n)
rpm = np.random.normal(1500, 200, n)
current = np.random.normal(10, 2, n)

failure = (
    (temperature > 85) |
    (vibration > 7) |
    (pressure > 38) |
    (rpm > 1800) |
    (current > 13)
).astype(int)

data = pd.DataFrame({
    "machine_id": machine_id,
    "temperature": temperature,
    "vibration": vibration,
    "pressure": pressure,
    "rpm": rpm,
    "current": current,
    "failure": failure
})

data.to_csv("../dataset/sensor_data.csv", index=False)

print("Dataset created successfully!")
print(data.head())

print("\nFailure distribution:")
print(data["failure"].value_counts())