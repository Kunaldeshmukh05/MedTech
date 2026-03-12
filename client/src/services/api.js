import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// AUTH
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// DOCTORS
export const getDoctors = () => API.get('/doctors');
export const addDoctor = (data) => API.post('/doctors', data);

// APPOINTMENTS
export const bookAppointment = (data) => API.post('/appointments', data);
export const getUserAppointments = (userId) => API.get(`/appointments/user/${userId}`);
export const getDoctorAppointments = (doctorId) => API.get(`/appointments/doctor/${doctorId}`);
export const addPrescription = (data) => API.post('/appointments/prescription', data);

// MEDICINES
export const getMedicines = (search = '') => API.get(`/medicines${search ? `?search=${search}` : ''}`);
export const addMedicine = (data) => API.post('/medicines', data);
export const updateStock = (id, stock) => API.put(`/medicines/${id}/stock`, { stock });

// ORDERS
export const placeOrder = (data) => API.post('/orders', data);
export const getUserOrders = (userId) => API.get(`/orders/user/${userId}`);
