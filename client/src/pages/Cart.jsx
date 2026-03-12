import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../services/api';
import './Cart.css';

export default function Cart({ user, cart, setCart }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ address: '', phone: user?.phone || '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  const updateQty = (id, delta) => {
    const newCart = cart.map(c => c._id === id ? { ...c, qty: c.qty + delta } : c).filter(c => c.qty > 0);
    setCart(newCart);
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);
    setError('');
    try {
      await placeOrder({
        userId: user._id,
        medicines: cart.map(c => ({ medicineId: c._id, name: c.name, price: c.price, quantity: c.qty })),
        address: form.address,
        phone: form.phone,
        totalAmount: total
      });
      setSuccess(true);
      setCart([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="page-wrapper">
        <div className="order-success card">
          <div className="success-icon">✅</div>
          <h2>Order Placed Successfully!</h2>
          <p>Your medicines will be delivered to your address soon.</p>
          <p className="success-sub">You'll receive a confirmation shortly.</p>
          <div className="success-actions">
            <button className="btn btn-primary" onClick={() => navigate('/medicines')}>Continue Shopping</button>
            <button className="btn btn-outline" onClick={() => navigate('/profile')}>View Profile</button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="empty-state">
          <div className="icon">🛒</div>
          <p>Your cart is empty</p>
          <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => navigate('/medicines')}>
            Browse Medicines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Your Cart</h1>
      <p className="page-subtitle">{cart.reduce((a, c) => a + c.qty, 0)} items in your cart</p>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item card">
              <div className="cart-item-icon">💊</div>
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price} per unit</p>
              </div>
              <div className="cart-item-controls">
                <div className="qty-controls">
                  <button onClick={() => updateQty(item._id, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, +1)}>+</button>
                </div>
                <span className="item-subtotal">₹{item.price * item.qty}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Form */}
        <div className="cart-sidebar">
          <div className="order-summary card">
            <h3>Order Summary</h3>
            {cart.map(item => (
              <div key={item._id} className="summary-row">
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="delivery-form card">
            <h3>Delivery Details</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleOrder}>
              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  placeholder="Enter your complete delivery address..."
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  rows={3}
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
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Placing Order...' : `Place Order — ₹${total}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
