const User = require("../models/user");
const appointmentModel = require("../models/Appointment");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try{
    console.log("req.body:", req.body); 
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    
    const user = await User.create({ name, email, password });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    res.status(201).json({ id: user._id, email: user.email, token:token });
  }
  catch (error) {
    console.error("Error in registerUser:", error);
    res.status(400).json({ message: "Some error occured" });
  }
};

const loginUser = async (req, res) => {
  try{

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    
    if (password !== user.password)
      return res.status(400).json({ message: "Invalid credentials" });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    res.json({ token });
  }
  catch (error) {
    console.error("Error in loginUser:", error);
    res.status(400).json({ message: "Some error occured" });
  }
};


const bookAppointment = async (req, res) => {

    try {
  
      const { userId, docId, slotDate, slotTime } = req.body
  
      const docData = await doctorModel.findById(docId).select('-password')
  
      if (!docData.available) {
        return res.json({ success: false, message: 'Doctor not available' })
      }
  
      let slots_booked = docData.slots_booked
  
      // checking for slot availablity
      if (slots_booked[slotDate]) {
        if (slots_booked[slotDate].includes(slotTime)) {
          return res.json({ success: false, message: 'Slot not available' })
        } else {
          slots_booked[slotDate].push(slotTime)
        }
      } else {
        slots_booked[slotDate] = []
        slots_booked[slotDate].push(slotTime)
      }
  
      const userData = await userModel.findById(userId).select('-password')
  
      delete docData.slots_booked
  
      const appointmentData = {
        userId, docId,
        userData, docData,
        amount: docData.fees,
        slotTime, slotDate,
        date: Date.now()
      }
  
      const newAppointment = new appointmentModel(appointmentData)
      await newAppointment.save()
  
      // save new slots data in docData
      await doctorModel.findByIdAndUpdate(docId, { slots_booked })
  
      res.json({ success: true, message: 'Appointment Booked' })
  
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }
  
  }
  
// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {

    try {
  
      const { userId } = req.body
      const appointments = await appointmentModel.find({ userId })
  
      res.json({ success: true, appointments })
  
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }
  
  }
  
  // API to cancel appointment
  const cancelAppointment = async (req, res) => {
  
    try {
  
      const { userId, appointmentId } = req.body
      const appointmentData = await appointmentModel.findById(appointmentId)
  
      // verify appointment user
      if (appointmentData.userId !== userId) {
        return res.json({ success: false, message: 'Unauthorized action' })
      }
  
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
  
      // releasing doctor slot
      const { docId, slotDate, slotTime } = appointmentData
      const doctorData = await doctorModel.findById(docId)
      let slots_booked = doctorData.slots_booked
  
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
  
      await doctorModel.findByIdAndUpdate(docId, { slots_booked })
  
      res.json({ success: true, message: 'Appointment Cancelled' })
  
    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
    }
  
  }
  

module.exports = { registerUser, loginUser, bookAppointment, listAppointment, cancelAppointment };
