const express = require('express');
const { totalPatients, monthlyAveragePatients, totalRevenue, totalAppointments } = require('../controllers/dashboard');
const { route } = require('./appointment');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/total-patients', auth, totalPatients);
router.get('/monthly-average-patients',auth,  monthlyAveragePatients);   
router.get('/total-revenue', auth, totalRevenue);
router.get('/total-appointments', auth, totalAppointments);

module.exports = router;