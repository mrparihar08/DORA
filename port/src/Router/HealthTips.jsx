import React from "react";
import { useNavigate } from "react-router-dom";

export default function HealthTips() {
  const navigate = useNavigate();

  const navItems = [
    { title: "Home 🏠", path: "/dashboard" },
    { title: "Symptom Checker 📋", path: "/SymptomChecker" },
    { title: "Health Tips 💡", path: "/Health_Tips" },
    { title: "Reports 📊", path: "/reports" }
  ];

  const tips = [
    {
      id: 1,
      title: "Stay Hydrated 💧",
      description:
        "Drink at least 8 glasses of water daily to keep your body hydrated and maintain energy levels.",
    },
    {
      id: 2,
      title: "Regular Exercise 🏃",
      description:
        "Engage in at least 30 minutes of physical activity daily to stay fit and improve mental health.",
    },
    {
      id: 3,
      title: "Balanced Diet 🥗",
      description:
        "Eat a mix of fruits, vegetables, proteins, and whole grains to strengthen immunity.",
    },
    {
      id: 4,
      title: "Proper Sleep 😴",
      description:
        "Aim for 7–8 hours of quality sleep every night to restore energy and focus.",
    },
    {
      id: 5,
      title: "Stress Management 🧘",
      description:
        "Practice meditation, yoga, or deep breathing to reduce stress and improve overall well-being.",
    },
  ];

  return (
    <div className="app-container">
      {/* -------- Sidebar -------- */}
      <div className="sidebar">
        <h2 className="sidebar-title">HEALTH SYMPTOM CHECKER</h2>
        <div className="sidebar-menu">
          {navItems.map((item) => (
            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className="menu-item"
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      {/* -------- Main Content -------- */}
      <div className="main-content">
        <h1 className="page-title">Daily Health Tips 💡</h1>
        <p className="page-subtitle">
          Simple lifestyle changes can make a big difference in your health.
        </p>

        <div className="tips-container">
          {tips.map((tip) => (
            <div key={tip.id} className="tip-card">
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* -------- Right Sidebar -------- */}
      <div className="right-sidebar">
        <h3>Quick Reminder</h3>
        <p>
          Take short breaks during work or study sessions to stretch and rest
          your eyes. Your body and mind will thank you!
        </p>
      </div>
    </div>
  );
}
