import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import SplashScreen from './Router/SplashScreen';
import Dashboard from './Router/Dashboard';
import Reports from './Router/Reports';

import GeneralSymptoms from './symptom/general_symptoms';
import SkinSymptoms from './symptom/skin_symptoms';

import SymptomSelector from "./symptom/SymptomSelector";
import { symptomGroups } from "./symptom/symptomsData";
import {Head, Neck, Chest, Arms, Abdomen, Pelvis, Back, Buttocks, Legs} from './symptom/body_list';
import HealthTips from './Router/HealthTips';
import {SymptomChecker,Step2, Step3} from './Router/SymptomChecker';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path="/reports" element={<Reports/>} />
        <Route path="/step2" element={<Step2/>} />
        <Route path="/step3" element={<Step3/>} />
        <Route path="/general_symptoms" element={<GeneralSymptoms />} />
        <Route path="/skin_symptoms" element={<SkinSymptoms />} />
        <Route path="/abdomen" element={<Abdomen />} />
        <Route path="/arms" element={<Arms />} />
        <Route path="/back" element={<Back />} />
        <Route path="/buttocks" element={<Buttocks />} />
        <Route path="/chest" element={<Chest />} />
        <Route path="/head" element={<Head />} />
        <Route path="/legs" element={<Legs />} />
        <Route path="/neck" element={<Neck />} />
        <Route path="/pelvis" element={<Pelvis />} />
        <Route path="/Health_Tips" element={ <HealthTips /> } />
        <Route path="/SymptomChecker" element={ <SymptomChecker />} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* Head Routes */}
<Route
  path="/all-head-symptoms"
  element={<SymptomSelector {...symptomGroups.head} />}
/>
<Route
  path="/scalp"
  element={
    <SymptomSelector
      title="Scalp"
      symptoms={symptomGroups.head.subtitles[0].symptoms}
    />
  }
/>
<Route
  path="/forehead"
  element={
    <SymptomSelector
      title="Forehead"
      symptoms={symptomGroups.head.subtitles[1].symptoms}
    />
  }
/>
<Route
  path="/eyes"
  element={
    <SymptomSelector
      title="Eyes"
      symptoms={symptomGroups.head.subtitles[2].symptoms}
    />
  }
/>
<Route
  path="/nose"
  element={
    <SymptomSelector
      title="Nose"
      symptoms={symptomGroups.head.subtitles[3].symptoms}
    />
  }
/>
<Route
  path="/ears"
  element={
    <SymptomSelector
      title="Ears"
      symptoms={symptomGroups.head.subtitles[4].symptoms}
    />
  }
/>
<Route
  path="/face"
  element={
    <SymptomSelector
      title="Face"
      symptoms={symptomGroups.head.subtitles[5].symptoms}
    />
  }
/>
<Route
  path="/mouth"
  element={
    <SymptomSelector
      title="Mouth"
      symptoms={symptomGroups.head.subtitles[6].symptoms}
    />
  }
/>
<Route
  path="/jaw"
  element={
    <SymptomSelector
      title="Jaw"
      symptoms={symptomGroups.head.subtitles[7].symptoms}
    />
  }
/>
{/* Chest Routes */}
<Route
  path="/all-chest-symptoms"
  element={<SymptomSelector {...symptomGroups.chest} />}
/>
<Route
  path="/upper-chest"
  element={
    <SymptomSelector
      title="Upper Chest Symptoms"
      symptoms={symptomGroups.chest.subtitles[0].symptoms}
    />
  }
/>
<Route
  path="/sternum"
  element={
    <SymptomSelector
      title="Sternum Symptoms"
      symptoms={symptomGroups.chest.subtitles[1].symptoms}
    />
  }
/>
<Route
  path="/breast"
  element={
    <SymptomSelector
      title="Breast Symptoms"
      symptoms={symptomGroups.chest.subtitles[2].symptoms}
    />
  }
/>

{/* Arm Routes */}
<Route
  path="/all-arm-symptoms"
  element={<SymptomSelector {...symptomGroups.arms} />}
/>
<Route
  path="/shoulder"
  element={
    <SymptomSelector
      title="Shoulder"
      symptoms={symptomGroups.arms.subtitles[0].symptoms}
    />
  }
/>
<Route
  path="/armpit"
  element={
    <SymptomSelector
      title="Armpit"
      symptoms={symptomGroups.arms.subtitles[1].symptoms}
    />
  }
/>
<Route
  path="/upper-arm"
  element={
    <SymptomSelector
      title="Upper Arm"
      symptoms={symptomGroups.arms.subtitles[2].symptoms}
    />
  }
/>
<Route
  path="/elbow"
  element={
    <SymptomSelector
      title="Elbow"
      symptoms={symptomGroups.arms.subtitles[3].symptoms}
    />
  }
/>
<Route
  path="/forearm"
  element={
    <SymptomSelector
      title="Forearm"
      symptoms={symptomGroups.arms.subtitles[4].symptoms}
    />
  }
/>
<Route
  path="/wrist"
  element={
    <SymptomSelector
      title="Wrist"
      symptoms={symptomGroups.arms.subtitles[5].symptoms}
    />
  }
/>
<Route
  path="/hand"
  element={
    <SymptomSelector
      title="Hand"
      symptoms={symptomGroups.arms.subtitles[6].symptoms}
    />
  }
