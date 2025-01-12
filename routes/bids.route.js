const express = require("express");
const router = express.Router();
const Controller = require("../controllers/bids.controller");

router.post("/create", Controller.create);

module.exports = router;
