import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Step2() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const navigate = useNavigate();

  const generalSymptoms = [
    "anxiety",
    "depression",
    "mood swings",
    "irritability",
    "restlessness",
    "fatigue",
    "malaise",
    "weakness",
    "weight gain",
    "weight loss",
    "fever",
    "chills",
    "sweating",
    "shivering",
    "coma",
    "altered sensorium",
    "toxic look (typhos)"
  ];

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleNext = () => {
    // Save symptoms in localStorage
    localStorage.setItem("symptoms", JSON.stringify(selectedSymptoms));
    // Navigate to Step3
    navigate("/step3");
  };
    return (
    <div className="browse">
      <div className="browse-header">
        <h2>Browse Symptoms</h2>
        <button className="close-btn">✕</button>
      </div>

      <div className="symptom-list">
        
        <div className="list-item">General Symptoms</div>
        {generalSymptoms.map((sym) => (
          <label key={sym} className="list-item">
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(sym)}
              onChange={() => toggleSymptom(sym)}
            />
            {sym}
          </label>
        ))}
      </div>

      <button
        className="continue-btn"
        onClick={handleNext}
        disabled={selectedSymptoms.length === 0}
      >
        Continue →
      </button>
    </div>
  );
}  