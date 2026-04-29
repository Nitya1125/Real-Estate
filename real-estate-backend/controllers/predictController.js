const axios = require ("axios");

const predictPrice = async (req, res) => {
    try {
        const {location,area,bathrooms,bedrooms} = req.body
        const response = await axios.post("http://127.0.0.1:5001/predict", {
            location,
            area,
            bathrooms,
            bedrooms
        });
        res.json({
            price : response.data.predicted_price
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in prediction" });
    }
};

module.exports = { predictPrice };