const express = require('express')
const router = express.Router();
const {
  addProperty,
  getAllProperties,
  SearchFilter,
  editProperty,
  handleDeleteByID,
} = require('../controllers/propertyController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename:(req, file, cb) =>{
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single('image'), addProperty); 
router.get("/", getAllProperties);
router.get("/search", SearchFilter);
router.put("/edit/:id", upload.single('image'),editProperty);
router.delete("/delete/:id", handleDeleteByID);

module.exports = router;