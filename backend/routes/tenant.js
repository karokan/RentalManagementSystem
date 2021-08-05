const express = require("express");
const router = express.Router();

const Tenant = require("../models/tenant");
const checkAuth = require("../middleware/check-auth"); //zaimportowane do sprawdzania autentykacji np do tworzenia czegos
//typu nowy post

//Register
router.get("/register", (req, res, next) => {
  res.send("REGISTER TENANT");
});

//Register
router.get("/authenticate", (req, res, next) => {
  res.send("AUTHENTICATE");
});

//Profile + add tenant to data base
router.get("/profile", (req, res, next) => {
  const tenant = new Tenant({
    name: "Artur",
    surname: "Kowalski",
  });
  console.log(tenant);
  tenant.save();
  res.status(201).json({
    message: "Tenant added successfully",
  });
});

//VALIDATE
router.get("/validate", checkAuth, (req, res, next) => {
  res.send("VALIDATE");
});

router.get("/", (req, res, next) => {
  res.send("Hello from tenant path url");
});

module.exports = router;
