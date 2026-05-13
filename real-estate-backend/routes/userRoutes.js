const express = require("express");
const router = express.Router();
const {getAllUsers, handleEditUserById, handleDeleteUserById, addToWishList,getWishlist, getCurrentUser} = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");


//for Admin views
router.get("/",authMiddleware,adminMiddleware, getAllUsers);

//Property Wishlist
router.post("/wishlist", authMiddleware,addToWishList);
router.get("/wishlist", authMiddleware,getWishlist);

//For User Profile
router.put("/:id",authMiddleware, handleEditUserById);
router.delete("/:id",authMiddleware, handleDeleteUserById);
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;