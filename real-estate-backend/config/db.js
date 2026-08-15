const mongoose = require("mongoose")
require("dotenv").config();

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        console.error("MONGO_URL is not set");
        process.exit(1);
    }
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;