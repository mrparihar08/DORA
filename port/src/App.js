// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import SplashScreen from "./Router/SplashScreen";
import Dashboard from "./Router/Dashboard";
import Reports from "./Router/Reports";
import SymptomSelector from "./symptom/SymptomSelector";
import { symptomGroups } from "./symptom/symptomsData";
import { bodyRoutes } from "./symptom/body_list"; // use bodyRoutes array
import HealthTips from "./Router/HealthTips";
import { SymptomChecker, Step2, Step3 } from "./Router/SymptomChecker";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

/**
 * Safe generator for subtitle/detail routes from symptomGroups.
 * Handles mixed shapes:
 *  - subtitles may contain plain arrays (["a","b"...]) or objects {title, symptoms}
 *  - if title missing, fallback to `sub-N`
 */
function generateDetailRoutes() {
  const routes = [];

  Object.entries(symptomGroups || {}).forEach(([key, group]) => {
    const basePath = `/${key}`;

    // Route for "all" page (passes whole group to SymptomSelector)
    routes.push(
      <Route
        key={`all-${key}`}
        path={`${basePath}/all`}
        element={<SymptomSelector {...group} />}
      />
    );

    const subs = Array.isArray(group?.subtitles) ? group.subtitles : [];

    // normalize subtitles to objects: { title, symptoms }
    const normalized = subs.map((s, idx) => {
      if (Array.isArray(s)) return { title: "General", symptoms: s };
      if (s && typeof s === "object") return s;
      // fallback
      return { title: `sub-${idx + 1}`, symptoms: [] };
    });

    normalized.forEach((sub, i) => {
      const title = sub.title || `sub-${i + 1}`;
      const slugCandidate =
        (sub.slug && String(sub.slug)) ||
        (title && String(title)) ||
        `sub-${i + 1}`;
      // sanitize slug and lower-case safely
      const slug = slugCandidate
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[()]/g, "")
        .replace(/[^a-z0-9-]/g, ""); // keep it URL-safe

      routes.push(
        <Route
          key={`${key}-${i}`}
          path={`${basePath}/${slug}`}
          element={<SymptomSelector title={title} symptoms={sub.symptoms || []} />}
        />
      );
    });
  });

  return routes;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Core app routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/health-tips" element={<HealthTips />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />

        {/* Map the bodyRoutes (top-level category pages created in body_list.js) */}
        {bodyRoutes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}

        {/* Generate /group/all and /group/<subtitle-slug> routes safely from symptomGroups */}
        {generateDetailRoutes()}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
