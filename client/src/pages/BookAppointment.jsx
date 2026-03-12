import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookAppointment } from '../services/api';
import './BookAppointment.css';

export default function BookAppointment({ user }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const doctor = state?.doctor;

  const [form, setForm] = useState({ date: '', timeSlot: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!doctor) {
    navigate('/doctors');
    return null;
  }

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await bookAppointment({ userId: user._id, doctorId: doctor._id, ...form });
      setSuccess('🎉 Appointment booked successfully! You can view it in your profile.');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="book-layout">
        {/* Doctor Info Panel */}
        <div className="book-doctor-panel card">
          <div className="book-doctor-avatar">🩺</div>
          <h2>Dr. {doctor.name}</h2>
          <span className="badge badge-green">{doctor.specialization}</span>
          <div className="book-doctor-details">
            <div className="detail-row">
              <span>🏅</span>
              <span>{doctor.experience} years experience</span>
            </div>
            <div className="detail-row">
              <span>🕐</span>
              <span>{doctor.availableSlots?.length} time slots available</span>
            </div>
          </div>
          <div className="book-slots-list">
            <p>Available Time Slots</p>
            {(doctor.availableSlots || []).map(slot => (
              <span
                key={slot}
                className={`slot-chip-lg ${form.timeSlot === slot ? 'selected' : ''}`}
                onClick={() => setForm({ ...form, timeSlot: slot })}
              >
                🕐 {slot}
              </span>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="book-form-panel card">
          <h2 className="auth-title">Book Appointment</h2>
          <p className="auth-desc">Select your preferred date and time slot</p>

          {success && (
            <div className="alert alert-success">
              {success}
              <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/profile')}>View Profile</button>
                <button className="btn btn-outline btn-sm" onClick={() => navigate('/doctors')}>More Doctors</button>
              </div>
            </div>
          )}

          {error && <div className="alert alert-error">{error}</div>}

          {!success && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Date</label>
                <input
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Select Time Slot</label>
                <select
                  value={form.timeSlot}
                  onChange={e => setForm({ ...form, timeSlot: e.target.value })}
                  required
                >
                  <option value="">-- Choose a time slot --</option>
                  {(doctor.availableSlots || []).map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="booking-summary">
                <h4>Booking Summary</h4>
                <div className="summary-row"><span>Doctor</span><span>Dr. {doctor.name}</span></div>
                <div className="summary-row"><span>Specialization</span><span>{doctor.specialization}</span></div>
                <div className="summary-row"><span>Date</span><span>{form.date || '—'}</span></div>
                <div className="summary-row"><span>Time</span><span>{form.timeSlot || '—'}</span></div>
                <div className="summary-row"><span>Patient</span><span>{user.name}</span></div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Booking...' : '✅ Confirm Appointment'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
