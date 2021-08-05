const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const NotificationController = require("../controllers/notifications");

router.post("", checkAuth, NotificationController.createNotification);

router.get("", NotificationController.getNotification);

router.delete("/:id", checkAuth, NotificationController.deleteNotification);

module.exports = router;
