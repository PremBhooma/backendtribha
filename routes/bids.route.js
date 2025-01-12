const express = require("express");
const router = express.Router();
const Controller = require("../controllers/bids.controller");

router.post("/create", Controller.create);
router.get("/get", Controller.getTrending);

module.exports = router;
