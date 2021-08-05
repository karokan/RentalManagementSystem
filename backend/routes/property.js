const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const PropertyController = require("../controllers/property");

router.post("", checkAuth, PropertyController.createProperty);
router.get("", PropertyController.getProperties);
// router.get("/OwnerProperties", checkAuth, PropertyController.getOwnerProperty);
router.delete("/:id", checkAuth, PropertyController.deleteProperty);

router.put("/:id", checkAuth, PropertyController.updateProperty);

module.exports = router;
