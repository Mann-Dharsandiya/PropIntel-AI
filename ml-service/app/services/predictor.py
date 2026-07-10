import joblib
import pandas as pd
from pathlib import Path

# Path to the trained model
MODEL_PATH = (
    Path(__file__)
    .resolve()
    .parent.parent
    / "models"
    / "house_price_model.pkl"
)

# Load the model once when the application starts
model = joblib.load(MODEL_PATH)


def predict_price(data: dict) -> float:
    """
    Predict property price using the trained ML model.
    """

    df = pd.DataFrame([data])

    prediction = model.predict(df)

    return float(prediction[0])