import pandas as pd
from sklearn.ensemble import IsolationForest

def detect_fraud(csv_path: str):
    # Read CSV
    df = pd.read_csv(csv_path)

    # Use numerical columns for anomaly detection
    X = df[["amount", "hour"]]

    # Train Isolation Forest
    model = IsolationForest(
        contamination=0.2,   # 20% anomalies for demo
        random_state=42
    )

    # Predict anomalies
    df["anomaly"] = model.fit_predict(X)

    # -1 = anomaly, 1 = normal
    suspicious = df[df["anomaly"] == -1]

    # Convert to list of dictionaries
    return suspicious.drop(columns=["anomaly"]).to_dict(orient="records")