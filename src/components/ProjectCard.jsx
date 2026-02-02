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
      {/* Existing card - unchanged */}
      <motion.div
        className="card-elevated rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        onClick={() => setIsModalOpen(true)}
        whileHover={{ y: -4 }}
      >
        {/* Header - Always Visible */}
        <div className="p-6 lg:p-8 flex flex-col flex-1">
          {/* Category Label - Fixed Height */}
          <div className="h-5 mb-2">
            <div className="text-caption text-accent-orange">{project.categoryDisplay}</div>
          </div>

          {/* Award Badge - Own Row */}
          {project.award && (
            <motion.div
              className="mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
                🏆 {project.award}
              </span>
            </motion.div>
          )}
          {!project.award && <div className="h-8 mb-3" />}

          {/* Title - Max 2 Lines with Ellipsis */}
          <h3 className="text-display text-xl leading-tight mb-4 line-clamp-2 min-h-[3.5rem]">
            {project.title}
          </h3>

          {/* Tech Tags - Consistent Height */}
          <div className="flex flex-wrap gap-2 mb-4 min-h-[2.5rem]">
            {visibleTech.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-mono-gray-100 text-text-muted text-sm rounded-full h-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
            {hiddenCount > 0 && (
              <span className="px-3 py-1 text-accent-orange text-sm font-medium h-fit">
                +{hiddenCount} more
              </span>
            )}
          </div>

          {/* View More Indicator */}
          <div className="flex items-center justify-center mt-auto pt-2">
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
