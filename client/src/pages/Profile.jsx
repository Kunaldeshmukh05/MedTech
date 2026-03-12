import { useState, useEffect } from 'react';
import { getUserAppointments, getUserOrders } from '../services/api';
import './Profile.css';

export default function Profile({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState('appointments');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getUserAppointments(user._id),
      getUserOrders(user._id)
    ]).then(([appRes, ordRes]) => {
      setAppointments(appRes.data);
      setOrders(ordRes.data);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [user._id]);

  const statusColor = { pending: 'badge-orange', confirmed: 'badge-green', completed: 'badge-green' };

  return (
    <div className="page-wrapper">
      {/* Profile Header */}
      <div className="profile-header card">
        <div className="profile-avatar">{user.name[0].toUpperCase()}</div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
        <div className="profile-stats">
          <div><strong>{appointments.length}</strong><span>Appointments</span></div>
          <div><strong>{appointments.filter(a => a.prescription).length}</strong><span>Prescriptions</span></div>
          <div><strong>{orders.length}</strong><span>Orders</span></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button className={`tab-btn ${tab === 'appointments' ? 'active' : ''}`} onClick={() => setTab('appointments')}>
          📅 Appointments
        </button>
        <button className={`tab-btn ${tab === 'prescriptions' ? 'active' : ''}`} onClick={() => setTab('prescriptions')}>
          📋 Prescriptions
        </button>
        <button className={`tab-btn ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
          🛒 Orders
        </button>
      </div>

      {loading ? (
        <div className="spinner-wrap"><div className="spinner" /></div>
      ) : (
        <>
          {/* Appointments Tab */}
          {tab === 'appointments' && (
            <div>
              {appointments.length === 0 ? (
                <div className="empty-state"><div className="icon">📅</div><p>No appointments yet.</p></div>
              ) : appointments.map(appt => (
                <div key={appt._id} className="appointment-card card">
                  <div className="appt-left">
                    <div className="appt-icon">🩺</div>
                    <div>
                      <h3>Dr. {appt.doctorId?.name || 'Unknown'}</h3>
                      <p>{appt.doctorId?.specialization}</p>
                    </div>
                  </div>
                  <div className="appt-details">
                    <span>📅 {appt.date}</span>
                    <span>🕐 {appt.timeSlot}</span>
                  </div>
                  <span className={`badge ${statusColor[appt.status] || 'badge-gray'}`}>{appt.status}</span>
                </div>
              ))}
            </div>
          )}

          {/* Prescriptions Tab */}
          {tab === 'prescriptions' && (
            <div>
              {appointments.filter(a => a.prescription).length === 0 ? (
                <div className="empty-state"><div className="icon">📋</div><p>No prescriptions yet.</p></div>
              ) : appointments.filter(a => a.prescription).map(appt => (
                <div key={appt._id} className="prescription-card card">
                  <div className="rx-header">
                    <div>
                      <h3>Dr. {appt.doctorId?.name}</h3>
                      <p>{appt.date} • {appt.timeSlot}</p>
                    </div>
                    <span className="rx-badge">Rx</span>
                  </div>
                  <div className="rx-body">
                    <div className="rx-section">
                      <label>Prescription Notes</label>
                      <p>{appt.prescription}</p>
                    </div>
                    {appt.medicines && (
                      <div className="rx-section">
                        <label>Prescribed Medicines</label>
                        <p>{appt.medicines}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Orders Tab */}
          {tab === 'orders' && (
            <div>
              {orders.length === 0 ? (
                <div className="empty-state"><div className="icon">🛒</div><p>No orders yet.</p></div>
              ) : orders.map(order => (
                <div key={order._id} className="order-card card">
                  <div className="order-header">
                    <div>
                      <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <p>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <span className="badge badge-green">{order.status}</span>
                  </div>
                  <div className="order-medicines">
                    {order.medicines.map((m, i) => (
                      <span key={i} className="med-pill">💊 {m.name} × {m.quantity}</span>
                    ))}
                  </div>
                  <div className="order-footer">
                    <span>📍 {order.address}</span>
                    <strong>₹{order.totalAmount}</strong>
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
