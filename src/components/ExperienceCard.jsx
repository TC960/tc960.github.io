import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExperienceCard = ({ experience, index = 0 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Truncate description to ~150 characters for preview
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Scroll lock effect
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  return (
    <>
      {/* Card Preview */}
      <motion.div
        className="card p-6 bg-zinc-100 dark:bg-zinc-900 space-y-3 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Date and Type Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="text-caption text-accent-orange font-medium">{experience.type}</div>
          <div className="text-caption text-text-muted text-right flex-shrink-0 text-xs">{experience.date}</div>
        </div>

        {/* Title and Company */}
        <div className="space-y-1">
          <h3 className="text-display text-lg leading-tight">{experience.title}</h3>
          <p className="text-accent text-sm">{experience.company}</p>
          {experience.location && (
            <p className="text-caption text-text-muted text-xs">{experience.location}</p>
          )}
        </div>

        {/* Brief Description */}
        <p className="text-body text-sm leading-relaxed">
          {truncateText(experience.description)}
        </p>

        {/* Skills Preview - Show first 3 */}
        {experience.skills && experience.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {experience.skills.slice(0, 3).map((skill, i) => (
              <span key={i} className="px-2 py-1 bg-mono-gray-200 dark:bg-zinc-800 text-text-muted text-xs rounded-full">
                {skill}
              </span>
            ))}
            {experience.skills.length > 3 && (
              <span className="px-2 py-1 text-accent-orange text-xs font-medium">
                +{experience.skills.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Click to view indicator */}
        <div className="text-center pt-2">
          <span className="text-accent-orange text-xs font-medium">Click for details</span>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Modal Container */}
            <motion.div
              className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 p-8"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Full Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-4 py-2 bg-accent-orange/10 text-accent-orange rounded-full text-sm font-medium">
                      {experience.type}
                    </span>
                    <span className="text-caption text-text-muted">{experience.date}</span>
                  </div>
                  <h3 className="text-display text-2xl">{experience.title}</h3>
                  <p className="text-accent text-lg">{experience.company}</p>
                  {experience.location && (
                    <p className="text-caption text-text-muted">{experience.location}</p>
                  )}
                </div>

                {/* Full Description */}
                <div className="text-body leading-relaxed">
                  {experience.description}
                </div>

                {/* All Skills */}
                {experience.skills && experience.skills.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-caption font-medium">Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-mono-gray-100 dark:bg-zinc-800 text-text-muted text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExperienceCard;
