import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


def load_data(path):
    df = pd.read_csv(path)

    print("Dataset shape:", df.shape)
    print("\nFirst 5 rows:")
    print(df.head())

    return df


def preprocess_data(df):

    if "machine_id" in df.columns:
        df = df.drop("machine_id", axis=1)

    X = df.drop("failure", axis=1)
    y = df["failure"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    scaler = StandardScaler()

    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    return X_train, X_test, y_train, y_test, scaler