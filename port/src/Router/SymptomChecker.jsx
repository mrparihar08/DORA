import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   STEP 1: Symptom Checker
========================================================= */
export function SymptomChecker() {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const symptoms = {
    general: { title: "General Symptoms", path: "/general_symptoms" },
    skin: { title: "Skin Symptoms", path: "/skin_symptoms" },
  };

  const bodyParts = [
    { title: "Head", path: "/head" },
    { title: "Neck", path: "/neck" },
    { title: "Chest", path: "/chest" },
    { title: "Arms", path: "/arms" },
    { title: "Abdomen", path: "/abdomen" },
    { title: "Pelvis", path: "/pelvis" },
    { title: "Back", path: "/back" },
    { title: "Buttocks", path: "/buttocks" },
    { title: "Legs", path: "/legs" },
  ];

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleNext = () => {
    localStorage.setItem("symptoms", JSON.stringify(selectedSymptoms));
    navigate("/step2"); // ✅ go to Step 2
  };

  const navItems = [
   { title: "Home 🏠", path: "/dashboard" },
    { title: "Symptom Checker 📋", path: "/SymptomChecker" },
    { title: "Health Tips 💡", path: "/Health_Tips" },
    { title: "Reports 📊", path: "/reports" }
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="main-content">
        <h1 className="page-title">Step 1: Browse Symptoms</h1>

        {/* Category selection */}
        <div
          className={`list-item clickable ${
            selectedSymptoms.includes(symptoms.general.title) ? "selected" : ""
          }`}
          onClick={() => {
            toggleSymptom(symptoms.general.title);
            navigate(symptoms.general.path);
          }}
        >
          {symptoms.general.title}
        </div>

        <div
          className={`list-item clickable ${
            selectedSymptoms.includes(symptoms.skin.title) ? "selected" : ""
          }`}
          onClick={() => {
            toggleSymptom(symptoms.skin.title);
            navigate(symptoms.skin.path);
          }}
        >
          {symptoms.skin.title}
        </div>

        {/* Body-part list */}
        <div className="list-item blue-text">BODY LIST</div>
        {bodyParts.map((part) => (
          <div
            key={part.title}
            className="list-item clickable"
            onClick={() => navigate(part.path)}
          >
            {part.title}
            <span className="arrow">›</span>
          </div>
        ))}

        {/* Continue button */}
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={selectedSymptoms.length === 0}
        >
          Continue →
        </button>
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <div className="recent-checks">
          <h3>Recent Checks</h3>
          <ul>
            <li className="check success">✔ March 20 Headache</li>
            <li className="check success">✔ March 11 Cough</li>
            <li className="check warning">⚠ February 28 Fever</li>
          </ul>
        </div>

        <div className="health-tip">
          <h3>Health Tip</h3>
          <p>Manage stress with regular exercise, meditation, or yoga.</p>
          <a href="/">Learn More</a>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STEP 2: Symptom Details
========================================================= */
export function Step2() {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomDetails, setSymptomDetails] = useState({});

  useEffect(() => {
    const storedSymptoms = JSON.parse(localStorage.getItem("symptoms")) || [];
    setSelectedSymptoms(storedSymptoms);

    const details = {};
    storedSymptoms.forEach((symptom) => {
      details[symptom] = { severity: "", duration: "" };
    });
    setSymptomDetails(details);
  }, []);

  const handleChange = (symptom, field, value) => {
    setSymptomDetails((prev) => ({
      ...prev,
      [symptom]: { ...prev[symptom], [field]: value },
    }));
  };

  const handleNext = () => {
    localStorage.setItem("symptomDetails", JSON.stringify(symptomDetails));
    navigate("/step3"); // ✅ go to Step 3
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="sidebar-title">HEALTH SYMPTOM CHECKER</h2>
      </div>

      <div className="main-content">
        <h1 className="page-title">Step 2: Symptom Details</h1>
        <p className="page-subtitle">
          Provide additional details about your selected symptoms.
        </p>

        <div className="step2-container">
          {selectedSymptoms.length === 0 ? (
            <div>
              <p>No symptoms selected. Please go back to Step 1.</p>
              <button onClick={() => navigate("/step1")}>Go Back</button>
            </div>
          ) : (
            selectedSymptoms.map((symptom) => (
              <div key={symptom} className="symptom-card">
                <h3>{symptom}</h3>

                <div className="form-group">
                  <label>Severity:</label>
                  <select
                    value={symptomDetails[symptom]?.severity || ""}
                    onChange={(e) =>
                      handleChange(symptom, "severity", e.target.value)
                    }
                  >
                    <option value="">Select severity</option>
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Duration (days):</label>
                  <input
                    type="number"
                    min="0"
                    value={symptomDetails[symptom]?.duration || ""}
                    onChange={(e) =>
                      handleChange(symptom, "duration", e.target.value)
                    }
                    placeholder="e.g. 3"
                  />
                </div>
              </div>
            ))
          )}

          <button
            className="next-btn"
            onClick={handleNext}
            disabled={selectedSymptoms.length === 0}
          >
            Continue →
          </button>
        </div>
      </div>

      <div className="right-sidebar">
        <h3>Tip</h3>
        <p>
          Providing detailed symptom info helps our system give more accurate
          insights.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   STEP 3: Review & Predict
========================================================= */

export function Step3() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const storedSymptoms = localStorage.getItem("symptoms");

    if (storedUser) setUserData(JSON.parse(storedUser));
    if (storedSymptoms) setSymptoms(JSON.parse(storedSymptoms));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });
      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      setPrediction(data.predicted_disease);

      // Save to reports
      const existingReports = JSON.parse(localStorage.getItem("reports")) || [];
      const newReport = {
        date: new Date().toLocaleString(),
        symptoms,
        prediction: data.predicted_disease,
      };
      localStorage.setItem("reports", JSON.stringify([newReport, ...existingReports]));
      
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step3-container">
      <h2>Review Your Information</h2>

      {userData ? (
        <div>
          <p>
            <b>Age:</b> {userData.age}
          </p>
          <p>
            <b>Gender:</b> {userData.gender}
          </p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}

      <h3>Selected Symptoms:</h3>
      {symptoms.length > 0 ? (
        <ul>
          {symptoms.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      ) : (
        <p>No symptoms selected.</p>
      )}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Finish ✅"}
      </button>

      {prediction && (
        <div className="result">
          <h3>Predicted Disease:</h3>
          <p>{prediction}</p>

          <button
            className="view-reports-btn"
            onClick={() => navigate("/reports")}
          >
            View Past Reports 📄
          </button>
        </div>
      )}
    </div>
  );
}
