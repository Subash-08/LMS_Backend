const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  companyType: {
    type: String,
    enum: ['Manufacturing', 'Production', 'Software'],
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;
