import React, { useEffect, useRef, useState } from 'react';
import * as anime from 'animejs';

const MorphingScrollytelling = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const timelineRef = useRef(null);
  const particlesRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);

  // SVG Path data for all morphing shapes
  const pathData = {
    circle: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
    brain: "M12 2C8.69 2 6 4.69 6 8c0 1.92.8 3.65 2.08 4.9C9.16 14.12 10.5 15 12 15s2.84-.88 3.92-2.1C17.2 11.65 18 9.92 18 8c0-3.31-2.69-6-6-6z",
    computer: "M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v1h12v-1l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM4 14V6h16v8H4z",
    laptop: "M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z",
    rocket: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
  };

  // Section mapping
  const sections = [
    { id: 'hero', path: pathData.circle },
    { id: 'about', path: pathData.brain },
    { id: 'skills', path: pathData.computer },
    { id: 'experience', path: pathData.laptop },
    { id: 'projects', path: pathData.rocket },
    { id: 'contact', path: pathData.circle }
  ];

  // Get scroll progress for a section
  const getScrollProgress = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return 0;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;
    
    // Calculate progress based on how much of the section is visible
    const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight)));
    return progress;
  };

  // Create particle burst effect for rocket
  const createParticleBurst = () => {
    if (!particlesRef.current) return;

    const particles = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.backgroundColor = '#a855f7';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.transform = 'translate(-50%, -50%)';
      
      particlesRef.current.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    anime({
      targets: particles,
      translateX: () => anime.random(-100, 100),
      translateY: () => anime.random(-100, 100),
      scale: [1, 0],
      opacity: [1, 0],
      duration: 1000,
      easing: 'easeOutExpo',
      complete: () => {
        particles.forEach(particle => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        });
      }
    });
  };

  // Initialize morphing animation
  useEffect(() => {
    if (!pathRef.current) return;

    // Check if anime is available
    if (typeof anime === 'undefined') {
      console.error('❌ anime.js is not loaded');
      return;
    }

    // Create timeline
    timelineRef.current = anime.timeline({
      autoplay: false,
      easing: 'easeInOutQuad'
    });

    // Add morphing animations for each section
    sections.forEach((section, index) => {
      timelineRef.current.add({
        targets: pathRef.current,
        d: section.path,
        duration: 1000,
        easing: 'easeInOutQuad'
      });
    });

    // Handle scroll events
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate overall scroll progress
      const totalProgress = scrollY / (documentHeight - windowHeight);
      
      // Seek timeline based on scroll progress
      if (timelineRef.current) {
        timelineRef.current.seek(timelineRef.current.duration * totalProgress);
      }

      // Check which section is currently in view
      let activeSection = 0;
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            activeSection = index;
          }
        }
      });

      setCurrentSection(activeSection);

      // Special handling for rocket section (projects)
      if (activeSection === 4) { // projects section
        const progress = getScrollProgress('projects');
        if (progress > 0.8) {
          // Trigger rocket launch animation
          anime({
            targets: pathRef.current,
            translateY: [-20, -100],
            scale: [1, 1.2],
            duration: 1500,
            easing: 'easeOutExpo',
            complete: () => {
              createParticleBurst();
            }
          });
        }
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle rocket click
  const handleRocketClick = () => {
    if (currentSection === 4) { // projects section
      window.location.href = '/projects';
    }
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 pointer-events-none">
      <div className="relative">
        {/* Main morphing SVG */}
        <svg
          ref={svgRef}
          width="120"
          height="120"
          viewBox="0 0 24 24"
          className="text-primary-purple drop-shadow-lg"
          style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))' }}
        >
          <path
            ref={pathRef}
            d={pathData.circle}
            fill="currentColor"
            className="transition-all duration-300"
            style={{ cursor: currentSection === 4 ? 'pointer' : 'default' }}
            onClick={currentSection === 4 ? handleRocketClick : undefined}
          />
        </svg>

        {/* Particle container for rocket burst */}
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Section indicator */}
        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? 'bg-primary-purple scale-125'
                  : 'bg-primary-purple/30'
              }`}
            />
          ))}
        </div>

        {/* Section labels */}
        <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 text-xs text-text-muted">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`transition-all duration-300 ${
                index === currentSection
                  ? 'text-primary-purple font-medium'
                  : 'opacity-50'
              }`}
            >
              {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MorphingScrollytelling;