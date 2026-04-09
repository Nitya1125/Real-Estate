const express = require("express");
const router = express.Router();
const {getAllUsers, handleEditUserById, handleDeleteUserById} = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");


//for Admin views
router.get("/",authMiddleware, getAllUsers);

//For User Profile
router.put("/:id", handleEditUserById);
router.delete("/:id", handleDeleteUserById);

module.exports = router;