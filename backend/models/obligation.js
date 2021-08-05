const mongoose = require("mongoose");

const obligationSchema = mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
    agreement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agreement",
    },
    amount: { type: Number, required: true },
    ifChecked: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Obligation", obligationSchema);
