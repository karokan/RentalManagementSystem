const mongoose = require("mongoose");

const agreementSchema = mongoose.Schema({
  dateStart: { type: String, required: true },
  dateEnd: { type: String, required: true },
  rent: { type: Number, required: true },
  deposit: { type: Number, required: true },
  media: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
});

module.exports = mongoose.model("Agreement", agreementSchema);
