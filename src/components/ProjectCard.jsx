import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ project, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const maxVisibleTags = 4;
  const visibleTech = isExpanded ? project.tech : project.tech.slice(0, maxVisibleTags);
  const hiddenCount = project.tech.length - maxVisibleTags;

  return (
    <motion.div
      className="card-elevated rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={() => setIsExpanded(!isExpanded)}
      layout
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
          {!isExpanded && hiddenCount > 0 && (
            <span className="px-3 py-1 text-accent-orange text-sm font-medium h-fit">
              +{hiddenCount} more
            </span>
          )}
        </div>

        {/* Expand/Collapse Indicator */}
        <div className="flex items-center justify-center mt-auto pt-2">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="text-accent-orange"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 lg:px-8 pb-6 lg:pb-8 space-y-4 border-t border-mono-gray-200 pt-6">
              {/* Description */}
              <p className="text-body leading-relaxed">{project.description}</p>

              {/* Year */}
              <div className="text-caption text-text-muted">
                Year: {project.year}
              </div>

              {/* Links */}
              {project.links && Object.keys(project.links).length > 0 && (
                <div className="flex flex-wrap gap-3 pt-2">
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
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard;
