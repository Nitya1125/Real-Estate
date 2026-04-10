const User = require("../models/User")

async function getAllUsers(req, res) {
    try {
        const users = await User.find().select("-password");

        if(users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error getting users" });
    }
}

async function handleEditUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if(!user) {
            return res.status(404).json({ message: "Error editing user" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error editing user" });
    }
}

async function handleDeleteUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).json({ message: "Error deleting user" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error deleting user" });
    }
}

module.exports={getAllUsers, handleEditUserById, handleDeleteUserById};