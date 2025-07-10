const doctorModel = require("../models/doctor")
const validator = require("validator")

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


module.exports = { addDoctor }