import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';

const Navigation = ({ isDarkMode, toggleDarkMode }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'research', label: 'Research' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setIsScrolled(scrollY > 50);

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    smoothScrollTo(sectionId, 80); // 80px offset for fixed navigation
    setIsOpen(false);
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'nav-scrolled' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-wide py-6">
        <div className="flex items-center justify-between">
          {/* Logo with Liquid Gradient */}
          <motion.button
            className="text-display text-lg font-medium nav-name-gradient"
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Mohak Prakash
          </motion.button>

          <style jsx>{`
            .nav-name-gradient {
              background: linear-gradient(
                90deg,
                #c2410c,
                #f97316,
                #fbbf24,
                #f97316,
                #c2410c
              );
              background-size: 200% 100%;
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: gradientFlow 4s linear infinite;
            }

            @keyframes gradientFlow {
              0% {
                background-position: 0% 50%;
              }
              100% {
                background-position: 200% 50%;
              }
            }
          `}</style>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.slice(1).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              >
                {section.label}
              </button>
            ))}

            {/* Dark Mode Toggle Slider */}
            <button
              onClick={toggleDarkMode}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 dark:bg-black"
              aria-label="Toggle dark mode"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
              {/* Sun Icon */}
              <svg 
                className={`absolute left-1 h-3 w-3 text-yellow-500 transition-opacity duration-300 ${
                  isDarkMode ? 'opacity-0' : 'opacity-100'
                }`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              {/* Moon Icon */}
              <svg 
                className={`absolute right-1 h-3 w-3 text-gray-400 transition-opacity duration-300 ${
                  isDarkMode ? 'opacity-100' : 'opacity-0'
                }`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button and Dark Mode Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-200 transition-colors duration-300 focus:outline-none dark:bg-black"
              aria-label="Toggle dark mode"
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
                  isDarkMode ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
              {/* Sun Icon */}
              <svg 
                className={`absolute left-0.5 h-2 w-2 text-yellow-500 transition-opacity duration-300 ${
                  isDarkMode ? 'opacity-0' : 'opacity-100'
                }`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              {/* Moon Icon */}
              <svg 
                className={`absolute right-0.5 h-2 w-2 text-gray-400 transition-opacity duration-300 ${
                  isDarkMode ? 'opacity-100' : 'opacity-0'
                }`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
            <button
              className="p-2 text-text-primary hover:text-accent-orange transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <motion.span
                className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <motion.span
                className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <motion.span
                className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-6 pb-4 space-y-1 border-t border-mono-gray-200 mt-6">
            {sections.slice(1).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left py-3 px-4 text-body transition-all duration-300 ${
                  activeSection === section.id
                    ? 'text-accent-orange bg-mono-gray-50'
                    : 'text-text-secondary hover:text-text-primary hover:bg-mono-gray-50'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
