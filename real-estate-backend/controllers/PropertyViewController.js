const ViewProperty = require("../models/RequestView");

const CreateVisitRequest = async(req,res) => {
    try{
        const {propertyId, name, email, phone, visitDate, message} = req.body;
        const newRequest = await ViewProperty.create({
            propertyId,
            name,
            email,
            phone,
            visitDate,
            message  
        });
        console.log(newRequest);
        res.json({
            message: "Request Sent Successfully",
            success: true,
            data: newRequest
        })
    }catch(err){
        res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

module.exports = {
    CreateVisitRequest
};