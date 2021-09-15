const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

const checkAuth = require("../middleware/check-auth");

router.get("/userData", checkAuth, UserController.getUserData);

router.get("/notifications", checkAuth, UserController.getUserNotifications);

router.put("/userUpdate", checkAuth, UserController.updateUser);

router.get("/meters", checkAuth, UserController.getUserMeters);

router.get("/agreement", checkAuth, UserController.getUserAgreement);

router.get("/userId", checkAuth, UserController.getUserId);

router.get("/obligations", checkAuth, UserController.getUserObligations);

router.get("/:userById", UserController.getUserById);

module.exports = router;
