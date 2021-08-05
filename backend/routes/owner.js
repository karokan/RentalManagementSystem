const express = require("express");
const router = express.Router();

const OwnerController = require("../controllers/owner");
const checkAuth = require("../middleware/check-auth");

router.get("/properties", checkAuth, OwnerController.getOwnerProperties);

router.get("/agreements", checkAuth, OwnerController.getOwnerAgreements);

router.put("/ownerUpdate", checkAuth, OwnerController.updateOwner);

router.get("/obligations", checkAuth, OwnerController.getOwnerObligations);

router.get("/user/:email", checkAuth, OwnerController.getUserToAgreement);

router.get("/:ownerById", OwnerController.getOwnerById);

router.put("/:obligationId", OwnerController.changeCheckedStatus);

router.get("/ownerId", checkAuth, OwnerController.getOwnerId);

router.get("/ownerData", checkAuth, OwnerController.getOwnerData);

module.exports = router;
