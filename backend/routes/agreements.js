const express = require("express");
const router = express.Router();

const AgreementController = require("../controllers/agreements");
const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, AgreementController.createAgreement);

router.delete("/:id", checkAuth, AgreementController.deleteAgreement);

router.put("/:id", checkAuth, AgreementController.updateAgreement);

module.exports = router;
