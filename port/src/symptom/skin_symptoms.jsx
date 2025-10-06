import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Step2() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const navigate = useNavigate();

  const skinSymptoms = [
    "itching",
    "skin rash",
    "scurring",
    "silver like dusting",
    "skin peeling",
    "nodal skin eruptions",
    "dischromic patches",
    "small dents in nails",
    "inflammatory nails",
    "brittle nails",
    "pale skin",
    "yellowish skin",
    "yellow crust ooze",
    "pus filled pimples",
    "blackheads",
    "ulcers on tongue",
    "red sore around nose",
    "red spots over body"
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
        
        <div className="list-item">Skin Symptoms</div>
        {skinSymptoms.map((sym) => (
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