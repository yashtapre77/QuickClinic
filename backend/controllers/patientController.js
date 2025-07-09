const Patient = require('../models/Patient');

const createPatient = async (req, res) => {
  const patient = await Patient.create(req.body);
  res.status(201).json(patient);
};

const getAllPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};

module.exports = { createPatient, getAllPatients };
