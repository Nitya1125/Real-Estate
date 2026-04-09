const User = require("../models/User")

async function getAllUsers(req, res) {
    try {
        const users = await User.find();

        if(!users) {
            return res.status(404).json({ message: "No users found" });
        }
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error getting users" });
    }
}

async function handleAddUser(req, res) {
    try {
        const user = await User.create(req.body);
        if(!user) {
            return res.status(404).json({ message: "Error adding user" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error adding user" });
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

module.exports={getAllUsers, handleAddUser, handleEditUserById, handleDeleteUserById};