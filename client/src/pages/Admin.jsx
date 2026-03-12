import { useState, useEffect } from 'react';
import { getDoctors, addDoctor, getMedicines, addMedicine, updateStock } from '../services/api';
import './Admin.css';

export default function Admin() {
  const [tab, setTab] = useState('doctors');
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');

  const [docForm, setDocForm] = useState({ name: '', specialization: '', experience: '' });
  const [medForm, setMedForm] = useState({ name: '', description: '', price: '', stock: '', category: '' });
  const [stockEdits, setStockEdits] = useState({});

  const SPECIALIZATIONS = ['Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Psychiatry', 'General', 'Dentistry', 'ENT', 'Ophthalmology'];

  useEffect(() => {
    Promise.all([getDoctors(), getMedicines()])
      .then(([d, m]) => { setDoctors(d.data); setMedicines(m.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const showSuccess = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const res = await addDoctor({ ...docForm, experience: Number(docForm.experience) });
      setDoctors([...doctors, res.data.doctor]);
      setDocForm({ name: '', specialization: '', experience: '' });
      showSuccess('Doctor added successfully!');
    } catch (err) { alert(err.response?.data?.message || 'Failed to add doctor'); }
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      const res = await addMedicine({ ...medForm, price: Number(medForm.price), stock: Number(medForm.stock) });
      setMedicines([...medicines, res.data.medicine]);
      setMedForm({ name: '', description: '', price: '', stock: '', category: '' });
      showSuccess('Medicine added successfully!');
    } catch (err) { alert(err.response?.data?.message || 'Failed to add medicine'); }
  };

  const handleUpdateStock = async (id) => {
    try {
      await updateStock(id, Number(stockEdits[id]));
      setMedicines(medicines.map(m => m._id === id ? { ...m, stock: Number(stockEdits[id]) } : m));
      setStockEdits(prev => { const n = { ...prev }; delete n[id]; return n; });
      showSuccess('Stock updated!');
    } catch (err) { alert('Failed to update stock'); }
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Admin Panel</h1>
      <p className="page-subtitle">Manage doctors, medicines, and platform data</p>

      {success && <div className="alert alert-success">{success}</div>}

      <div className="profile-tabs">
        <button className={`tab-btn ${tab === 'doctors' ? 'active' : ''}`} onClick={() => setTab('doctors')}>👨‍⚕️ Doctors ({doctors.length})</button>
        <button className={`tab-btn ${tab === 'medicines' ? 'active' : ''}`} onClick={() => setTab('medicines')}>💊 Medicines ({medicines.length})</button>
      </div>

      {loading ? <div className="spinner-wrap"><div className="spinner" /></div> : (
        <>
          {/* Doctors Tab */}
          {tab === 'doctors' && (
            <div className="admin-layout">
              <div className="admin-form card">
                <h3>Add New Doctor</h3>
                <form onSubmit={handleAddDoctor}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input placeholder="Dr. Jane Smith" value={docForm.name} onChange={e => setDocForm({ ...docForm, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Specialization</label>
                    <select value={docForm.specialization} onChange={e => setDocForm({ ...docForm, specialization: e.target.value })} required>
                      <option value="">-- Select --</option>
                      {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Years of Experience</label>
                    <input type="number" min="0" placeholder="10" value={docForm.experience} onChange={e => setDocForm({ ...docForm, experience: e.target.value })} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>+ Add Doctor</button>
                </form>
              </div>

              <div className="admin-list">
                <h3 style={{ marginBottom: '14px', fontWeight: 700 }}>All Doctors ({doctors.length})</h3>
                {doctors.length === 0 ? <div className="empty-state"><div className="icon">👨‍⚕️</div><p>No doctors added yet.</p></div> :
                  doctors.map(d => (
                    <div key={d._id} className="admin-item card">
                      <div className="admin-item-icon">🩺</div>
                      <div>
                        <h4>Dr. {d.name}</h4>
                        <p>{d.specialization} • {d.experience} years</p>
                      </div>
                      <span className="badge badge-green">{d.availableSlots?.length} slots</span>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          {/* Medicines Tab */}
          {tab === 'medicines' && (
            <div className="admin-layout">
              <div className="admin-form card">
                <h3>Add New Medicine</h3>
                <form onSubmit={handleAddMedicine}>
                  <div className="form-group">
                    <label>Medicine Name</label>
                    <input placeholder="Paracetamol 500mg" value={medForm.name} onChange={e => setMedForm({ ...medForm, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input placeholder="Used for fever and pain relief" value={medForm.description} onChange={e => setMedForm({ ...medForm, description: e.target.value })} />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Price (₹)</label>
                      <input type="number" min="0" placeholder="50" value={medForm.price} onChange={e => setMedForm({ ...medForm, price: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>Stock</label>
                      <input type="number" min="0" placeholder="100" value={medForm.stock} onChange={e => setMedForm({ ...medForm, stock: e.target.value })} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input placeholder="Antibiotic, Painkiller, Vitamin..." value={medForm.category} onChange={e => setMedForm({ ...medForm, category: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>+ Add Medicine</button>
                </form>
              </div>

              <div className="admin-list">
                <h3 style={{ marginBottom: '14px', fontWeight: 700 }}>All Medicines ({medicines.length})</h3>
                {medicines.length === 0 ? <div className="empty-state"><div className="icon">💊</div><p>No medicines added yet.</p></div> :
                  medicines.map(med => (
                    <div key={med._id} className="admin-item card">
                      <div className="admin-item-icon">💊</div>
                      <div style={{ flex: 1 }}>
                        <h4>{med.name}</h4>
                        <p>₹{med.price} • Stock: {med.stock}</p>
                      </div>
                      <div className="stock-edit">
                        <input
                          type="number"
                          min="0"
                          placeholder={med.stock}
                          value={stockEdits[med._id] ?? ''}
                          onChange={e => setStockEdits(prev => ({ ...prev, [med._id]: e.target.value }))}
                          style={{ width: '70px' }}
                        />
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => handleUpdateStock(med._id)}
                          disabled={!stockEdits[med._id]}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
