const mongoose = require("mongoose");

const ViewSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    },
    name:{
        type: String,  
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    visitDate: {
        type: Date,
        required: true
    },
    message:{
        type: String
    },
}, {timestamps: true});

module.exports = mongoose.model("RequestView", ViewSchema);

