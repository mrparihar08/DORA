import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Head() {
  const [selectedSymptoms] = useState([]);
  const navigate = useNavigate();

  const headSymptoms = [
  { title: "All Head Symptoms", path: "/all-head-symptoms" },
  { title: "Scalp", path: "/scalp" },
  { title: "Forehead", path: "/forehead" },
  { title: "Eyes", path: "/eyes" },
  { title: "Nose", path: "/nose" },
  { title: "Ears", path: "/ears" },
  { title: "Face", path: "/face" },
  { title: "Mouth", path: "/mouth" },
  { title: "Jaw", path: "/jaw" }
];

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
        
        <div className="list-item">Head Symptoms</div>
        {headSymptoms.map((part) => (
          <div
            key={part.title}
            className="list-item clickable"
            onClick={() => navigate(part.path)}
          >
            {part.title}
            <span className="arrow">›</span>
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

/*===============Neck========================= */
function Neck() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const navigate = useNavigate();

  const neckSymptoms = [
    "stiff neck",
    "neck pain",
    "enlarged thyroid",
    "swelled lymph nodes"
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
        
        <div className="list-item">Neck Symptoms</div>
        {neckSymptoms.map((sym) => (
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
        Add Symptom
      </button>
    </div>
  );
}  

/*==================Chest============================== */
function Chest() {
  const [selectedSymptoms] = useState([]);
  const navigate = useNavigate();

const chestSymptoms = [
  { title: "All Chest Symptoms", path: "/all-chest-symptoms" },
  { title: "Upper Chest", path: "/upper-chest" },
  { title: "Sternum", path: "/sternum" },
  { title: "Breast", path: "/breast" }
];


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
        
        <div className="list-item">Chest Symptoms</div>
        {chestSymptoms.map((part) => (
          <div
            key={part.title}
            className="list-item clickable"
            onClick={() => navigate(part.path)}
          >
            {part.title}
            <span className="arrow">›</span>
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
/*============================Arms======================== */
function Arms() {
  const [selectedSymptoms] = useState([]);
  const navigate = useNavigate();

  const armsSymptoms = [
  { title: "All Arm Symptoms", path: "/all-arm-symptoms" },
  { title: "Shoulder", path: "/shoulder" },
  { title: "Armpit", path: "/armpit" },
  { title: "Upper Arm", path: "/upper-arm" },
  { title: "Elbow", path: "/elbow" },
  { title: "Forearm", path: "/forearm" },
  { title: "Wrist", path: "/wrist" },
  { title: "Hand", path: "/hand" },
  { title: "Fingers", path: "/fingers" }
];

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
        
        <div className="list-item">Arms Symptoms</div>
        {armsSymptoms.map((part) => (
          <div
            key={part.title}
            className="list-item clickable"
            onClick={() => navigate(part.path)}
          >
            {part.title}
            <span className="arrow">›</span>
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
/*============================Abdomen======================== */
function Abdomen() {
  const [selectedSymptoms] = useState([]);
  const navigate = useNavigate();

  const abdomenSymptoms = [
  { title: "All Abdomen Symptoms", path: "/all-abdomen-symptoms" },
  { title: "Upper Abdomen", path: "/upper-abdomen" },
  { title: "Epigastric (upper central abdomen)", path: "/epigastric-upper-central-abdomen" },
  { title: "Lower Abdomen", path: "/lower-abdomen" }
];

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
        
        <div className="list-item">Abdomen Symptoms</div>
        {abdomenSymptoms.map((part) => (
          <div
            key={part.title}
            className="list-item clickable"
            onClick={() => navigate(part.path)}
          >
            {part.title}
            <span className="arrow">›</span>
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
/*============================Pelvis======================== */
 function Pelvis() {
  const [selectedSymptoms] = useState([]);
  const navigate = useNavigate();

const pelvisSymptoms = [
  { title: "All Pelvic Symptoms", path: "/all-pelvic-symptoms" },
  { title: "Hip", path: "/hip" },
  { title: "Groin", path: "/groin" },
  { title: "Suprapubic (above pubic bone)", path: "/suprapubic-above-pubic-bone" },
  { title: "Genitals", path: "/genitals" }
];


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
        
        <div className="list-item">Pelvis Symptoms</div>
        {pelvisSymptoms.map((part) => (
          <div
            key={part.title}
            className="list-item clickable"
            onClick={() => navigate(part.path)}
          >
            {part.title}
            <span className="arrow">›</span>
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
/*============================Back======================== */
function Back() {
  const [selectedSymptoms] = useState([]);
  const navigate = useNavigate();

const backSymptoms = [
  { title: "All Back Symptoms", path: "/all-back-symptoms" },
  { title: "Upper Back", path: "/upper-back" },
  { title: "Flank", path: "/flank" },
  { title: "Lower Back", path: "/lower-back" },
  { title: "Tailbone", path: "/tailbone" }
];



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
        
        <div className="list-item">Back Symptoms</div>
        {backSymptoms.map((part) => (
          <div
            key={part.title}
            className="list-item clickable"
            onClick={() => navigate(part.path)}
          >
            {part.title}
            <span className="arrow">›</span>
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
/*============================Buttocks======================== */
function Buttocks() {
  const [selectedSymptoms] = useState([]);
  const navigate = useNavigate();

const buttocksSymptoms = [
  { title: "All Buttock Symptoms", path: "/all-buttock-symptoms" },
  { title: "Hip", path: "/hip" },
  { title: "Rectum", path: "/rectum" }
];


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
        
        <div className="list-item">Buttocks Symptoms</div>
        {buttocksSymptoms.map((part) => (
          <div
            key={part.title}
            className="list-item clickable"
            onClick={() => navigate(part.path)}
          >
            {part.title}
            <span className="arrow">›</span>
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
/*============================Legs======================== */
function Legs() {
  const [selectedSymptoms] = useState([]);
  const navigate = useNavigate();

const legsSymptoms = [
  { title: "All Leg Symptoms", path: "/all-leg-symptoms" },
  { title: "Thigh", path: "/thigh" },
  { title: "Hamstring", path: "/hamstring" },
  { title: "Knee", path: "/knee" },
  { title: "Popliteal (back of knee)", path: "/popliteal-back-of-knee" },
  { title: "Shin", path: "/shin" },
  { title: "Calf", path: "/calf" },
  { title: "Ankle", path: "/ankle" },
  { title: "Foot", path: "/foot" },
  { title: "Toes", path: "/toes" }
];


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
        
        <div className="list-item">Legs Symptoms</div>
        {legsSymptoms.map((part) => (
          <div
            key={part.title}
            className="list-item clickable"
            onClick={() => navigate(part.path)}
          >
            {part.title}
            <span className="arrow">›</span>
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
export{Head, Neck, Chest, Arms, Abdomen, Pelvis, Back, Buttocks, Legs}