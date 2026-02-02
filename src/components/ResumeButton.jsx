import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeButton = ({
  usResumeUrl = "https://drive.google.com/file/d/1KrOenmBpxeg0CTAeOI8T36AJJN3q0uO-/view?usp=sharing",
  ukResumeUrl = "https://drive.google.com/file/d/1KrOenmBpxeg0CTAeOI8T36AJJN3q0uO-/view?usp=sharing"
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInteraction = () => {
    setIsExpanded(!isExpanded);
  };

  const baseButtonClasses = "flex items-center gap-2 p-3 rounded-xl border transition-all duration-300";
  const defaultClasses = "border-mono-gray-200 text-text-secondary hover:text-accent-orange hover:border-accent-orange";
  const expandedClasses = "border-accent-orange text-accent-orange hover:text-accent-orange hover:border-accent-orange";

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      initial={false}
      layout
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="single"
            className={`${baseButtonClasses} ${defaultClasses} w-full justify-start`}
            onClick={handleInteraction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            aria-label="View Resume Options"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">Resume</span>
          </motion.button>
        ) : (
          <motion.div
            key="split"
            className="flex gap-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.a
              href={usResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${baseButtonClasses} ${expandedClasses} flex-1 justify-start`}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              aria-label="Download US Resume"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              <span className="text-sm font-medium">US</span>
            </motion.a>

            <motion.a
              href={ukResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${baseButtonClasses} ${expandedClasses} flex-1 justify-start`}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              aria-label="Download UK Resume"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              <span className="text-sm font-medium">UK</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResumeButton;
