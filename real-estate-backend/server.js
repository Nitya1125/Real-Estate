const express = require("express")
const jwt = require("jsonwebtoken")
const axios = require("axios")
const Property = require("./models/Property");
const connectDB = require("./config/db");
const propertyRoutes = require("./routes/property")
const User  = require("./models/User")
const {OAuth2Client} = require("google-auth-library")
const bcrypt = require("bcrypt")
const cors = require("cors")

const client = new OAuth2Client("872873640503-udo11033r9u2rgtoabej6o3l6kimfhjf.apps.googleusercontent.com")

const authMiddleware = require("./middleware/auth")
connectDB();
const app = express();
app.use(express.json());
app.use(cors())

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

app.use("/api/property", propertyRoutes);


app.post("/api/auth/google", async(req,res)=>{
    try{
        const {token} = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "872873640503-udo11033r9u2rgtoabej6o3l6kimfhjf.apps.googleusercontent.com"
        })

        const payload = ticket.getPayload();
        const email = payload.email;
        const name = payload.name;

        let user = await User.findOne({email});

        if(!user){
            user = await User.create({
                name,
                email,
                password: "google-user" //dummy
            });
        }

        const jwtToken = jwt.sign(
            {id: user._id},
            "secretKey",
            {expiresIn: "7d"}
        );

       return res.json({
            success: true,
            token: jwtToken,
            user
        })
    }catch(err){
        res.status(500).json({
            message: "Google auth failed"
        })
    }
})

app.get("/api/protected", authMiddleware,  (req,res) => {
    res.json({
        message: "You are authorized",
        user : req.user
    })
})

app.post("/api/auth/signup", async (req,res) =>{
    console.log(req.body)
    const {name,email,password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.json({
                message:"User Already Exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user  =  await User.create({
            name,
            email,
            password: hashedPassword
        });
        console.log("User Saved:", user)
        res.json({
            success: true,
            data: user
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            error : "Server error"
        })
    }
})



app.post("/api/auth/login", async(req,res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email})
        if (!user){
            return res.json({
                message: "User Not Found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({
                message: "Invalid Credential"
            })
        }

        const token = jwt.sign(
            {id: user._id},
            "secretkey",
            {expiresIn: "7d"}
        );
        res.json({
            success: true,
            token,
            user
        })

    }catch(error){
        res.status(500).json({
            error: "Server error"
        })
    }

})

app.post("/api/admin/login", (req,res) => {
    console.log(req.body);
    const {email,password} = req.body;

    if(email === "admin@gmail.com" && password==="admin@123"){
        return res.json({
            success : true,
            message: "Login Successfully"
        })
    }
        return res.status(401).json({
            success : false,
            message: "invalid Credential"
        })
    
})
const contact= []
app.post("/api/contact" , (req,res) =>{
    const {name , email, message} = req.body;

    if (!name || !email || !message){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    const newContact = {
        id: Date.now(),
        name,
        email,
        message
    };
    contact.push(newContact);

    res.json({
        success: true,
        message:"Message received successfully",
        data : newContact
    })
})

app.post("/api/properties" , (req,res) =>{
    const newProperty = req.body;

    properties.push(newProperty);
    res.json({message: "Property Added successfully",
        data: newProperty
    })
})

app.post("/api/predict-price", (req,res) =>{
    console.log(req.body);
    const  {area, bedrooms,bathrooms} = req.body;
    

    const price = Number(area) *3000+ Number(bedrooms)*50000 + Number(bathrooms)* 30000;

    console.log("PRICE", price)

    res.json({
        predictedPrice : price || 0
    });
});

app.get("/api/properties", async (req,res) =>{
    
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