const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
  address: { type: String, require: true },
  city: { type: String, require: true },
  postalCode: { type: String, require: true },
  apartmentSize: { type: Number, require: false },
  propertyManger: { type: String, require: false },
  managerPhoneNumber: { type: Number, require: false },
  houseCode: { type: String, require: false },
  // propertyCode: { type: String, require: false },
  bankAccountNumber: { type: String, require: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
});

module.exports = mongoose.model("Property", propertySchema);
