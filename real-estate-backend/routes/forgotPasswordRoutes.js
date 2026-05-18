    const express = require("express");
    const router = express.Router();

    const {handleForgotPassword, handleResetPassword} = require("../controllers/ForgotController")

    router.post("/forgot-password", handleForgotPassword);
    router.patch("/reset-password/:token", handleResetPassword);

    module.exports = router;