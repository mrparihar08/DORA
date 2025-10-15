// symptom/body_list.js
import SymptomCategory from "./SymptomCategory";

export const bodyRoutes = [
  // 🧠 General
  {
    path: "/general",
    element: (
      <SymptomCategory
        title="General Symptoms"
        symptoms={[
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
          "toxic look (typhos)",
        ]}
      />
    ),
  },

  // 🧴 Skin
  {
    path: "/skin",
    element: (
      <SymptomCategory
        title="Skin Symptoms"
        symptoms={[
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
          "red spots over body",
        ]}
      />
    ),
  },

  // 🧍 Head
  {
    path: "/head",
    element: (
      <SymptomCategory
        title="Head Symptoms"
        type="navigable"
        symptoms={[
          { title: "All Head Symptoms", path: "/head/all" },
          { title: "Scalp", path: "/head/scalp" },
          { title: "Forehead", path: "/head/forehead" },
          { title: "Eyes", path: "/head/eyes" },
          { title: "Nose", path: "/head/nose" },
          { title: "Ears", path: "/head/ears" },
          { title: "Face", path: "/head/face" },
          { title: "Mouth", path: "/head/mouth" },
          { title: "Jaw", path: "/head/jaw" },
        ]}
      />
    ),
  },

  // 🦴 Neck
  {
    path: "/neck",
    element: (
      <SymptomCategory
        title="Neck Symptoms"
        symptoms={[
          "stiff neck",
          "neck pain",
          "enlarged thyroid",
          "swelled lymph nodes",
        ]}
      />
    ),
  },

  // 💓 Chest
  {
    path: "/chest",
    element: (
      <SymptomCategory
        title="Chest Symptoms"
        type="navigable"
        symptoms={[
          { title: "All Chest Symptoms", path: "/chest/all" },
          { title: "Upper Chest", path: "/chest/upper" },
          { title: "Sternum", path: "/chest/sternum" },
          { title: "Breast", path: "/chest/breast" },
        ]}
      />
    ),
  },

  // 💪 Arms
  {
    path: "/arms",
    element: (
      <SymptomCategory
        title="Arm Symptoms"
        type="navigable"
        symptoms={[
          { title: "All Arm Symptoms", path: "/arms/all" },
          { title: "Shoulder", path: "/arms/shoulder" },
          { title: "Armpit", path: "/arms/armpit" },
          { title: "Upper Arm", path: "/arms/upper" },
          { title: "Elbow", path: "/arms/elbow" },
          { title: "Forearm", path: "/arms/forearm" },
          { title: "Wrist", path: "/arms/wrist" },
          { title: "Hand", path: "/arms/hand" },
          { title: "Fingers", path: "/arms/fingers" },
        ]}
      />
    ),
  },

  // 🩺 Abdomen
  {
    path: "/abdomen",
    element: (
      <SymptomCategory
        title="Abdomen Symptoms"
        type="navigable"
        symptoms={[
          { title: "All Abdomen Symptoms", path: "/abdomen/all" },
          { title: "Upper Abdomen", path: "/abdomen/upper" },
          {
            title: "Epigastric (upper central abdomen)",
            path: "/abdomen/epigastric",
          },
          { title: "Lower Abdomen", path: "/abdomen/lower" },
        ]}
      />
    ),
  },

  // 🦵 Pelvis
  {
    path: "/pelvis",
    element: (
      <SymptomCategory
        title="Pelvis Symptoms"
        type="navigable"
        symptoms={[
          { title: "All Pelvic Symptoms", path: "/pelvis/all" },
          { title: "Hip", path: "/pelvis/hip" },
          { title: "Groin", path: "/pelvis/groin" },
          {
            title: "Suprapubic (above pubic bone)",
            path: "/pelvis/suprapubic",
          },
          { title: "Genitals", path: "/pelvis/genitals" },
        ]}
      />
    ),
  },

  // 🩻 Back
  {
    path: "/back",
    element: (
      <SymptomCategory
        title="Back Symptoms"
        type="navigable"
        symptoms={[
          { title: "All Back Symptoms", path: "/back/all" },
          { title: "Upper Back", path: "/back/upper" },
          { title: "Flank", path: "/back/flank" },
          { title: "Lower Back", path: "/back/lower" },
          { title: "Tailbone", path: "/back/tailbone" },
        ]}
      />
    ),
  },

  // 🍑 Buttocks
  {
    path: "/buttocks",
    element: (
      <SymptomCategory
        title="Buttocks Symptoms"
        type="navigable"
        symptoms={[
          { title: "All Buttock Symptoms", path: "/buttocks/all" },
          { title: "Hip", path: "/buttocks/hip" },
          { title: "Rectum", path: "/buttocks/rectum" },
        ]}
      />
    ),
  },

  // 🦿 Legs
  {
    path: "/legs",
    element: (
      <SymptomCategory
        title="Leg Symptoms"
        type="navigable"
        symptoms={[
          { title: "All Leg Symptoms", path: "/legs/all" },
          { title: "Thigh", path: "/legs/thigh" },
          { title: "Hamstring", path: "/legs/hamstring" },
          { title: "Knee", path: "/legs/knee" },
          { title: "Popliteal (back of knee)", path: "/legs/popliteal" },
          { title: "Shin", path: "/legs/shin" },
          { title: "Calf", path: "/legs/calf" },
          { title: "Ankle", path: "/legs/ankle" },
          { title: "Foot", path: "/legs/foot" },
          { title: "Toes", path: "/legs/toes" },
        ]}
      />
    ),
  },
];
