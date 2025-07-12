const express = require('express');
const router = express.Router();
const { createPatient, getAllDoctors } = require('../controllers/patientController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createPatient);
router.get('/', auth, getAllDoctors);

module.exports = router;
