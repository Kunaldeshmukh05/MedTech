import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-icon">🏥</span>
          <span className="brand-text">HealthCare<span>+</span></span>
        </Link>
      </div>

      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/doctors" className={isActive('/doctors')}>Doctors</Link>
            <Link to="/medicines" className={isActive('/medicines')}>Medicines</Link>
            <Link to="/profile" className={isActive('/profile')}>Profile</Link>
            {user.role === 'admin' && <Link to="/admin" className={isActive('/admin')}>Admin</Link>}
            {user.role === 'doctor' && <Link to="/doctor-dashboard" className={isActive('/doctor-dashboard')}>Dashboard</Link>}
            <div className="navbar-user">
              <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
              <span className={`role-badge role-${user.role}`}>{user.role}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className={isActive('/login')}>Login</Link>
            <Link to="/register" className="btn-nav-register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
