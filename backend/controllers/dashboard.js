const Appointment = require("../models/Appointment")
const doctorModel = require("../models/doctor")
const validator = require("validator")
const Patient = require('../models/Patient');

const totalPatients = async (req, res) => {
    try {
        const patients = await Patient.find({docId: req.body.docId});
        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}

const monthlyAveragePatients = async (req, res) => {

    try {
        const patients = await Patient.aggregate([
            
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const monthlyData = Array.from({ length: 12 }, (_, i) => {
            const monthData = patients.find(p => p._id === i + 1);
            return monthData ? monthData.count : 0;
        });

        res.status(200).json({
            success: true,
            data: monthlyData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}

const totalRevenue = async (req, res) => {
    try {
        const appointments = await Appointment.aggregate([
            {
                $match: {
                    docId: req.body.docId,
                    payment: true,
                    cancelled: false
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$amount" }
                }
            }
        ]); 
        const totalRevenue = appointments.length > 0 ? appointments[0].totalRevenue : 0;
        res.status(200).json({
            success: true,
            data: totalRevenue
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}

const totalAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({docId: req.body.docId});
        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}


module.exports = { totalPatients, monthlyAveragePatients, totalRevenue, totalAppointments };