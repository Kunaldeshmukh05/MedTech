const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  availableSlots: { type: [String], default: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'] },
  image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);