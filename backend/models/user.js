const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: Object, default: { line1: '', line2: '' } },
  gender: { type: String, default: 'Not Selected' },
  dob: { type: String, default: 'Not Selected' },
  phone: { type: String, default: '00000000000', unique: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);