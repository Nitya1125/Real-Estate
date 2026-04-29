const mongoose =  require("mongoose");

const propertySchema = new mongoose.Schema({
    title: String,
    property_type: String,
    price: Number,
    district: String,
    location: String,
    area: Number,
    bedrooms: Number,
    bathrooms: Number,
    image: String,
}, {timestamps:true})

const Property = mongoose.model("Property", propertySchema);

module.exports = Property