import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveData, loadData } from "../utils/storage";

/* small slugify helper for stable ids */
function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * SymptomCategory
 * props:
 *  - title: string
 *  - symptoms: array (strings) OR array of {title, path} when type is navigable
 *  - type: "selectable" (default) or "navigable"
 */
export default function SymptomCategory({ title, symptoms = [], type = "selectable" }) {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  // load saved selection on mount
  useEffect(() => {
    const stored = loadData("symptoms") || [];
    if (Array.isArray(stored)) setSelected(stored);
  }, []);

  // helper to normalize item -> label string (for selectable type)
  const toLabel = (item) => (typeof item === "string" ? item : item.title || item.name || JSON.stringify(item));

  const toggleSymptom = (symptom) => {
    setSelected((prev) => {
      const next = prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom];
      // persist immediately so Step2 reads current selections
      saveData("symptoms", next);
      return next;
    });
  };

  const handleNext = () => {
    // final persist and navigate to step2 (use the route your App uses)
    saveData("symptoms", selected);
    navigate("/step2"); // <- ensure this matches your App's route
  };

  const isSelectable = type === "selectable";

  return (
    <div className="browse">
      <div className="browse-header">
        <h2>{title}</h2>
        <button className="close-btn" onClick={() => navigate(-1)} aria-label="Close">✕</button>
      </div>

      <div className="symptom-list" role="list">
        {isSelectable
          ? symptoms.map((sym) => {
              const label = toLabel(sym);
              const id = `sym-${slugify(label)}`;

              return (
                <label key={id} htmlFor={id} className={`list-item ${selected.includes(label) ? "selected" : ""}`} role="listitem">
                  <input
                    id={id}
                    type="checkbox"
                    checked={selected.includes(label)}
                    onChange={() => toggleSymptom(label)}
                    aria-checked={selected.includes(label)}
                  />
                  <span>{label}</span>
                </label>
              );
            })
          : symptoms.map((item) => (
              <div
                key={item.title || item.path}
                className="list-item clickable"
                role="button"
                tabIndex={0}
                onClick={() => navigate(item.path)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate(item.path);
                }}
              >
                {item.title} <span className="arrow">›</span>
              </div>
            ))}
      </div>

      <button
        className="continue-btn"
        onClick={handleNext}
        disabled={isSelectable && selected.length === 0}
      >
        {isSelectable ? "Add Symptom" : "Continue →"}
      </button>
    </div>
  );
}
