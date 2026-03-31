const express = require("express")
const axios = require("axios")
const Property = require("./models/Property");
const connectDB = require("./config/db");

connectDB();
const app = express();
app.use(express.json());

const addData = async ()=>{
    await Property.create({
        title : "2BHK Apartment",
        price : 4500000,
        location: "Gujarat",
        area: 1200,
        bedrooms: 2,
        bathrooms: 2
    });
    console.log("Data Insert")
}

app.get("/properties", async (req,res) =>{
    
    const{location,district,property_type,bedrooms,bathrooms,minPrice, maxPrice, minArea} = req.query;

    let filter = {};

    if (location){
        filter.location = location;
    }
    if (district){
        filter.district = district;
    }
    if (property_type){
        filter.property_type = property_type;
    }

    if (bedrooms){
        filter.bedrooms = bedrooms;
    }

    if (bathrooms){
        filter.bathrooms = bathrooms;
    }

    if (minPrice || maxPrice){
        filter.price = {};
        if(minPrice) filter.price.$gte  = Number(minPrice);
        if(maxPrice) filter.price.$gte  = Number(maxPrice);
    }

    if (minArea){
        filter.area = {$gte: Number(minArea)};
    }

    console.log(filter);

    const {sort} = req.query;

    let sortOption = {};

    if (sort == "low"){
        sortOption.price =1;
    }else if (sort == "high"){
        sortOption.price = -1;
    }

    const {page =1, limit=10}= req.query;

    const skip = (page-1) *limit;


    const data = await Property.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

    const total = await
    Property.countDocuments(filter);
    res.json({
        total,
        page: Number(page),
        limit: Number(limit),
        data});
});


app.post("/properties" , async (req,res) => {
    const newProperty = await Property.create(req.body);
    res.json(newProperty);
})

app.post("/predict-price" ,async (req,res) => {
    try{
        const response = await axios.post("http://127.0.0.1:5001/predict",{
            area,
            bathrooms,
            bedrooms
        });
        res.json(response.data);
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Error in prediction"});
    }
})

const PORT = 5000;

app.listen(PORT, ()=> {
    console.log(`Server Running on port ${PORT}`)
})