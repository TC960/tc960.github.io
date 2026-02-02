import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const researchPositions = [
  {
    id: 'knight-lab',
    lab: 'Knight Lab',
    institution: 'University of California San Diego',
    pi: null,
    mentors: null,
    period: 'Feb 2025 - Present',
    type: 'Undergraduate Research Assistant',
    focus: ['Biomedical NLP', 'GraphRAG', 'Knowledge Graphs', 'Data Pipeline Automation'],
    description: 'Building full research pipeline for microbiome research: scraping ~2000 articles, creating NER and RE scripts for data extraction, then building a Knowledge Graph to expand research in the field of Microbiology.',
    achievements: [
      'Spearheading automation by developing automated Python data collection and analysis pipelines integrated with Google Sheets API to process metadata from 2,000+ research studies with 99%+ accuracy',
      'Built bash-based data automation scripts to streamline sample metadata extraction and generate actionable insights for large-scale microbiome research projects, used by every subdivision in the lab',
      'Fine-tuned BioBERT and PubMedBERT on MicroBioRel dataset, surpassing 70% F1-score benchmark for relation extraction',
      'Testing BioMistral, Kimi-K2, and other LLMs for optimal relation extraction',
      'Constructing Knowledge Graphs using GraphRAG to expand microbiome research capabilities',
    ],
    tech: ['Python', 'BioBERT', 'PubMedBERT', 'GraphRAG', 'Neo4j', 'NER', 'Relation Extraction', 'Google Sheets API', 'Bash Automation'],
  },
  {
    id: 'protolab',
    lab: 'ProtoLab',
    institution: 'UC San Diego Design Lab',
    pi: null,
    mentors: null,
    period: 'Sep 2025 - Jan 2026',
    type: 'Undergraduate Research Assistant',
    focus: ['Multi-Agent AI', 'HCI Research', 'Audio Processing', 'Conversational AI'],
    description: 'Conducting research at the intersection of design and human-computer interaction, exploring multi-agent AI systems for enhanced prototyping methodologies.',
    achievements: [
      'Built audio processing pipeline with pyannote.ai + Whisper Large V3, optimized on A100 GPU achieving 40% faster processing',
      'Designed multi-agent conversational AI for mock interviews with configurable personas and aggressivity levels',
      'Achieved 60-70% latency reduction through parallel processing pipeline optimization',
      'Compared OpenAI models, open-source LLMs + 11Labs, and NVIDIA ACE framework for optimal voice synthesis',
      'Developed speaker diarization and persona generation pipeline using Pyannote, Rev AI, NVIDIA NeMo/Riva',
      'Created systems to extract real speech patterns for human-like AI persona creation',
    ],
    tech: ['Python', 'Pyannote.ai', 'Whisper Large V3', 'A100 GPU', 'Multi-Agent Systems', 'LLMs', 'OpenAI', '11Labs', 'NVIDIA ACE', 'NVIDIA NeMo', 'Rev AI'],
  },
  {
    id: 'mosaic-lab',
    lab: 'MOSAIC Lab',
    institution: 'University of California San Diego',
    pi: 'Professor Tauhidur Rahman',
    mentors: ['PhD Rahath Malladi'],
    period: '2025 - Present',
    type: 'Undergraduate Research Assistant',
    focus: ['Biosensor Research', 'Wearable Computing', 'Health Sensing'],
    description: 'Conducting research on biosensor technologies for health monitoring and physiological signal processing.',
    achievements: [
      'Biosensor development and signal processing research',
    ],
    tech: ['Biosensors', 'Signal Processing', 'Python'],
  },
];

const Research = () => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active index on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.querySelector('article')?.offsetWidth || 0;
      const gap = 32; // 2rem gap
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('article');
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  const scrollPrev = () => {
    if (activeIndex > 0) {
      scrollToCard(activeIndex - 1);
    }
  };

  const scrollNext = () => {
    if (activeIndex < researchPositions.length - 1) {
      scrollToCard(activeIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background-primary/95 backdrop-blur-sm border-b border-mono-gray-200">
        <div className="container-wide px-8 lg:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="text-display text-lg hover:text-accent-orange transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 lg:py-16">
        <motion.div
          className="text-center mb-12 px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-display text-4xl lg:text-5xl mb-4">Research</h1>
          <p className="text-body text-lg max-w-2xl mx-auto">
            Exploring the frontiers of AI, NLP, and human-computer interaction through academic research
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {activeIndex > 0 && (
            <button
              onClick={scrollPrev}
              className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-white dark:bg-zinc-900 rounded-full shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Previous card"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {activeIndex < researchPositions.length - 1 && (
            <button
              onClick={scrollNext}
              className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-white dark:bg-zinc-900 rounded-full shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Next card"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-8 px-8 lg:px-12 pb-8 research-scroll-container"
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {researchPositions.map((position, index) => (
              <motion.article
                key={position.id}
                className="card-elevated rounded-2xl overflow-hidden flex-shrink-0 w-[95vw] lg:w-[80vw] max-w-[900px]"
                style={{ scrollSnapAlign: 'center' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="p-8 space-y-5 h-full">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-display text-2xl">{position.lab}</h2>
                        <p className="text-accent-orange font-medium">{position.institution}</p>
                      </div>
                      <span className="px-3 py-1 bg-accent-orange/10 text-accent-orange text-xs font-medium rounded-full whitespace-nowrap">
                        {position.type}
                      </span>
                    </div>

                    {/* PI and Mentors */}
                    {(position.pi || position.mentors) && (
                      <div className="text-sm text-text-muted">
                        {position.pi && <span>PI: {position.pi}</span>}
                        {position.pi && position.mentors && <span> • </span>}
                        {position.mentors && <span>Mentor: {position.mentors.join(', ')}</span>}
                      </div>
                    )}

                    <p className="text-caption text-text-muted">{position.period}</p>
                  </div>

                  {/* Focus Areas */}
                  <div className="flex flex-wrap gap-2">
                    {position.focus.map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1 bg-mono-gray-100 text-text-secondary text-sm rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-body leading-relaxed">{position.description}</p>

                  {/* Achievements */}
                  <div className="space-y-3 pt-3 border-t border-mono-gray-200">
                    <h3 className="text-caption font-semibold text-text-primary">Key Contributions</h3>
                    <ul className="space-y-2">
                      {position.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-body text-sm">
                          <span className="w-1.5 h-1.5 bg-accent-orange rounded-full mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="pt-3 border-t border-mono-gray-200">
                    <h3 className="text-caption font-semibold text-text-primary mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {position.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-background-secondary text-text-muted text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {researchPositions.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-accent-orange w-8'
                    : 'bg-mono-gray-300 hover:bg-mono-gray-400'
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .research-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Research;
