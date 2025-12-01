import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import IntroSplash from "../components/shell/IntroSplash.jsx";
import AppShell from "../components/shell/AppShell.jsx";
import ProfilePicker from "../components/profile/ProfilePicker.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx"; // ⬅️ About Me page


export default function App() {
  // splash shows for 1s on every refresh (same as before)
  const [showSplash, setShowSplash] = useState(true);
  
  


  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // splash (unchanged)
  if (showSplash) return <IntroSplash />;

  // app routes shown inside your fixed header shell
  return (
    <AppShell>
      <Routes>
        {/* profile picker */}
        <Route path="/" element={<ProfilePicker />} />

        {/* about me = special view */}
        <Route path="/about" element={<About />} />

        {/* project-based profiles */}
        <Route path="/profile/:slug" element={<Home />} />

        {/* legacy /home -> picker */}
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* fallback */}
        <Route
          path="*"
          element={<div style={{ color: "#fff", padding: 24 }}>Not Found</div>}
        />
      </Routes>
    </AppShell>
  );
}
