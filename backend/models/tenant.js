const mongoose = require("mongoose");

const tenantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  surname: {
    type: String,
    required: true,
  },

  active: Boolean,

  email: {
    type: String,
  },

  phoneNumber: {
    type: String,
  },

  nationality: {
    type: String,
  },
});

module.exports = mongoose.model("Tenant", tenantSchema);
