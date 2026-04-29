const express = require("express")
const predictRoutes = require("./routes/predictRouter")
const connectDB = require("./config/db");
const propertyRoutes = require("./routes/property")
const authRoutes = require("./routes/authRoutes")
const contactRouter = require("./routes/contactRoutes")
const userRoutes = require("./routes/userRoutes")
const cors = require("cors")
const cookieParser = require("cookie-parser");

const authMiddleware = require("./middleware/auth");
connectDB();
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"}))
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/properties", propertyRoutes);


app.get("/api/protected", authMiddleware,  (req,res) => {
    res.json({
        message: "You are authorized",
        user : req.user
    })
})

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact",contactRouter);

app.use("/api/predict-price", predictRoutes);

const PORT = 5000;

app.listen(PORT, ()=> {
    console.log(`Server Running on port ${PORT}`)
})