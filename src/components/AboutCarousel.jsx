import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AboutCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const slides = [
    {
      id: 'who-i-am',
      label: 'Who I Am',
      title: 'Who I Am',
      content: "I'm a data science student at UC San Diego with an obsession for building things that actually work. I'm an avid researcher, builder, and hackathoner."
    },
    {
      id: 'what-excites-me',
      label: 'What Excites Me',
      title: 'What Excites Me',
      content: "Right now, I'm particularly excited about the intersection of neuroscience and AI. Whether it's translating EMG signals into speech for people who can't speak, or using EEG to classify emotions, I'm drawn to projects where AI meets human cognition. I often find myself thinking about how to bridge gaps in communication, integrating hardware with AI, or scheming my next edge AI hackathon idea."
    },
    {
      id: 'how-i-learn',
      label: 'How I Learn',
      title: 'How I Learn',
      content: "I learn best by doing—which explains why I've competed in 10 hackathons and won 6 of them. Each one taught me something new: how to ship fast, collaborate under pressure, and turn a 2am idea into a working demo by morning."
    },
    {
      id: 'outside-code',
      label: 'Outside Code',
      title: 'Outside Code',
      content: "Outside I love listening to music, watching F1, playing racing games, or window shopping sneakers."
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, slides.length]);

  // Handle manual tab click with timer reset
  const handleTabClick = (index) => {
    setActiveSlide(index);
    // Reset timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
    }
  };

  return (
    <section
      id="about"
      className="section bg-background-secondary"
    >
      <div className="container-medium">
        {/* Section Title */}
        <div className="section-header text-center">
          <h2 className="text-display mb-6">About</h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Navigation */}
          <div className="lg:col-span-3">
            <div className="flex flex-row lg:flex-col gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => handleTabClick(index)}
                  className={`text-left px-4 py-3 rounded-lg transition-all duration-300 border-l-2 ${
                    activeSlide === index
                      ? 'bg-accent-orange/10 border-accent-orange text-accent-orange'
                      : 'border-transparent text-zinc-600 hover:border-mono-gray-400 hover:text-text-secondary'
                  }`}
                >
                  <span className="text-sm font-medium">{slide.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-9">
            <div
              className={`relative min-h-[280px] lg:min-h-[240px] rounded-lg p-6 transition-all duration-300 ${
                isPaused ? 'bg-accent-orange/5 ring-1 ring-accent-orange/20' : ''
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                {slides.map((slide, index) => (
                  index === activeSlide && (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                      className="space-y-6"
                    >
                      <h3 className="text-accent-orange text-2xl font-medium">
                        {slide.title}
                      </h3>
                      <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
                        {slide.content}
                      </p>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCarousel;
