import React, { useState, useEffect } from 'react';
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode initialization
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header - Theme-aware */}
      <header className="sticky top-0 z-40 bg-white dark:bg-black backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <div className="container-wide px-8 lg:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="text-display text-lg text-gray-900 dark:text-white hover:text-accent-orange transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 lg:py-12">
        {/* Header - Simplified */}
        <motion.div
          className="text-center mb-12 px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-display text-4xl lg:text-5xl text-gray-900 dark:text-white">Research</h1>
        </motion.div>

        {/* Vertical Stack of Cards */}
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="space-y-10">
            {researchPositions.map((position, index) => (
              <motion.article
                key={position.id}
                className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 lg:p-10 space-y-6 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <h2 className="text-display text-2xl lg:text-3xl text-gray-900 dark:text-white mb-2">
                        {position.lab}
                      </h2>
                      <p className="text-accent-orange font-medium text-lg">{position.institution}</p>
                    </div>
                    <span className="px-4 py-2 bg-accent-orange/10 text-accent-orange text-xs font-medium rounded-full whitespace-nowrap">
                      {position.type}
                    </span>
                  </div>

                  {/* PI and Mentors */}
                  {(position.pi || position.mentors) && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {position.pi && <span>PI: {position.pi}</span>}
                      {position.pi && position.mentors && <span> • </span>}
                      {position.mentors && <span>Mentor: {position.mentors.join(', ')}</span>}
                    </div>
                  )}

                  <p className="text-sm text-gray-600 dark:text-gray-400">{position.period}</p>
                </div>

                {/* Focus Areas */}
                <div className="flex flex-wrap gap-2">
                  {position.focus.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1.5 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-zinc-200 dark:border-zinc-700"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{position.description}</p>

                {/* Achievements */}
                <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                    Key Contributions
                  </h3>
                  <ul className="space-y-2.5">
                    {position.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-accent-orange rounded-full mt-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {position.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs rounded border border-zinc-200 dark:border-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Research;
