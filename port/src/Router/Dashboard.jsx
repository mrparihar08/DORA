// src/Router/Dashboard.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const navItems = [
    { title: "Home 🏠", path: "/dashboard" },
    { title: "Symptom Checker 📋", path: "/symptom-checker" },
    { title: "Health Tips 💡", path: "/health-tips" },
    { title: "Reports 📊", path: "/reports" },
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="sidebar-title">VEDH</h2>
        <div className="sidebar-menu">
          {navItems.map((item, idx) => (
            <div
              key={`nav-${idx}`}
              onClick={() => navigate(item.path)}
              className="menu-item"
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      <main className="main-content">
        <header className="welcome-header">
          <h1>Welcome to VEDH</h1>
          <p>
            Easily track and check your health symptoms with our intelligent
            system. <br />
            Get insights, tips, and personalized recommendations.
          </p>
        </header>

        <section className="cards-container">
          <div className="card">
            <h3>🩺 Symptom Checker</h3>
            <p>Browse or enter your symptoms to get AI-based insights.</p>
            <Link to="/symptom-checker" className="card-btn">Start Checking</Link>
          </div>

          <div className="card">
            <h3>💡 Health Tips</h3>
            <p>Discover tips to stay fit, reduce stress, and improve your lifestyle.</p>
            <Link to="/health-tips" className="card-btn">Explore Tips</Link>
          </div>

          <div className="card">
            <h3>📊 Recent Reports</h3>
            <p>Review your past checks and track progress over time.</p>
            <Link to="/reports" className="card-btn">View Reports</Link>
          </div>
        </section>
      </main>

      <aside className="right-sidebar">
        <div className="health-tip">
          <h3>Today’s Health Tip</h3>
          <p>💧 Stay hydrated! Drink at least 8 glasses of water daily.</p>
          <a href="/">Learn More</a>
        </div>
      </aside>
    </div>
  );
}
