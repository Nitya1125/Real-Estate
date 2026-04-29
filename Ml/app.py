from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model  import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

app = Flask(__name__)

data = pd.read_csv("../real-estate-backend/data/properties.csv")
data = data.dropna()

X = data[["area","bedrooms", "bathrooms", "location","district","property_type"]]
y = data["price"]

ct = ColumnTransformer(
    transformers = [("cat",  OneHotEncoder(handle_unknown="ignore"),
    ["property_type", "location", "district"])
    ],
    remainder= "passthrough"
)
X_transformed = ct.fit_transform(X)

model = LinearRegression()
model.fit(X_transformed,y)

@app.route("/predict",  methods=["POST"])
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
        return jsonify({"predicted_price": int(prediction[0])})
    except Exception as e:
        return jsonify({"error": str(e)})
if __name__ == "__main__":
    app.run(port=5001)