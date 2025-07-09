const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.status(201).json(appointment);
};

const getAppointments = async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
};

module.exports = { createAppointment, getAppointments };
