from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model  import LinearRegression

app = Flask(__name__)

data = pd.read_csv("../real-estate-backend/data/properties.csv")
data = data.dropna()

X = data[["area","bedrooms", "bathrooms"]]
y = data["price"]

model = LinearRegression()
model.fit(X,y)

@app.route("/predict",  methods=["POST"])
def predict():
    input_data = request.json

    area = input_data["area"]
    bedrooms = input_data["bedrooms"]
    bathrooms = input_data["bathrooms"]

    prediction = model.predict([[area,bedrooms,bathrooms]])

    return jsonify({
        "predicted_price": int(prediction[0])
    })

if __name__ == "__main__":
    app.run(port=5001)