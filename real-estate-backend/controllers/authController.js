const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client, JWT } = require("google-auth-library");
require("dotenv").config();

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID,);
async function handleUserSignup(req, res) {
  console.log(req.body);
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "User Already Exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json({
      success: true,
      message: "Signup Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        message: "Invalid Credential",
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });
    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.resetToken;
    res.json({
      success: true,
      message: "Login Successfully",
      token,
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
}

async function handleGoogleLogin(req, res) {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,   });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "google-user",
      });
    }

    const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.resetToken;

    return res.json({
      success: true,
      token: jwtToken,
      user: safeUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Google auth failed",
    });
  }
}

async function handleAdminLogin(req, res) {
  console.log(req.body);
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin@123") {
    return res.json({
      success: true,
      message: "Login Successfully",
    });
  }
  return res.status(401).json({
    success: false,
    message: "invalid Credential",
  });
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleGoogleLogin,
  handleAdminLogin,
};
