import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Research from './components/Research';

// Heavy map/country libs, only loaded when the analytics route is visited.
const AnalyticsMap = lazy(() => import('./components/AnalyticsMap'));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/research" element={<Research />} />
        <Route
          path="/analytics-map"
          element={
            <Suspense fallback={<div className="min-h-screen bg-site-bg" />}>
              <AnalyticsMap />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
