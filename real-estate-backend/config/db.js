const mongoose = require("mongoose")

const  connectDB = async () =>{
    try{
        await 
        mongoose.connect("mongodb://localhost:27017/ai_real_estate");
        console.log("MongoDB connected")
    }catch(err){
        console.log(err);
    }
};

module.exports = connectDB;