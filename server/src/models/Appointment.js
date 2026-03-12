const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
  prescription: { type: String, default: '' },
  medicines: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);