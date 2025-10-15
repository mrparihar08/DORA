// src/Router/HealthTips.jsx
import { useNavigate } from "react-router-dom";

export default function HealthTips() {
  const navigate = useNavigate();

  const navItems = [
    { title: "Home 🏠", path: "/dashboard" },
    { title: "Symptom Checker 📋", path: "/symptom-checker" },
    { title: "Health Tips 💡", path: "/health-tips" },
    { title: "Reports 📊", path: "/reports" }
  ];

  const tips = [
    { id: 1, title: "Stay Hydrated 💧", description: "Drink at least 8 glasses..." },
    { id: 2, title: "Regular Exercise 🏃", description: "Engage in at least 30 minutes..." },
    { id: 3, title: "Balanced Diet 🥗", description: "Eat a mix of fruits, vegetables..." },
    { id: 4, title: "Proper Sleep 😴", description: "Aim for 7–8 hours of quality sleep." },
    { id: 5, title: "Stress Management 🧘", description: "Practice meditation or deep breathing." },
  ];

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="sidebar-title">HEALTH SYMPTOM CHECKER</h2>
        <div className="sidebar-menu">
          {navItems.map((item, idx) => (
            <div key={`nav-${idx}`} onClick={() => navigate(item.path)} className="menu-item">
              {item.title}
            </div>
          ))}
        </div>
      </div>

      <div className="main-content">
        <h1 className="page-title">Daily Health Tips 💡</h1>
        <p className="page-subtitle">Simple lifestyle changes can make a big difference.</p>

        <div className="tips-container">
          {tips.map((tip) => (
            <div key={tip.id} className="tip-card">
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="right-sidebar">
        <h3>Quick Reminder</h3>
        <p>Take short breaks during work or study sessions to stretch and rest your eyes.</p>
      </div>
    </div>
  );
}
