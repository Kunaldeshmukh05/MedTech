const express = require('express');
const router = express.Router();
const { bookAppointment, getUserAppointments, getDoctorAppointments, addPrescription } = require('../controllers/appointmentController');

router.post('/', bookAppointment);
router.get('/user/:userId', getUserAppointments);
router.get('/doctor/:doctorId', getDoctorAppointments);
router.post('/prescription', addPrescription);

module.exports = router;