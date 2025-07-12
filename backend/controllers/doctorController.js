const Appointment = require("../models/Appointment")
const doctorModel = require("../models/doctor")
const validator = require("validator")
const Patient = require('../models/Patient');


const addDoctor = async (req, res) => {

  try {

    const { name, email, password, phone, speciality, degree, experience, about, fees, address } = req.body
    const imageFile = req.file

    // checking for all data to add doctor
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email' })
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: 'Please enter a strong password' })
    }


    const doctorData = {
      name, email, password, phone, speciality,
      degree, experience, about, fees, address: address, date: Date.now()
    }

    const newDoctor = await doctorModel.create(doctorData)

    res.json({ success: true, message: 'Doctor Added' })

  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }

}

const getAppointments = async (req, res) => {
  try {
    const doctorId = req.params.id
    const appointments = await Appointment.find({docId:doctorId})
    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const appointment = await Appointment.findById(appointmentId)
    await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true })
    res.json({ success: true, message: 'Appointment Completed' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

const getAllPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};


module.exports = { addDoctor, getAppointments, completeAppointment, getAllPatients };