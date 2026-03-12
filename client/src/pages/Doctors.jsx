import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors } from '../services/api';
import './Doctors.css';

export default function Doctors({ user }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getDoctors()
      .then(res => setDoctors(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const specialIcons = {
    Cardiology: '❤️', Dermatology: '🧴', Neurology: '🧠', Orthopedics: '🦴',
    Pediatrics: '👶', Psychiatry: '🧘', General: '🩺', Dentistry: '🦷',
    Ophthalmology: '👁️', ENT: '👂',
  };

  const getIcon = (spec) => specialIcons[spec] || '🩺';

  return (
    <div className="page-wrapper">
      <div className="doctors-header">
        <div>
          <h1 className="page-title">Find a Doctor</h1>
          <p className="page-subtitle">Browse our qualified specialists and book an appointment</p>
        </div>
        <div className="doctors-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="spinner-wrap"><div className="spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🔍</div>
          <p>No doctors found matching your search.</p>
        </div>
      ) : (
        <div className="doctors-grid">
          {filtered.map(doctor => (
            <div key={doctor._id} className="doctor-card card">
              <div className="doctor-avatar">{getIcon(doctor.specialization)}</div>
              <div className="doctor-info">
                <h3>Dr. {doctor.name}</h3>
                <span className="badge badge-green">{doctor.specialization}</span>
                <div className="doctor-meta">
                  <span>🏅 {doctor.experience} years experience</span>
                  <span>🕐 {doctor.availableSlots?.length || 0} slots available</span>
                </div>
                <div className="doctor-slots">
                  {(doctor.availableSlots || []).slice(0, 3).map(slot => (
                    <span key={slot} className="slot-chip">{slot}</span>
                  ))}
                  {(doctor.availableSlots?.length || 0) > 3 && (
                    <span className="slot-chip slot-more">+{doctor.availableSlots.length - 3} more</span>
                  )}
                </div>
              </div>
              <button
                className="btn btn-primary btn-book"
                onClick={() => {
                  if (!user) navigate('/login');
                  else navigate(`/book/${doctor._id}`, { state: { doctor } });
                }}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
