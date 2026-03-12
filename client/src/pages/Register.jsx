import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import './Auth.css';

export default function Register({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'patient' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await register(form);
      onLogin(res.data.user);
      navigate('/doctors');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-brand-icon">🏥</span>
          <h1>HealthCare<span>+</span></h1>
        </div>
        <h2>Join us today!</h2>
        <p>Create a free account to start managing your health digitally and efficiently.</p>
        <div className="auth-features">
          <div>✅ Free to register and use</div>
          <div>✅ Consult top specialists</div>
          <div>✅ Secure health records</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-card card">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-desc">Fill in your details to get started</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Register As</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
