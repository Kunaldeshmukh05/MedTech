import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './Auth.css';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(form);
      onLogin(res.data.user);
      const role = res.data.user.role;
      if (role === 'admin') navigate('/admin');
      else if (role === 'doctor') navigate('/doctor-dashboard');
      else navigate('/doctors');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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
        <h2>Welcome back!</h2>
        <p>Sign in to manage your appointments, prescriptions, and medicines all in one place.</p>
        <div className="auth-features">
          <div>✅ Book doctor appointments instantly</div>
          <div>✅ View prescriptions online</div>
          <div>✅ Order medicines to your door</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-card card">
          <h2 className="auth-title">Sign In</h2>
          <p className="auth-desc">Enter your credentials to access your account</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
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
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer-link">
            Don't have an account? <Link to="/register">Create one free</Link>
          </div>

          <div className="auth-demo">
            <p>Demo credentials:</p>
            <code>admin@health.com / admin123</code>
          </div>
        </div>
      </div>
    </div>
  );
}
