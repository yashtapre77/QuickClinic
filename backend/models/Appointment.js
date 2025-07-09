const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctor: String,
  date: Date,
  reason: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
