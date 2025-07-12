const Patient = require('../models/Patient');
const doctorModel = require("../models/doctor")

const createPatient = async (req, res) => {
  const patient = await Patient.create(req.body);
  res.status(201).json(patient);
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = { createPatient, getAllDoctors };
