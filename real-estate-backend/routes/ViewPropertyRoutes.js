const  express = require("express");       
const router = express.Router();
const {CreateVisitRequest} = require("../controllers/PropertyViewController");

router.post("/visit/request/:id", CreateVisitRequest);

module.exports = router;