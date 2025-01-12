const express = require("express");
const router = express.Router();
const Controller = require("../controllers/caricatures.controller");

router.post("/create", Controller.create);
router.get("/get", Controller.getCaricatures);

module.exports = router;
