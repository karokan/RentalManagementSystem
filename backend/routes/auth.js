const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth");

const user = require("../models/user");

router.post("/signup", AuthController.createUser);

router.post("/login", AuthController.userLogin);

router.post("/loginOwner", AuthController.ownerLogin);

module.exports = router;
