require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.js');
console.log(connectDB)
console.log(typeof connectDB)
const authRoutes = require('./src/routes/authRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const appointmentRoutes = require('./src/routes/appointmentRoutes');
const medicineRoutes = require('./src/routes/medicineRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send('Healthcare API is running ✅'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));