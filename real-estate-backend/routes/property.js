const express = require('express')
const router = express.Router();
const Property = require('../models/Property');

router.post("/add", async(req,res)=>{
    try{
        const property = await Property.create(req.body);

        res.json({
            success: true,
            property
        })

    }catch(err){
        res.status(500).json({
            message: "Error adding Property"
        })
    }
})

module.exports = router;