require("dotenv").config();
const express = require("express");
const predictRoutes = require("./routes/predictRouter");
const connectDB = require("./config/db");
const propertyRoutes = require("./routes/property");
const authRoutes = require("./routes/authRoutes");
const contactRouter = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const ViewRoute = require("./routes/ViewPropertyRoutes");
const forgotRoutes = require("./routes/forgotPasswordRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const authMiddleware = require("./middleware/auth");

connectDB();

const app = express();

const allowedOrigins = (
  process.env.FRONTEND_URL ||
  "http://localhost:5173,https://real-estate-gold-sigma.vercel.app"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "homeverse-api" });
});

app.use("/api/properties", propertyRoutes);
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});
app.use("/api/properties", ViewRoute);
app.use("/api/users", userRoutes);
app.use("/api/auth", forgotRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRouter);
app.use("/api/predict-price", predictRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
