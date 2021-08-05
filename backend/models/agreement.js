const mongoose = require("mongoose");

const agreementSchema = mongoose.Schema({
  dateStart: { type: String },
  dateEnd: { type: String },
  rent: { type: Number },
  deposit: { type: Number },
  media: { type: Number },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
});

module.exports = mongoose.model("Agreement", agreementSchema);
