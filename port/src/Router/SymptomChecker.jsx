import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* -------------------------
   helper: slugify (safe id)
--------------------------*/
function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9-]/g, "");
}

/* =========================================================
   STEP 1: Symptom Checker
   (exported as named: SymptomChecker)
========================================================= */
export function SymptomChecker() {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const symptoms = {
    general: { title: "General Symptoms", path: "/general" },
    skin: { title: "Skin Symptoms", path: "/skin" },
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

  useEffect(() => {
    // restore previously selected on mount (optional)
    try {
      const saved = JSON.parse(localStorage.getItem("symptoms")) || [];
      setSelectedSymptoms(saved);
    } catch {
      setSelectedSymptoms([]);
    }
  }, []);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) => {
      const next = prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom];
      // persist selection early so Step2 can pick it up
      localStorage.setItem("symptoms", JSON.stringify(next));
      return next;
    });
  };

  const handleNext = () => {
    // final persist (redundant but safe)
    localStorage.setItem("symptoms", JSON.stringify(selectedSymptoms));
    navigate("/step2");
  };

  const navItems = [
    { title: "Home 🏠", path: "/dashboard" },
    { title: "Symptom Checker 📋", path: "/symptom-checker" },
    { title: "Health Tips 💡", path: "/health-tips" },
    { title: "Reports 📊", path: "/reports" },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="main-content">
        <h1 className="page-title">Step 1: Browse Symptoms</h1>

        {/* Category selection */}
        <div style={{ marginBottom: 12 }}>
          {Object.values(symptoms).map((s) => (
            <div
              key={s.title}
              role="button"
              tabIndex={0}
              className={`list-item clickable ${selectedSymptoms.includes(s.title) ? "selected" : ""}`}
              onClick={() => {
                toggleSymptom(s.title);
                navigate(s.path);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  toggleSymptom(s.title);
                  navigate(s.path);
                }
              }}
              style={{ display: "inline-block", marginRight: 8 }}
            >
              {s.title}
            </div>
          ))}
        </div>

        {/* Show quick selected summary */}
        {selectedSymptoms.length > 0 && (
          <div className="text-muted mb-2">Selected: {selectedSymptoms.join(", ")}</div>
        )}

        {/* Body-part list */}
        <div className="list-item blue-text" style={{ marginTop: 16 }}>
          BODY LIST
        </div>
        {bodyParts.map((part) => (
          <div
            key={part.title}
            className="list-item clickable"
            onClick={() => navigate(part.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate(part.path);
            }}
          >
            {part.title}
            <span className="arrow" style={{ marginLeft: "auto" }}>
              ›
            </span>
          </div>
        ))}

        {/* Continue button */}
        <button className="next-btn" onClick={handleNext} disabled={selectedSymptoms.length === 0}>
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
   (exported as named: Step2)
========================================================= */
export function Step2() {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomDetails, setSymptomDetails] = useState({});

  useEffect(() => {
    // load selected symptoms and existing details
    let storedSymptoms = [];
    try {
      storedSymptoms = JSON.parse(localStorage.getItem("symptoms")) || [];
    } catch {
      storedSymptoms = [];
    }
    setSelectedSymptoms(storedSymptoms);

    let storedDetails = {};
    try {
      storedDetails = JSON.parse(localStorage.getItem("symptomDetails")) || {};
    } catch {
      storedDetails = {};
    }

    const details = storedSymptoms.reduce((acc, s) => {
      acc[s] = storedDetails[s] || { severity: "", duration: "" };
      return acc;
    }, {});
    setSymptomDetails(details);
  }, []);

  const handleChange = (symptom, field, value) => {
    setSymptomDetails((prev) => {
      const updated = {
        ...prev,
        [symptom]: { ...(prev[symptom] || { severity: "", duration: "" }), [field]: value },
      };
      // persist immediately
      try {
        localStorage.setItem("symptomDetails", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleNext = () => {
    try {
      localStorage.setItem("symptomDetails", JSON.stringify(symptomDetails));
    } catch {}
    navigate("/step3");
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="sidebar-title">HEALTH SYMPTOM CHECKER</h2>
        <button className="back-btn" onClick={() => navigate("/symptom-checker")}>Go Back</button>
      </div>

      <div className="main-content">
        <h1 className="page-title">Step 2: Symptom Details</h1>
        <p className="page-subtitle">Provide additional details about your selected symptoms.</p>

        <div className="step2-container">
          {selectedSymptoms.length === 0 ? (
            <div>
              <p>No symptoms selected. Please go back to Step 1.</p>
              <button className="back-btn" onClick={() => navigate("/symptom-checker")}>Go Back</button>
            </div>
          ) : (
            selectedSymptoms.map((symptom) => {
              const details = symptomDetails[symptom] || { severity: "", duration: "" };
              const idBase = slugify(symptom);

              return (
                <div key={symptom} className="symptom-card">
                  <h3>{symptom}</h3>

                  <div className="form-group">
                    <label htmlFor={`severity-${idBase}`}>Severity:</label>
                    <select
                      id={`severity-${idBase}`}
                      value={details.severity}
                      onChange={(e) => handleChange(symptom, "severity", e.target.value)}
                    >
                      <option value="">Select severity</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`duration-${idBase}`}>Duration (days):</label>
                    <input
                      id={`duration-${idBase}`}
                      type="number"
                      min="0"
                      value={details.duration}
                      onChange={(e) => handleChange(symptom, "duration", e.target.value)}
                      placeholder="e.g. 3"
                    />
                  </div>
                </div>
              );
            })
          )}

          <button className="next-btn" onClick={handleNext} disabled={selectedSymptoms.length === 0}>
            Continue →
          </button>
        </div>
      </div>

      <div className="right-sidebar">
        <h3>Tip</h3>
        <p>Providing detailed symptom info helps our system give more accurate insights.</p>
      </div>
    </div>
  );
}

/* =========================================================
   STEP 3: Review & Predict
   (exported as named: Step3)
========================================================= */
export function Step3() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [symptomDetails, setSymptomDetails] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("userData")) || null;
      const storedDetails = JSON.parse(localStorage.getItem("symptomDetails")) || {};
      if (storedUser) setUserData(storedUser);
      setSymptomDetails(storedDetails);
    } catch {
      setUserData(null);
      setSymptomDetails({});
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const symptomsArray = Object.keys(symptomDetails);
      const payload = { symptoms: symptomsArray, details: symptomDetails };

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();
      setPrediction(data.predicted_disease);

      // Save to reports: summary + details
      const existingReports = JSON.parse(localStorage.getItem("reports")) || [];
      const newReport = {
        date: new Date().toLocaleString(),
        symptoms: symptomsArray,
        symptomDetails: symptomDetails,
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
          <p><b>Age:</b> {userData.age}</p>
          <p><b>Gender:</b> {userData.gender}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}

      <h3>Selected Symptoms:</h3>
      {Object.keys(symptomDetails).length > 0 ? (
        <ul>
          {Object.entries(symptomDetails).map(([symptom, detail]) => (
            <li key={symptom}>
              {symptom} — {detail.severity || "N/A"}, {detail.duration || "N/A"} days
            </li>
          ))}
        </ul>
      ) : (
        <p>No symptoms selected.</p>
      )}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Finish ✅"}
      </button>

      {prediction && (
        <div className="result" style={{ marginTop: 18 }}>
          <h3>Predicted Disease:</h3>
          <p>{prediction}</p>
          <button className="view-reports-btn" onClick={() => navigate("/reports")}>
            View Past Reports 📄
          </button>
        </div>
      )}
    </div>
  );
}
