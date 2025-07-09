const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  phone: String,
});

module.exports = mongoose.model('Patient', patientSchema);
