from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
import os

app = Flask(__name__)
CORS(app)

# Load Dataset
data = pd.read_csv("../real-estate-backend/data/properties.csv")
data = data.dropna()

# Features and Target
X = data[[
    "area",
    "bedrooms",
    "bathrooms",
    "location",
    "district",
    "property_type"
]]

y = data["price"]

# Encoding Categorical Data
ct = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            ["property_type", "location", "district"]
        )
    ],
    remainder="passthrough"
)

X_transformed = ct.fit_transform(X)

# Train Model
model = LinearRegression()
model.fit(X_transformed, y)

# Prediction Route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        input_data = request.json

        location = input_data["location"]
        area = float(input_data["area"])
        bedrooms = int(input_data["bedrooms"])
        bathrooms = int(input_data["bathrooms"])
        district = input_data["district"]
        property_type = input_data["property_type"]

        input_df = pd.DataFrame([{
            "property_type": property_type,
            "location": location,
            "district": district,
            "area": area,
            "bedrooms": bedrooms,
            "bathrooms": bathrooms
        }])

        input_transformed = ct.transform(input_df)

        prediction = model.predict(input_transformed)

        return jsonify({
            "predicted_price": int(prediction[0])
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        })

# Home Route
@app.route("/")
def home():
    return "ML API Running Successfully"

# Render Port Fix
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)