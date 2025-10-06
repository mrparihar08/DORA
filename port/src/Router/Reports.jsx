import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports from localStorage
    const storedReports = JSON.parse(localStorage.getItem("reports")) || [];
    setReports(storedReports);
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
            <div key={index} className="report-card">
              <p>
                <b>Date:</b> {report.date || "N/A"}
              </p>
              <p>
                <b>Symptoms:</b> {report.symptoms.join(", ")}
              </p>
              {report.prediction && (
                <p>
                  <b>Prediction:</b> {report.prediction}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
