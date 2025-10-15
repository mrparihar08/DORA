import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    try {
      const storedReports = JSON.parse(localStorage.getItem("reports")) || [];
      setReports(storedReports);
    } catch (e) {
      console.error("Invalid reports in localStorage:", e);
      setReports([]);
    }
  }, []);

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h2>Past Symptom Checks 📊</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
      </div>

      {reports.length === 0 ? (
        <p className="no-reports">No past reports found.</p>
      ) : (
        <div className="reports-list">
          {reports.map((report, index) => (
            <div key={report.date || index} className="report-card">
              <p><b>Date:</b> {report.date || "N/A"}</p>

              <p>
                <b>Symptoms:</b>{" "}
                {Array.isArray(report.symptoms)
                  ? report.symptoms.join(", ")
                  : report.symptomDetails
                  ? Object.keys(report.symptomDetails).join(", ")
                  : "N/A"}
              </p>

              {report.prediction && <p><b>Prediction:</b> {report.prediction}</p>}

              {report.symptomDetails && (
                <details style={{ marginTop: 8 }}>
                  <summary style={{ cursor: "pointer" }}>View symptom details</summary>
                  <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>
                    {JSON.stringify(report.symptomDetails, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
