const express = require('express');
const { addDoctor } = require('../controllers/doctorController');

const router = express.Router();

// Route to add a new doctor
router.post('/add-doctor', addDoctor);

module.exports = router;