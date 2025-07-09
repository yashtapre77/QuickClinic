const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments } = require('../controllers/appointmentController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createAppointment);
router.get('/', auth, getAppointments);

module.exports = router;
