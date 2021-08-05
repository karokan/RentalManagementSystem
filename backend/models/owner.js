const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ownerSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, require: true },
  password: { type: String, required: true },
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  ],
  agreements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agreement",
    },
  ],
  name: { type: String, require: false },
  lastName: { type: String, require: false },
  address: { type: String, require: false },
  city: { type: String, require: false },
  IDseries: { type: String, require: false },
  IDnumber: { type: Number, require: false },
  phoneNumber: { type: Number, require: false },
});

ownerSchema.plugin(uniqueValidator); //sprawdza duplikacje danych użytkowników

module.exports = mongoose.model("Owner", ownerSchema);
