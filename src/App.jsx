import React, { useState, useEffect } from "react";
import Home from "./components/pages/home";
import Projects from "./components/pages/projects";
import Resume from "./components/pages/resume";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const starContainer = document.querySelector('.starry-background');
    if (!starContainer) return;

    // Clean up existing stars
    starContainer.innerHTML = '';
    
    const numberOfStars = 200; // Increased number of stars
    const stars = [];

    // Create stars with RequestAnimationFrame for better performance
    requestAnimationFrame(() => {
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Randomize star sizes - more variety
        const size = Math.random() * 2.5 + 0.5; // Between 0.5px and 3px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Position stars
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.transform = 'translate(0, 0)';
        star.style.transition = 'transform 0.3s ease-out';

        // Randomize twinkling
        const shouldTwinkle = Math.random() > 0.3; // 70% of stars will twinkle
        if (shouldTwinkle) {
          star.classList.add('twinkle');
          // Randomize twinkle animation parameters
          star.style.setProperty('--twinkle-duration', `${1 + Math.random() * 2}s`);
          star.style.setProperty('--twinkle-delay', `-${Math.random() * 3}s`);
          star.style.setProperty('--min-opacity', `${0.1 + Math.random() * 0.3}`);
          star.style.setProperty('--max-opacity', `${0.7 + Math.random() * 0.3}`);
        } else {
          // Non-twinkling stars have a static opacity
          star.style.opacity = 0.8 + Math.random() * 0.2;
        }

        fragment.appendChild(star);
        stars.push({ element: star });
      }

      starContainer.appendChild(fragment);
    });

    // Star movement logic remains the same
    let rafId;
    const moveStars = (e) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        stars.forEach(({ element }) => {
          const rect = element.getBoundingClientRect();
          const starX = rect.left + rect.width / 2;
          const starY = rect.top + rect.height / 2;

          const distX = mouseX - starX;
          const distY = mouseY - starY;
          const dist = Math.sqrt(distX * distX + distY * distY);

          const maxMove = 50;
          const moveAmount = Math.min(maxMove, (maxMove * 200) / (dist + 1));
          const angle = Math.atan2(distY, distX);
          
          const moveX = Math.cos(angle) * moveAmount;
          const moveY = Math.sin(angle) * moveAmount;

          element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      });
    };

    let resetTimeout;
    const handleMouseMove = (e) => {
      moveStars(e);
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        stars.forEach(({ element }) => {
          element.style.transform = 'translate(0, 0)';
        });
      }, 150);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      clearTimeout(resetTimeout);
    };
  }, []);

  return (
    <div className="app-container">
      {/* Background layer */}
      <div className="starry-background"></div>
      
      {/* New translucent overlay */}
      <div className="translucent-overlay"></div>
      
      {/* Content layer */}
      <div className="content-wrapper">
        <nav className="tab-navigation">
          <span
            className={activeTab === "home" ? "active-tab" : ""}
            onClick={() => setActiveTab("home")}
          >
            Home
          </span>
          <span
            className={activeTab === "projects" ? "active-tab" : ""}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </span>
          <span
            className={activeTab === "resume" ? "active-tab" : ""}
            onClick={() => setActiveTab("resume")}
          >
            Resume
          </span>
        </nav>

        <div className="tab-content">
          {activeTab === "home" && <Home />}
          {activeTab === "projects" && <Projects />}
          {activeTab === "resume" && <Resume />}
        </div>
      </div>
    </div>
  );
};

export default App;