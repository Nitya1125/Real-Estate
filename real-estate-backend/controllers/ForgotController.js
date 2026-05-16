const User = require("../models/User");
const mailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");


//Forgot Password
const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})
const handleForgotPassword = async(req, res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        await user.save();
        //send Email to user
        await transporter.sendMail({
            from: "nityagandhi1125@gmail.com",
            to: email,
            subject: "Reset Password",
            text: `Click this link to reset your password: http://localhost:5173/reset-password/${resetToken}`,
        })
        res.json({
            success: true,
            message: "Email sent successfully"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Server error"
        })
    }
}

const handleResetPassword = async(req, res) => {
    const {token} = req.body;
    const {password} = req.body;
    try{
        const user = await User.findOne({resetToken: token});
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        await user.save();
        res.json({
            success: true,
            message: "Password reset successfully"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Server error"
        })
    }
}

module.exports = {
    handleForgotPassword, handleResetPassword
}