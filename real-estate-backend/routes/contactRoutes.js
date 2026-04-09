const express = require("express");
const router = express.Router();
const {handleContact,handleGetContacts} = require("../controllers/contactController")

router.post("/", handleContact);
router.get("/", handleGetContacts);

module.exports = router;