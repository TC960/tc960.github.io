import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExperienceCard = ({ experience, index = 0 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Normalize to a roles array so single- and multi-role entries share one code path.
  const roles = experience.roles || [
    {
      title: experience.title,
      date: experience.date,
      description: experience.description,
      skills: experience.skills,
    },
  ];
  const isMultiRole = roles.length > 1;

  // Union of every role's skills (de-duped), used for the compact preview pills.
  const allSkills = [...new Set(roles.flatMap((r) => r.skills || []))];

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
      {/* Card Preview with Hover Overlay */}
      <motion.div
        className="relative group cursor-pointer h-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Card Content */}
        <div className="card p-8 bg-zinc-100 dark:bg-zinc-900 space-y-2.5 h-full flex flex-col rounded-xl">
          {/* Date and Type Header */}
          <div className="flex justify-between items-start gap-4">
            <span className="px-2 py-0.5 bg-accent-orange/10 text-accent-orange text-xs font-medium rounded">
              {experience.type}
            </span>
            <div className="text-caption text-text-muted text-right flex-shrink-0 text-xs">{experience.date}</div>
          </div>

          {isMultiRole ? (
            <>
              {/* Company + location */}
              <div className="space-y-0.5">
                <h3 className="text-display text-lg leading-tight">{experience.company}</h3>
                {experience.location && (
                  <p className="text-caption text-text-muted text-xs">{experience.location}</p>
                )}
              </div>

              {/* Stacked roles with a LinkedIn-style progression line */}
              <div className="flex-grow space-y-3 pt-0.5">
                {roles.map((role, i) => (
                  <div key={i} className="relative pl-5">
                    {/* dot */}
                    <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-accent-orange" />
                    {/* connecting line to next role */}
                    {i < roles.length - 1 && (
                      <span className="absolute left-[3.5px] top-3.5 bottom-[-0.75rem] w-px bg-accent-orange/30" />
                    )}
                    <p className="text-accent text-sm font-medium leading-tight">{role.title}</p>
                    <p className="text-caption text-text-muted text-xs">{role.date}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Title and Company */}
              <div className="space-y-0.5">
                <h3 className="text-display text-lg leading-tight">{roles[0].title}</h3>
                <p className="text-accent text-sm">{experience.company}</p>
                {experience.location && (
                  <p className="text-caption text-text-muted text-xs">{experience.location}</p>
                )}
              </div>

              {/* Brief Description - Max 3-4 lines with ellipsis */}
              {roles[0].description && (
                <p className="text-body text-sm leading-relaxed line-clamp-4 flex-grow">
                  {roles[0].description}
                </p>
              )}
            </>
          )}

          {/* Skills Preview - Show first 3 */}
          {allSkills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {allSkills.slice(0, 3).map((skill, i) => (
                <span key={i} className="px-2 py-0.5 bg-mono-gray-200 dark:bg-zinc-800 text-text-muted text-xs rounded-full">
                  {skill}
                </span>
              ))}
              {allSkills.length > 3 && (
                <span className="px-2 py-0.5 text-accent-orange text-xs font-medium">
                  +{allSkills.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Glass Overlay on Hover */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            className="w-6 h-6 text-white mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-white font-medium text-sm">Click to expand</span>
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
                  {isMultiRole ? (
                    <>
                      <h3 className="text-display text-2xl">{experience.company}</h3>
                      {experience.location && (
                        <p className="text-caption text-text-muted">{experience.location}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <h3 className="text-display text-2xl">{roles[0].title}</h3>
                      <p className="text-accent text-lg">{experience.company}</p>
                      {experience.location && (
                        <p className="text-caption text-text-muted">{experience.location}</p>
                      )}
                    </>
                  )}
                </div>

                {isMultiRole ? (
                  /* Roles as a vertical progression timeline */
                  <div className="space-y-6">
                    {roles.map((role, i) => (
                      <div key={i} className="relative pl-6">
                        {/* dot */}
                        <span className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-accent-orange" />
                        {/* connecting line */}
                        {i < roles.length - 1 && (
                          <span className="absolute left-[4.5px] top-4 bottom-[-1.5rem] w-px bg-accent-orange/30" />
                        )}
                        <h4 className="text-display text-lg leading-tight">{role.title}</h4>
                        <p className="text-caption text-text-muted mb-2">{role.date}</p>
                        {role.description && (
                          <p className="text-body leading-relaxed">{role.description}</p>
                        )}
                        {role.skills && role.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-3">
                            {role.skills.map((skill, j) => (
                              <span key={j} className="px-3 py-1 bg-mono-gray-100 dark:bg-zinc-800 text-text-muted text-sm rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Full Description */}
                    {roles[0].description && (
                      <div className="text-body leading-relaxed">
                        {roles[0].description}
                      </div>
                    )}

                    {/* All Skills */}
                    {roles[0].skills && roles[0].skills.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-caption font-medium">Skills</div>
                        <div className="flex flex-wrap gap-2">
                          {roles[0].skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-mono-gray-100 dark:bg-zinc-800 text-text-muted text-sm rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
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
