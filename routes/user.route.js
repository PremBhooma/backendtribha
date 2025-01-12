const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user.controller");

router.post("/create", Controller.create);
router.post("/login", Controller.login);

module.exports = router;