/>
<Route
  path="/fingers"
  element={
    <SymptomSelector
      title="Fingers"
      symptoms={symptomGroups.arms.subtitles[7].symptoms}
    />
  }
/>

{/* Abdomen Routes */}
<Route
  path="/all-abdomen-symptoms"
  element={<SymptomSelector {...symptomGroups.abdomen} />}
/>
<Route
  path="/upper-abdomen"
  element={
    <SymptomSelector
      title="Upper Abdomen"
      symptoms={symptomGroups.abdomen.subtitles[0].symptoms}
    />
  }
/>
<Route
  path="/epigastric-upper-central-abdomen"
  element={
    <SymptomSelector
      title="Epigastric (upper central abdomen)"
      symptoms={symptomGroups.abdomen.subtitles[1].symptoms}
    />
  }
/>
<Route
  path="/lower-abdomen"
  element={
    <SymptomSelector
      title="Lower Abdomen"
      symptoms={symptomGroups.abdomen.subtitles[2].symptoms}
    />
  }
/>

{/* Pelvic Routes */}
<Route
  path="/all-pelvic-symptoms"
  element={<SymptomSelector {...symptomGroups.pelvic} />}
/>
<Route
  path="/hip"
  element={
    <SymptomSelector
      title="Hip"
      symptoms={symptomGroups.pelvic.subtitles[0].symptoms}
    />
  }
/>
<Route
  path="/groin"
  element={
    <SymptomSelector
      title="Groin"
      symptoms={symptomGroups.pelvic.subtitles[1].symptoms}
    />
  }
/>
<Route
  path="/suprapubic-above-pubic-bone"
  element={
    <SymptomSelector
      title="Suprapubic (above pubic bone)"
      symptoms={symptomGroups.pelvic.subtitles[2].symptoms}
    />
  }
/>
<Route
  path="/genitals"
  element={
    <SymptomSelector
      title="Genitals"
      symptoms={symptomGroups.pelvic.subtitles[3].symptoms}
    />
  }
/>

{/* Back Routes */}
<Route
  path="/all-back-symptoms"
  element={<SymptomSelector {...symptomGroups.back} />}
/>
<Route
  path="/upper-back"
  element={
    <SymptomSelector
      title="Upper Back"
      symptoms={symptomGroups.back.subtitles[0].symptoms}
    />
  }
/>
<Route
  path="/flank"
  element={
    <SymptomSelector
      title="Flank"
      symptoms={symptomGroups.back.subtitles[1].symptoms}
    />
  }
/>
<Route
  path="/lower-back"
  element={
    <SymptomSelector
      title="Lower Back"
      symptoms={symptomGroups.back.subtitles[2].symptoms}
    />
  }
/>
<Route
  path="/tailbone"
  element={
    <SymptomSelector
      title="Tailbone"
      symptoms={symptomGroups.back.subtitles[3].symptoms}
    />
  }
/>

{/* Buttock Routes */}
<Route
  path="/all-buttock-symptoms"
  element={<SymptomSelector {...symptomGroups.buttock} />}
/>
<Route
  path="/hip"
  element={
    <SymptomSelector
      title="Hip"
      symptoms={symptomGroups.buttock.subtitles[0].symptoms}
    />
  }
/>
<Route
  path="/rectum"
  element={
    <SymptomSelector
      title="Rectum"
      symptoms={symptomGroups.buttock.subtitles[1].symptoms}
    />
  }
/>

{/* Leg Routes */}
<Route
  path="/all-leg-symptoms"
  element={<SymptomSelector {...symptomGroups.leg} />}
/>
<Route
  path="/thigh"
  element={
    <SymptomSelector
      title="Thigh"
      symptoms={symptomGroups.leg.subtitles[0].symptoms}
    />
  }
/>
<Route
  path="/hamstring"
  element={
    <SymptomSelector
      title="Hamstring"
      symptoms={symptomGroups.leg.subtitles[1].symptoms}
    />
  }
/>
<Route
  path="/knee"
  element={
    <SymptomSelector
      title="Knee"
      symptoms={symptomGroups.leg.subtitles[2].symptoms}
    />
  }
/>
<Route
  path="/popliteal-back-of-knee"
  element={
    <SymptomSelector
      title="Popliteal (back of knee)"
      symptoms={symptomGroups.leg.subtitles[3].symptoms}
    />
  }
/>
<Route
  path="/shin"
  element={
    <SymptomSelector
      title="Shin"
      symptoms={symptomGroups.leg.subtitles[4].symptoms}
    />
  }
/>
<Route
  path="/calf"
  element={
    <SymptomSelector
      title="Calf"
      symptoms={symptomGroups.leg.subtitles[5].symptoms}
    />
  }
/>
<Route
  path="/ankle"
  element={
    <SymptomSelector
      title="Ankle"
      symptoms={symptomGroups.leg.subtitles[6].symptoms}
    />
  }
/>
<Route
  path="/foot"
  element={
    <SymptomSelector
      title="Foot"
      symptoms={symptomGroups.leg.subtitles[7].symptoms}
    />
  }
/>
<Route
  path="/toes"
  element={
    <SymptomSelector
      title="Toes"
      symptoms={symptomGroups.leg.subtitles[8].symptoms}
    />
  }
/>

      </Routes>
    </Router>
  );
}
