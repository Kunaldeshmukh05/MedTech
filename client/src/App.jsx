import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Doctors from './pages/Doctors';
import BookAppointment from './pages/BookAppointment';
import Medicines from './pages/Medicines';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import DoctorDashboard from './pages/DoctorDashboard';
import Admin from './pages/Admin';

// Protected Route wrapper
const Protected = ({ user, children, roles }) => {
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('hc_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cart, setCart] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
    sessionStorage.setItem('hc_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    sessionStorage.removeItem('hc_user');
  };

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register onLogin={handleLogin} />} />
        <Route path="/doctors" element={<Doctors user={user} />} />
        <Route path="/book/:doctorId" element={
          <Protected user={user}>
            <BookAppointment user={user} />
          </Protected>
        } />
        <Route path="/medicines" element={<Medicines user={user} cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={
          <Protected user={user}>
            <Cart user={user} cart={cart} setCart={setCart} />
          </Protected>
        } />
        <Route path="/profile" element={
          <Protected user={user} roles={['patient']}>
            <Profile user={user} />
          </Protected>
        } />
        <Route path="/doctor-dashboard" element={
          <Protected user={user} roles={['doctor']}>
            <DoctorDashboard user={user} />
          </Protected>
        } />
        <Route path="/admin" element={
          <Protected user={user} roles={['admin']}>
            <Admin />
          </Protected>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
