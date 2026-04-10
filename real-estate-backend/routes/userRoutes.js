const express = require("express");
const router = express.Router();
const {getAllUsers, handleEditUserById, handleDeleteUserById} = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");


//for Admin views
router.get("/",authMiddleware,adminMiddleware, getAllUsers);

//For User Profile
router.put("/:id",authMiddleware, handleEditUserById);
router.delete("/:id",authMiddleware, handleDeleteUserById);

module.exports = router;