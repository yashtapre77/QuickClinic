const express = require('express');
const router = express.Router();
const { createPatient, getAllPatients } = require('../controllers/patientController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createPatient);
router.get('/', auth, getAllPatients);

module.exports = router;
