import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SymptomSelector({ title, symptoms, subtitles }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const navigate = useNavigate();

  // ✅ Load previous selections (optional)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("symptoms")) || [];
    setSelectedSymptoms(saved);
  }, []);

  // ✅ Toggle selection
  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  // ✅ Save and move to next
  const handleNext = () => {
    localStorage.setItem("symptoms", JSON.stringify(selectedSymptoms));
    navigate("/step3");
  };

  return (
    <div className="browse">
      <div className="browse-header">
        <h2>{title}</h2>
        <button className="close-btn" onClick={() => navigate(-1)}>✕</button>
      </div>

      <div className="symptom-list">
        {/* Flat symptom list */}
        {symptoms &&
          symptoms.map((sym) => (
            <label
              key={sym}
              className={`list-item ${selectedSymptoms.includes(sym) ? "selected" : ""}`}
            >
              <input
                type="checkbox"
                checked={selectedSymptoms.includes(sym)}
                onChange={() => toggleSymptom(sym)}
              />
              {sym}
            </label>
          ))}

        {/* Nested subtitles */}
        {subtitles &&
          subtitles.map((group) => (
            <div key={group.title} className="subtitle-group">
              <h3>{group.title}</h3>
              {group.symptoms.map((sym) => (
                <label
                  key={sym}
                  className={`list-item ${selectedSymptoms.includes(sym) ? "selected" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(sym)}
                    onChange={() => toggleSymptom(sym)}
                  />
                  {sym}
                </label>
              ))}
            </div>
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

export default SymptomSelector;
