import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Research from './components/Research';
import SplashCursor from './components/animations/SplashCursor';

const App = () => {
  return (
    <Router>
      <SplashCursor
        SPLAT_RADIUS={0.14}
        SPLAT_FORCE={4000}
        CURL={2}
        DENSITY_DISSIPATION={4.5}
        VELOCITY_DISSIPATION={3}
        SHADING={false}
        COLOR_UPDATE_SPEED={0}
        CUSTOM_COLOR={{ r: 0.24, g: 0.11, b: 0 }}
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={1024}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/research" element={<Research />} />
      </Routes>
    </Router>
  );
};

export default App;
