const express = require("express");
const router = express.Router();
const {handleUserSignup, handleUserLogin, handleGoogleLogin, handleAdminLogin} = require("../controllers/authController");

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.post("/google", handleGoogleLogin);
router.post("/admin/login", handleAdminLogin);

module.exports = router;