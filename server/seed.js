require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Doctor = require('./src/models/Doctor');
const Medicine = require('./src/models/Medicine');

const seed = async () => {
  await connectDB();
  console.log('🌱 Seeding database...');

  // Clear existing data
  await User.deleteMany({});
  await Doctor.deleteMany({});
  await Medicine.deleteMany({});

  // Seed Users
  await User.insertMany([
    { name: 'Admin User', email: 'admin@health.com', password: 'admin123', phone: '9999999999', role: 'admin' },
    { name: 'Priya Sharma', email: 'priya@patient.com', password: 'patient123', phone: '9876543210', role: 'patient' },
    { name: 'Rahul Mehta', email: 'rahul@patient.com', password: 'patient123', phone: '9123456789', role: 'patient' },
    { name: 'Ananya Patel', email: 'ananya@doctor.com', password: 'doctor123', phone: '9000000001', role: 'doctor' },
    { name: 'Vikram Singh', email: 'vikram@doctor.com', password: 'doctor123', phone: '9000000002', role: 'doctor' },
  ]);

  // Seed Doctors
  await Doctor.insertMany([
    { name: 'Ananya Patel', specialization: 'Cardiology', experience: 12, availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
    { name: 'Vikram Singh', specialization: 'Neurology', experience: 8, availableSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'] },
    { name: 'Meera Joshi', specialization: 'Pediatrics', experience: 15, availableSlots: ['10:00 AM', '11:30 AM', '01:00 PM', '03:00 PM'] },
    { name: 'Suresh Kumar', specialization: 'Orthopedics', experience: 10, availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'] },
    { name: 'Nisha Reddy', specialization: 'Dermatology', experience: 6, availableSlots: ['10:00 AM', '11:00 AM', '03:00 PM', '05:00 PM'] },
    { name: 'Arjun Kapoor', specialization: 'Psychiatry', experience: 9, availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
  ]);

  // Seed Medicines
  await Medicine.insertMany([
    { name: 'Paracetamol 500mg', description: 'Used for fever and mild to moderate pain relief', price: 25, stock: 500, category: 'Painkiller' },
    { name: 'Azithromycin 250mg', description: 'Antibiotic used for bacterial infections', price: 85, stock: 200, category: 'Antibiotic' },
    { name: 'Cetirizine 10mg', description: 'Antihistamine for allergies and hay fever', price: 30, stock: 300, category: 'Antihistamine' },
    { name: 'Omeprazole 20mg', description: 'Used to treat acidity and stomach ulcers', price: 45, stock: 250, category: 'Antacid' },
    { name: 'Metformin 500mg', description: 'Used to manage type 2 diabetes', price: 60, stock: 150, category: 'Diabetes' },
    { name: 'Amlodipine 5mg', description: 'Calcium channel blocker for blood pressure', price: 50, stock: 180, category: 'Cardiac' },
    { name: 'Vitamin D3 1000IU', description: 'Supplement for bone health and immunity', price: 120, stock: 400, category: 'Supplement' },
    { name: 'Ibuprofen 400mg', description: 'Anti-inflammatory pain reliever for body pain', price: 35, stock: 350, category: 'Painkiller' },
    { name: 'Amoxicillin 500mg', description: 'Broad-spectrum antibiotic for infections', price: 70, stock: 220, category: 'Antibiotic' },
    { name: 'Multivitamin Tablet', description: 'Daily multivitamin for overall health', price: 95, stock: 500, category: 'Supplement' },
    { name: 'Cough Syrup 100ml', description: 'Relief from cough and cold symptoms', price: 55, stock: 180, category: 'Respiratory' },
    { name: 'Antacid Syrup 200ml', description: 'Fast relief from heartburn and acidity', price: 40, stock: 200, category: 'Antacid' },
  ]);

  console.log('✅ Database seeded successfully!');
  console.log('\n📝 Demo Credentials:');
  console.log('Admin:   admin@health.com / admin123');
  console.log('Patient: priya@patient.com / patient123');
  console.log('Doctor:  ananya@doctor.com / doctor123');
  mongoose.disconnect();
};

seed().catch(err => {
  console.error('❌ Seeding error:', err);
  mongoose.disconnect();
});