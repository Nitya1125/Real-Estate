const express = require('express')
const router = express.Router();
const {
  addProperty,
  getAllProperties,
  SearchFilter,
  editProperty,
  handleDeleteByID,
} = require('../controllers/propertyController');

router.post("/add", addProperty); 
router.get("/", getAllProperties);
router.get("/search", SearchFilter);
router.put("/edit/:id", editProperty);
router.delete("/delete/:id", handleDeleteByID);

module.exports = router;