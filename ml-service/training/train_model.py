import pandas as pd
import joblib

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# Load Dataset
df = pd.read_csv("data/properties.csv")

# Features
X = df.drop(columns=["price"])

# Target
y = df["price"]

# Numerical Columns
numeric_features = [
    "bedrooms",
    "bathrooms",
    "area",
    "age",
    "parking",
]

# Categorical Columns
categorical_features = [
    "city",
    "propertyType",
    "furnished",
]

# Preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features,
        ),
        (
            "num",
            "passthrough",
            numeric_features,
        ),
    ]
)

# Model
model = RandomForestRegressor(
    n_estimators=200,
    random_state=42,
)

# Pipeline
pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model),
    ]
)

# Split Data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)

# Train
pipeline.fit(X_train, y_train)

# Predict
predictions = pipeline.predict(X_test)

# Evaluation
mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("=" * 50)
print("Training Complete")
print("=" * 50)
print(f"MAE : ₹{mae:,.0f}")
print(f"R²  : {r2:.4f}")

# Save Model
joblib.dump(
    pipeline,
    "app/models/house_price_model.pkl",
)

print("\nModel Saved Successfully")
print("Location: app/models/house_price_model.pkl")