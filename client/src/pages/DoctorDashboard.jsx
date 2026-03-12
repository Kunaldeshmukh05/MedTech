import { useState, useEffect } from 'react';
import { getDoctors, getDoctorAppointments, addPrescription } from '../services/api';
import './DoctorDashboard.css';

export default function DoctorDashboard({ user }) {
  const [doctorId, setDoctorId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prescForms, setPrescForms] = useState({});
  const [saved, setSaved] = useState({});

  useEffect(() => {
    // Find doctor record by matching user name
    getDoctors().then(res => {
      const match = res.data.find(d => d.name.toLowerCase() === user.name.toLowerCase());
      if (match) {
        setDoctorId(match._id);
        return getDoctorAppointments(match._id);
      }
    }).then(res => {
      if (res) setAppointments(res.data);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [user.name]);

  const handlePrescChange = (id, field, value) => {
    setPrescForms(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const handleSavePresc = async (apptId) => {
    const form = prescForms[apptId] || {};
    try {
      await addPrescription({ appointmentId: apptId, prescription: form.prescription || '', medicines: form.medicines || '' });
      setSaved(prev => ({ ...prev, [apptId]: true }));
      setAppointments(prev => prev.map(a =>
        a._id === apptId ? { ...a, prescription: form.prescription, medicines: form.medicines, status: 'completed' } : a
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const pending = appointments.filter(a => a.status !== 'completed');
  const completed = appointments.filter(a => a.status === 'completed');

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Doctor Dashboard</h1>
      <p className="page-subtitle">Welcome, Dr. {user.name} — manage your appointments and prescriptions</p>

      {/* Stats */}
      <div className="dash-stats">
        <div className="stat-card card">
          <span>📅</span>
          <div><strong>{appointments.length}</strong><p>Total Appointments</p></div>
        </div>
        <div className="stat-card card">
          <span>⏳</span>
          <div><strong>{pending.length}</strong><p>Pending</p></div>
        </div>
        <div className="stat-card card">
          <span>✅</span>
          <div><strong>{completed.length}</strong><p>Completed</p></div>
        </div>
      </div>

      {loading ? (
        <div className="spinner-wrap"><div className="spinner" /></div>
      ) : !doctorId ? (
        <div className="empty-state">
          <div className="icon">⚠️</div>
          <p>No doctor profile found for this account.<br />Please contact admin to link your profile.</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="empty-state"><div className="icon">📅</div><p>No appointments yet.</p></div>
      ) : (
        <>
          {pending.length > 0 && (
            <div>
              <h2 className="section-label">Pending Appointments</h2>
              {pending.map(appt => (
                <div key={appt._id} className="appt-dash-card card">
                  <div className="appt-dash-top">
                    <div className="appt-patient-info">
                      <div className="patient-avatar">{appt.userId?.name?.[0] || 'P'}</div>
                      <div>
                        <h3>{appt.userId?.name || 'Patient'}</h3>
                        <p>{appt.userId?.email} • {appt.userId?.phone}</p>
                        <p>📅 {appt.date} &nbsp;🕐 {appt.timeSlot}</p>
                      </div>
                    </div>
                    <span className="badge badge-orange">{appt.status}</span>
                  </div>

                  <div className="presc-form">
                    <div className="form-group">
                      <label>Prescription Notes</label>
                      <textarea
                        placeholder="Write diagnosis, treatment, and notes..."
                        rows={3}
                        value={prescForms[appt._id]?.prescription || ''}
                        onChange={e => handlePrescChange(appt._id, 'prescription', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Prescribed Medicines</label>
                      <input
                        type="text"
                        placeholder="e.g. Paracetamol 500mg, Cetirizine 10mg"
                        value={prescForms[appt._id]?.medicines || ''}
                        onChange={e => handlePrescChange(appt._id, 'medicines', e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSavePresc(appt._id)}
                      disabled={saved[appt._id]}
                    >
                      {saved[appt._id] ? '✅ Saved' : 'Save Prescription'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {completed.length > 0 && (
            <div style={{ marginTop: '28px' }}>
              <h2 className="section-label">Completed Appointments</h2>
              {completed.map(appt => (
                <div key={appt._id} className="appt-dash-card card completed-card">
                  <div className="appt-dash-top">
                    <div className="appt-patient-info">
                      <div className="patient-avatar">{appt.userId?.name?.[0] || 'P'}</div>
                      <div>
                        <h3>{appt.userId?.name || 'Patient'}</h3>
                        <p>📅 {appt.date} &nbsp;🕐 {appt.timeSlot}</p>
                        {appt.prescription && <p className="rx-preview">Rx: {appt.prescription.slice(0, 80)}...</p>}
                      </div>
                    </div>
                    <span className="badge badge-green">completed</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
