import pandas as pd

data = pd.read_csv("../real-estate-backend/data/properties.csv")

print(data.head())

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

X = data[["area", "bedrooms", "bathrooms"]]

y = data["price"]

X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.2)

model = LinearRegression()

model.fit(X_train, y_train)

print("Model Train successfully")

sample = [[1200,2,2]]

predicted_price = model.predict(sample)

print("Predicted Price:", predicted_price[0])