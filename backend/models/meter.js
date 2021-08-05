const mongoose = require("mongoose");

const meterSchema = mongoose.Schema(
  {
    content: { type: String },
    meter: { type: Number, required: true },
    meterImage: { type: String, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Meter", meterSchema);
