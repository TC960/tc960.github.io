import React from 'react';

const MarqueeSkills = () => {
  const skillRows = [
    {
      skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'SQL', 'NumPy', 'OpenCV'],
      direction: 'left',
      duration: '15s',
      style: 'default'
    },
    {
      skills: ['LLMs', 'RAG', 'Transformers', 'LangChain', 'NER/RE', 'Knowledge Graphs', 'Neo4j', 'Pinecone', 'MongoDB'],
      direction: 'right',
      duration: '25s',
      style: 'orange'
    },
    {
      skills: ['React', 'FastAPI', 'Flask', 'JavaScript', 'Node.js', 'Git', 'Docker', 'AWS', 'Jupyter'],
      direction: 'left',
      duration: '35s',
      style: 'muted'
    }
  ];

  const getPillStyle = (style) => {
    switch (style) {
      case 'orange':
        return 'bg-orange-50 dark:bg-orange-500/5 border border-orange-300 dark:border-orange-500/20 text-orange-700 dark:text-orange-200/80';
      case 'muted':
        return 'bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400';
      default:
        return 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300';
    }
  };

  return (
    <section id="skills" className="section bg-background-primary">
      <div className="container-medium">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display mb-4">Skills & Expertise</h2>
          <p className="text-text-muted text-lg">Technologies I work with</p>
        </div>

        {/* Marquee Container */}
        <div className="relative max-w-5xl mx-auto overflow-hidden">
          {/* Gradient Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

          {/* Skill Rows */}
          <div className="space-y-3">
            {skillRows.map((row, rowIndex) => {
              // Duplicate skills 5 times for seamless infinite scroll
              const duplicatedSkills = Array(5).fill(row.skills).flat();

              return (
                <div
                  key={rowIndex}
                  className="relative overflow-hidden py-2"
                >
                  <div
                    className={`flex gap-3 ${row.direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
                    style={{
                      animationDuration: row.duration,
                      width: 'max-content'
                    }}
                  >
                    {duplicatedSkills.map((skill, index) => (
                      <div
                        key={`${skill}-${index}`}
                        className={`
                          ${getPillStyle(row.style)}
                          rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap
                          transition-all duration-300
                          hover:border-accent-orange hover:shadow-[0_0_20px_rgba(210,105,30,0.3)]
                          cursor-default
                        `}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-20%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-20%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default MarqueeSkills;
