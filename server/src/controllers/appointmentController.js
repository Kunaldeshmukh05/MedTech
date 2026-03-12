const Appointment = require('../models/Appointment');

const bookAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.find({ userId })
      .populate('doctorId', 'name specialization')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId })
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const addPrescription = async (req, res) => {
  try {
    const { appointmentId, prescription, medicines } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { prescription, medicines, status: 'completed' },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Prescription added successfully', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { bookAppointment, getUserAppointments, getDoctorAppointments, addPrescription };