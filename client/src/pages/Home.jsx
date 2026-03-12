import { Link } from 'react-router-dom';
import './Home.css';

export default function Home({ user }) {
  const features = [
    { icon: '🩺', title: 'Book Appointments', desc: 'Browse qualified doctors and book appointments at your convenience.' },
    { icon: '💊', title: 'Order Medicines', desc: 'Search and order medicines online with doorstep delivery.' },
    { icon: '📋', title: 'View Prescriptions', desc: 'Access your prescriptions and appointment history anytime.' },
    { icon: '🔒', title: 'Secure & Simple', desc: 'Simple and reliable healthcare management platform.' },
  ];

  const specializations = ['Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Psychiatry'];

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🏥 Trusted Healthcare Platform</div>
          <h1>Your Health, <br /><span>Our Priority</span></h1>
          <p>Book doctor appointments, order medicines, and manage your health records — all in one place.</p>
          <div className="hero-actions">
            {user ? (
              <>
                <Link to="/doctors" className="btn btn-primary">Book Appointment</Link>
                <Link to="/medicines" className="btn btn-outline">Order Medicines</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">Get Started Free</Link>
                <Link to="/login" className="btn btn-outline">Login</Link>
              </>
            )}
          </div>
          <div className="hero-stats">
            <div><strong>50+</strong><span>Doctors</span></div>
            <div><strong>200+</strong><span>Medicines</span></div>
            <div><strong>1000+</strong><span>Patients</span></div>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-card-float card-1">
            <span>✅</span> Appointment Confirmed
          </div>
          <div className="hero-img-circle">
            <span className="big-icon">👨‍⚕️</span>
          </div>
          <div className="hero-card-float card-2">
            <span>💊</span> Prescription Ready
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Browse by Specialization</h2>
          <div className="spec-grid">
            {specializations.map(s => (
              <Link to="/doctors" key={s} className="spec-card">
                <span className="spec-icon">🩺</span>
                <span>{s}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Why Choose HealthCare+?</h2>
          <div className="grid-4">
            {features.map(f => (
              <div key={f.title} className="feature-card card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="cta-section">
          <div className="container">
            <h2>Ready to take control of your health?</h2>
            <p>Join thousands of patients managing their healthcare online.</p>
            <Link to="/register" className="btn btn-primary">Create Free Account</Link>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container">
          <span>🏥 HealthCare+ &copy; 2026</span>
          <span>Healthcare System</span>
        </div>
      </footer>
    </div>
  );
}
