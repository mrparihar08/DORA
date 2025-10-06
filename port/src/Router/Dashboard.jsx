import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Sidebar navigation items
  const navItems = [
    { title: "Home 🏠", path: "/dashboard" },
    { title: "Symptom Checker 📋", path: "/SymptomChecker" },
    { title: "Health Tips 💡", path: "/Health_Tips" },
    { title: "Reports 📊", path: "/reports" }
  ];

  return (
    <div className="dashboard-container">
      {/* -------- Sidebar -------- */}
      <aside className="sidebar">
        <h2 className="sidebar-title">HEALTH SYMPTOM CHECKER</h2>
        <nav className="sidebar-menu">
          {navItems.map((item) => (
            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className="menu-item"
            >
              {item.title}
            </div>
          ))}
        </nav>
      </aside>

      {/* -------- Main Content -------- */}
      <main className="main-content">
        <header className="welcome-header">
          <h1>Welcome to Health Symptom Checker</h1>
          <p>
            Easily track and check your health symptoms with our intelligent
            system. <br /> Get insights, tips, and personalized recommendations.
          </p>
        </header>

        <section className="cards-container">
          {/* Symptom Checker Card */}
          <div className="card">
            <h3>🩺 Symptom Checker</h3>
            <p>
              Browse or enter your symptoms to get AI-based insights about
              possible health conditions.
            </p>
            <Link to="/SymptomChecker">
              <button className="card-btn">Start Checking</button>
            </Link>
          </div>

          {/* Health Tips Card */}
          <div className="card">
            <h3>💡 Health Tips</h3>
            <p>
              Discover tips to stay fit, reduce stress, and improve your
              lifestyle.
            </p>
            <Link to="/Health_Tips">
              <button className="card-btn">Explore Tips</button>
            </Link>
          </div>

          {/* Reports Card */}
          <div className="card">
            <h3>📊 Recent Reports</h3>
            <p>
              Review your past checks and track your health progress over time.
            </p>
            <Link to="/reports">
              <button className="card-btn">View Reports</button>
            </Link>
          </div>
        </section>
      </main>

      {/* -------- Right Sidebar -------- */}
      <aside className="right-sidebar">
        <div className="health-tip">
          <h3>Today’s Health Tip</h3>
          <p>
            💧 Stay hydrated! Drink at least 8 glasses of water daily to boost
            your energy and focus.
          </p>
          <a href="/">Learn More</a>
        </div>
      </aside>
    </div>
  );
}
