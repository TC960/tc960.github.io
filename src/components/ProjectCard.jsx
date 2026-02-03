import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ project, index = 0 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maxVisibleTags = 4;
  const visibleTech = project.tech.slice(0, maxVisibleTags);
  const hiddenCount = project.tech.length - maxVisibleTags;

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
      {/* Card with Fixed Height */}
      <motion.div
        className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden cursor-pointer flex flex-col min-h-[420px]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        onClick={() => setIsModalOpen(true)}
        whileHover={{ y: -4 }}
      >
        {/* Card Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Category Label - Fixed Height, Uppercase, Truncate */}
          <div className="h-4 mb-3">
            <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-600 font-medium truncate">
              {project.categoryDisplay}
            </div>
          </div>

          {/* Award Badge - Fixed Height, Truncated */}
          <div className="h-7 mb-3">
            {project.award && (
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full whitespace-nowrap max-w-full truncate">
                {project.award}
              </span>
            )}
          </div>

          {/* Title - Max 2 Lines with Ellipsis */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-4 line-clamp-2 min-h-[3.5rem]">
            {project.title}
          </h3>

          {/* Tech Tags - Single Row, Max 4 Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4 h-8 overflow-hidden">
            {visibleTech.map((tech, techIndex) => (
              <span
                key={tech}
                className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs rounded-full shrink-0"
              >
                {tech}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span className="px-2 py-1 text-accent-orange text-xs font-medium shrink-0">
                +{hiddenCount}
              </span>
            )}
          </div>

          {/* Click to View Details - Anchored to Bottom */}
          <div className="flex items-center justify-center mt-auto pt-4">
            <div className="text-accent-orange text-sm font-medium">
              Click to view details
            </div>
          </div>
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
                      {project.categoryDisplay}
                    </span>
                    {project.award && (
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
                        🏆 {project.award}
                      </span>
                    )}
                  </div>
                  <h3 className="text-display text-2xl">{project.title}</h3>
                  <div className="text-caption text-text-muted">{project.year}</div>
                </div>

                {/* Full Description */}
                <div className="text-body leading-relaxed">
                  {project.fullDescription || project.description}
                </div>

                {/* ALL Tech Stack */}
                <div className="space-y-2">
                  <div className="text-caption font-medium">Technologies</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-mono-gray-100 dark:bg-zinc-800 text-text-muted text-sm rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {project.links && Object.keys(project.links).length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-4">
                    {Object.entries(project.links).map(([type, url]) => (
                      url && url !== '#' && (
                        <a
                          key={type}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-accent-orange/10 text-accent-orange text-sm font-medium rounded-lg hover:bg-accent-orange hover:text-white transition-colors"
                        >
                          {type === 'demo' && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          {type === 'code' && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          )}
                          {type === 'devpost' && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          )}
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </a>
                      )
                    ))}
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

export default ProjectCard;
