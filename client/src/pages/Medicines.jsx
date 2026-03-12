import { useState, useEffect } from 'react';
import { getMedicines } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Medicines.css';

export default function Medicines({ user, cart, setCart }) {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async (q = '') => {
    setLoading(true);
    try {
      const res = await getMedicines(q);
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchMedicines(e.target.value);
  };

  const addToCart = (medicine) => {
    if (!user) { navigate('/login'); return; }
    const exists = cart.find(c => c._id === medicine._id);
    if (exists) {
      setCart(cart.map(c => c._id === medicine._id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...medicine, qty: 1 }]);
    }
  };

  const getQty = (id) => cart.find(c => c._id === id)?.qty || 0;

  const medIcons = ['💊', '🧴', '💉', '🩺', '🌡️', '🩹'];
  const getIcon = (i) => medIcons[i % medIcons.length];

  return (
    <div className="page-wrapper">
      <div className="med-header">
        <div>
          <h1 className="page-title">Medicine Store</h1>
          <p className="page-subtitle">Browse and order from our wide selection of medicines</p>
        </div>
        <div className="med-header-right">
          <div className="doctors-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search medicines..."
              value={search}
              onChange={handleSearch}
            />
          </div>
          {cart.length > 0 && (
            <button className="btn btn-primary cart-btn" onClick={() => navigate('/cart')}>
              🛒 Cart ({cart.reduce((a, c) => a + c.qty, 0)})
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="spinner-wrap"><div className="spinner" /></div>
      ) : medicines.length === 0 ? (
        <div className="empty-state">
          <div className="icon">💊</div>
          <p>No medicines found.</p>
        </div>
      ) : (
        <div className="med-grid">
          {medicines.map((med, i) => (
            <div key={med._id} className="med-card card">
              <div className="med-icon">{getIcon(i)}</div>
              <div className="med-body">
                <h3>{med.name}</h3>
                <p>{med.description}</p>
                <div className="med-meta">
                  <span className="med-price">₹{med.price}</span>
                  <span className={`badge ${med.stock > 0 ? 'badge-green' : 'badge-gray'}`}>
                    {med.stock > 0 ? `${med.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
              <div className="med-actions">
                {getQty(med._id) > 0 ? (
                  <div className="qty-controls">
                    <button onClick={() => {
                      const newCart = cart.map(c => c._id === med._id ? { ...c, qty: c.qty - 1 } : c).filter(c => c.qty > 0);
                      setCart(newCart);
                    }}>−</button>
                    <span>{getQty(med._id)}</span>
                    <button onClick={() => addToCart(med)}>+</button>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(med)}
                    disabled={med.stock === 0}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="floating-cart" onClick={() => navigate('/cart')}>
          🛒 View Cart ({cart.reduce((a, c) => a + c.qty, 0)} items) — ₹{cart.reduce((a, c) => a + c.price * c.qty, 0)}
        </div>
      )}
    </div>
  );
}
