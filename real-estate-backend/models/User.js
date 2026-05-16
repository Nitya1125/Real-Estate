const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email:{
        type : String,
        required: true,
        unique : true
    },
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
    resetToken:{
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);