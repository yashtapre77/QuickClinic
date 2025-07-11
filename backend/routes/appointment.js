const express = require('express');
const { bookAppointment, listAppointment,cancelAppointment } = require('../controllers/appointmentController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, bookAppointment);
router.get('/', auth, listAppointment);
router.delete('/', auth, cancelAppointment);

module.exports = router;
