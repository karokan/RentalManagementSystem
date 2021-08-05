const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, require: true },
  password: { type: String, required: true },
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
  meters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meter",
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

userSchema.plugin(uniqueValidator); //sprawdza duplikacje danych użytkowników

module.exports = mongoose.model("User", userSchema);
