# 🏥 Online Medicine & Healthcare Booking System

A full-stack MERN healthcare web application for managing doctor appointments, prescriptions, and medicine orders.


> **Tech Stack:** MongoDB Atlas · Express.js · React (Vite) · Node.js

---

## 📸 Features

| Role     | Features |
|----------|----------|
| **Patient** | Register/Login, Browse Doctors, Book Appointments, View Prescriptions, Order Medicines |
| **Doctor** | View Appointments, Add Prescriptions for Patients |
| **Admin** | Add Doctors, Add Medicines, Update Medicine Stock |

---

## 🗂️ Project Structure

```
healthcare-app/
├── server/                  # Express.js Backend
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/        # Business logic
│   │   ├── authController.js
│   │   ├── doctorController.js
│   │   ├── appointmentController.js
│   │   ├── medicineController.js
│   │   └── orderController.js
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   ├── Medicine.js
│   │   └── Order.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── medicineRoutes.js
│   │   └── orderRoutes.js
│   ├── seed.js             # Database seeder
│   ├── server.js           # Entry point
│   └── .env.example        # Environment variables template
│
└── client/                 # React (Vite) Frontend
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── Navbar.css
        ├── pages/
        │   ├── Home.jsx / Home.css
        │   ├── Login.jsx
        │   ├── Register.jsx / Auth.css
        │   ├── Doctors.jsx / Doctors.css
        │   ├── BookAppointment.jsx / BookAppointment.css
        │   ├── Medicines.jsx / Medicines.css
        │   ├── Cart.jsx / Cart.css
        │   ├── Profile.jsx / Profile.css
        │   ├── DoctorDashboard.jsx / DoctorDashboard.css
        │   └── Admin.jsx / Admin.css
        ├── services/
        │   └── api.js      # Axios API calls
        ├── App.jsx         # Routes & state
        └── index.css       # Global styles
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v24)
- MongoDB Atlas account

### Step 1: Clone and setup

```bash
# No cloning needed — just navigate to the project folder
cd healthcare-app
```

### Step 2: Configure Backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/healthcareDB?retryWrites=true&w=majority
PORT=5000
```

> 🔑 Replace with your actual MongoDB Atlas connection string.

### Step 3: Seed the database (optional but recommended)

```bash
node seed.js
```

This adds sample doctors, medicines, and demo user accounts.

### Step 4: Start backend

```bash
npm run dev
# Server runs on http://localhost:5000
```

### Step 5: Setup and start frontend

```bash
cd ../client
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🔑 Demo Credentials (after seeding)

| Role    | Email                    | Password    |
|---------|--------------------------|-------------|
| Admin   | admin@health.com         | admin123    |
| Patient | priya@patient.com        | patient123  |
| Doctor  | ananya@doctor.com        | doctor123   |

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint         | Description       |
|--------|-----------------|-------------------|
| POST   | /api/auth/register | Register user  |
| POST   | /api/auth/login    | Login user     |

### Doctors
| Method | Endpoint       | Description       |
|--------|---------------|-------------------|
| GET    | /api/doctors  | Get all doctors   |
| POST   | /api/doctors  | Add doctor (admin)|

### Appointments
| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| POST   | /api/appointments               | Book appointment         |
| GET    | /api/appointments/user/:userId  | Get user appointments    |
| GET    | /api/appointments/doctor/:docId | Get doctor appointments  |
| POST   | /api/appointments/prescription  | Add prescription         |

### Medicines
| Method | Endpoint                    | Description          |
|--------|-----------------------------|----------------------|
| GET    | /api/medicines              | Get all medicines    |
| POST   | /api/medicines              | Add medicine (admin) |
| PUT    | /api/medicines/:id/stock    | Update stock (admin) |

### Orders
| Method | Endpoint               | Description        |
|--------|------------------------|--------------------|
| POST   | /api/orders            | Place order        |
| GET    | /api/orders/user/:id   | Get user orders    |

---

## 🎨 Color Theme

| Variable       | Value    | Usage              |
|----------------|----------|--------------------|
| Primary        | #2ecc71  | Buttons, accents   |
| Primary Dark   | #27ae60  | Hover states       |
| Primary Light  | #d4f5e3  | Backgrounds        |
| White          | #ffffff  | Cards              |
| Gray           | #718096  | Secondary text     |

---

## 📚 Database Models

### User
```js
{ name, email, password, phone, role: 'patient|doctor|admin' }
```

### Doctor
```js
{ name, specialization, experience, availableSlots: [String] }
```

### Appointment
```js
{ userId, doctorId, date, timeSlot, status, prescription, medicines }
```

### Medicine
```js
{ name, description, price, stock, category }
```

### Order
```js
{ userId, medicines: [{name, price, quantity}], address, phone, totalAmount, status }
```

---

## 👨‍💻 Developed By

Final Year MERN Stack Project — Online Medicine & Healthcare Booking System

---