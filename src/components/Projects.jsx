import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('chronological');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode initialization and scroll to top
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Force clean slate for dark mode - remove any existing dark class
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    
    // FIXED: Tailwind config now uses 'class' mode instead of 'media'
    // localStorage.removeItem('darkMode');
    
    // For new users or fresh browsers, default to light mode
    const savedDarkMode = localStorage.getItem('darkMode');
    
    // Only enable dark mode if explicitly set to 'true'
    const isDarkModeEnabled = savedDarkMode === 'true';
    
    console.log('Projects page - savedDarkMode:', savedDarkMode, 'isDarkModeEnabled:', isDarkModeEnabled);
    
    setIsDarkMode(isDarkModeEnabled);
    
    // Only add dark class if explicitly saved as true
    if (isDarkModeEnabled) {
      document.documentElement.classList.add('dark');
      console.log('Dark mode enabled - added dark class');
    } else {
      // Ensure light mode by explicitly removing any dark classes
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      console.log('Light mode enabled - removed all dark classes');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', newDarkMode);
  };

  const projects = [
    {
      id: 'few-words',
      title: 'Why waste time say lot word when few word do trick?',
      category: ['fullstack', 'ml', 'research', 'data', 'nlp'],
      year: 2025,
      description: 'AI platform for assistive communication that summarizes and generates expressive responses using both EEG-detected emotions and personality profiling, making conversations short, emotionally relevant, and true to each user\'s style. Combines emotion classification from brain signals and generative voice synthesis in a customizable interface designed for quick, accessible communication.',
      tech: ['OpenAI Whisper', 'GPT-5', 'ElevenLabs Voice', 'Python', 'React', 'EEG', 'Fourier Transform', 'Random Forest', 'PCA', 'ICA', 'PSD Analysis', 'MBTI', 'MCP Server', 'QLora', 'ngrok'],
      categoryDisplay: 'EEG-assisted speech-aid tool',
      award: 'Winner @ CalHacks',
      links: { devpost: 'https://devpost.com/software/why-waste-time-say-lot-word-when-few-word-do-trick', demo: 'https://www.youtube.com/watch?v=MEH357zinV4&t=1s' }
    },
    {
      id: 'take-2',
      title: 'Take 2',
      category: ['fullstack', 'ml', 'research', 'data'],
      year: 2025,
      description: 'Early Parkinson\'s diagnostic aid that analyzes keystrokes, voice, and eye blinks with AI models to generate a patient risk report, aiming for affordable, large-scale screening among people aged over 50, while prioritizing user data privacy and compliance standards.',
      tech: ['Python', 'React', 'TypeScript', 'FastAPI', 'VLMs', 'Fourier Transform', 'HuggingFace', 'OpenCV', 'Pinecone'],
      categoryDisplay: 'Compliance-ready AI Parkinsons Diagnostic Tool',
      award: 'Winner @ HealthLink Life Sciences Hackathon',
      links: { devpost: 'https://devpost.com/software/take-2' }
    },
    {
      id: 'qa-smith',
      title: 'QA smith',
      category: ['fullstack', 'ml'],
      year: 2025,
      description: 'Automated QA platform that crawls websites, builds a graph of interactions, and uses Claude AI to generate and run Playwright tests (Smoke, Logic, and Flow), enabling fast, reliable E2E testing with intelligent failure analysis for developers.',
      tech: ['Claude', 'Docker', 'd3.js', 'JUnit', 'k6', 'Neo4j', 'Playwright', 'TanStack', 'FastAPI', 'React', 'TypeScript'],
      categoryDisplay: 'QA testing/AI',
      links: { devpost: 'https://devpost.com/software/qa-smith', demo: 'https://www.youtube.com/watch?v=OkgMHV-PnKI' }
    },
    {
      id: 'clueless',
      title: 'Clueless',
      category: ['fullstack', 'ml'],
      year: 2025,
      description: 'AI-powered web navigation assistant for developers. Automatically maps the structure of any web application into a knowledge graph and lets users ask in plain English—or by voice—how to perform actions.',
      tech: ['AI Navigation', 'Knowledge Graph', 'Voice AI', 'Web Mapping'],
      categoryDisplay: 'AI/Developer Tools',
      award: 'Winner @ Hack MIT \'25',
      links: { demo: '#', code: '#' }
    },
    {
      id: 'coachgpt',
      title: 'CoachGPT',
      category: ['fullstack', 'ml'],
      year: 2025,
      description: 'AI coaching system that democratizes professional sports training through computer vision and voice AI. Analyzes workout videos in real-time with form corrections across 18+ sports.',
      tech: ['Next.js', 'Flask', 'MediaPipe', 'ElevenLabs'],
      categoryDisplay: 'AI Sports Tech',
      links: { demo: '#', code: '#' }
    },
    {
      id: 'taxdaddy',
      title: 'TaxDaddy',
      category: ['fullstack'],
      year: 2025,
      description: 'AI-powered tax filing web application with document upload, voice assistance, and real-time analytics. Features OCR, MongoDB storage, and RAG system.',
      tech: ['React', 'MongoDB', 'OCR', 'Twilio'],
      categoryDisplay: 'Web Application',
      award: 'Winner @ Hacklytics \'24',
      links: { demo: '#', code: '#' }
    },
    {
      id: 'pop-off',
      title: 'Pop Off!',
      category: ['fullstack', 'ml'],
      year: 2025,
      description: 'AI fitness app that matches users to pop star lookalikes using facial analysis and generates music-synced workouts based on Spotify BPM.',
      tech: ['OpenCV', 'MediaPipe', 'Facial Recognition', 'Spotify API'],
      categoryDisplay: 'AI Fitness',
      links: { demo: '#', code: '#' }
    },
    {
      id: 'see-with-me',
      title: 'See With Me',
      category: ['fullstack', 'ml'],
      year: 2025,
      description: 'Digital forensics tool using Meta Ray-Ban smart glasses and YOLOv11n computer vision to identify and track digital devices in real-time.',
      tech: ['Meta Ray-Ban', 'YOLOv11n', 'Computer Vision', 'LLM'],
      categoryDisplay: 'Digital Forensics',
      links: { demo: '#', code: '#' }
    },
    {
      id: 'triton-neurotech-ssvep',
      title: 'Triton Neurotech SSVEP EEG RC Car',
      category: ['research'],
      year: 2025,
      description: 'Brain-computer interface using SSVEP detected via EEG to control a remote car. Users focus on visual stimuli for hands-free operation.',
      tech: ['EEG', 'SSVEP', 'Brain-Computer Interface', 'Signal Processing'],
      categoryDisplay: 'BCI Research',
      links: { demo: '#', research: '#' }
    },
    {
      id: 'genasis',
      title: 'GenAsis',
      category: ['fullstack'],
      year: 2025,
      description: 'Containerized web application for AI-assisted video script generation using React and FastAPI with Docker and Kubernetes orchestration.',
      tech: ['React', 'FastAPI', 'Docker', 'Kubernetes'],
      categoryDisplay: 'DevOps/AI',
      links: { demo: '#', code: '#' }
    },
    {
      id: 'seasons-of-sales',
      title: 'Seasons of Sales',
      category: ['data'],
      year: 2025,
      description: 'Data-driven retail analysis investigating seasonal patterns using RandomForest classifier across 3,780 hyperparameter combinations.',
      tech: ['Python', 'RandomForest', 'RandomizedSearchCV', 'Statistical Analysis'],
      categoryDisplay: 'Data Science',
      links: { analysis: '#', code: '#' }
    },
    {
      id: 'power-outage-analysis',
      title: 'Power Outage Analysis',
      category: ['data', 'ml'],
      year: 2025,
      description: 'ML analysis predicting U.S. power outage causes using RandomForest on 1,534 outages with hypothesis testing and fairness evaluation.',
      tech: ['RandomForest', 'Hypothesis Testing', 'NMAR Analysis', 'Scikit-learn'],
      categoryDisplay: 'Data Science',
      links: { analysis: '#', code: '#' }
    },
    {
      id: 'pharmaltai',
      title: 'PharmaltAI',
      category: ['fullstack', 'nlp'],
      year: 2024,
      description: 'AI chatbot using Pinecone VectorDB and Gemini for pharmaceutical queries. Converted 100+ PDFs into vector embeddings for context-aware answers.',
      tech: ['React', 'Flask', 'Pinecone', 'Gemini AI'],
      categoryDisplay: 'AI/Full-Stack',
      links: { demo: '#', code: '#' }
    },
    {
      id: 'munch',
      title: 'Munch',
      category: ['fullstack', 'nlp'],
      year: 2024,
      description: 'AI culinary assistant that recognizes ingredients from photos and generates recipes. Features Flutter cross-platform design and Hume AI voice interface.',
      tech: ['Flutter', 'GenAI', 'Hume AI', 'Computer Vision'],
      categoryDisplay: 'AI/Mobile',
      links: { demo: '#', code: '#' }
    },
    {
      id: 'triton-neurotech-dendrite',
      title: 'Triton Neurotech Dendrite Project',
      category: ['research', 'ml'],
      year: 2024,
      description: 'Versatile exoskeleton for shoulder physiotherapy with innovative inflatable structure. Enhanced functionality based on Harvard study insights.',
      tech: ['Biomedical Engineering', 'Exoskeleton', 'Physiotherapy', 'Hardware'],
      categoryDisplay: 'AI Research',
      links: { research: '#', design: '#' }
    },
    {
      id: 'candidate-analysis',
      title: 'Candidate Analysis System',
      category: ['fullstack', 'ml'],
      year: 2024,
      description: 'Enhanced candidate analysis during interviews using FFmpeg and SpeechRecognition to convert video data to text with Gemini AI evaluation.',
      tech: ['FFmpeg', 'SpeechRecognition', 'Gemini AI', 'Database'],
      categoryDisplay: 'Full-Stack',
      links: { demo: '#', code: '#' }
    },
    {
      id: 'spiking-neural-networks',
      title: 'Spiking Neural Networks Research',
      category: ['research', 'ml'],
      year: 2024,
      description: 'Research on SNNs to improve real-time pattern recognition and object detection compared to traditional ANNs with optimized architectures.',
      tech: ['Spiking Neural Networks', 'Pattern Recognition', 'Object Detection'],
      categoryDisplay: 'Neural Networks',
      links: { research: '#', paper: '#' }
    },
    {
      id: 'research',
      title: 'ReSearch',
      category: ['research', 'nlp'],
      year: 2023,
      description: 'Tool that analyzes professors\' websites to generate alignment scores with personal research interests and automatically drafts personalized emails.',
      tech: ['Gmail API', 'Web Scraping', 'NLP', 'Research Matching'],
      categoryDisplay: 'Research Tool',
      links: { demo: '#', code: '#' }
    },
    {
      id: 'spotify-song-recommendation',
      title: 'Spotify Song Recommendation',
      category: ['ml', 'nlp'],
      year: 2023,
      description: 'Song recommendation system using Spotify and Genius APIs analyzing 20+ criteria including danceability, energy, and tempo for personalized playlists.',
      tech: ['Spotify API', 'Genius API', 'Recommendation System', 'Python'],
      categoryDisplay: 'Music Tech',
      links: { demo: '#', code: '#' }
    }
  ];

  // Filter and search logic
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category.includes(filter);
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort logic
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'chronological':
        return b.year - a.year;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'category':
        return a.categoryDisplay.localeCompare(b.categoryDisplay);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-black/95 dark:border-gray-800 transition-colors duration-300">
        <div className="container-wide py-6">
          <div className="relative flex items-center">
            <Link 
              to="/" 
              className="absolute left-0 text-lg font-medium text-gray-900 dark:text-white hover:text-orange-500 transition-colors duration-300"
            >
              ← Back to Portfolio
            </Link>
            <h1 className="text-xl font-medium w-full text-center text-gray-900 dark:text-white">All Projects</h1>
            <button 
              onClick={toggleDarkMode}
              className="absolute right-0 inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
              {/* Sun Icon */}
              <svg className={`absolute left-1 h-3 w-3 text-yellow-500 transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              {/* Moon Icon */}
              <svg className={`absolute right-1 h-3 w-3 text-gray-400 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container-medium text-center">
            <motion.h1 
              className="text-5xl font-bold mb-8 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Project Showcase
            </motion.h1>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8">
          <div className="container-medium">
            <motion.div 
              className="flex justify-center items-center gap-8 lg:gap-12 xl:gap-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="text-3xl font-bold text-orange-500">20+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Projects Completed</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-3xl font-bold text-orange-500">13</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">AI/ML Projects</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-3xl font-bold text-orange-500">11</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Full-Stack Apps</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-3xl font-bold text-orange-500">4</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Award Winners</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter and Projects Section */}
        <section className="section py-20">
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <div className="flex gap-10">
              {/* Left Sidebar - Filters and Search */}
              <motion.div 
                className="w-3/10 flex-shrink-0" 
                style={{width: '30%'}}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="sticky top-8 space-y-8">
                  {/* Search */}
                  <div className="space-y-3">
                    <label htmlFor="project-search" className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Search Projects
                    </label>
                    <input 
                      type="text" 
                      id="project-search" 
                      placeholder="Search by project name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-orange-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  
                  {/* Filters */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Filter by Category</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'all', label: 'All Projects' },
                        { key: 'research', label: 'AI Research' },
                        { key: 'ml', label: 'Machine Learning' },
                        { key: 'fullstack', label: 'Full-Stack' },
                        { key: 'data', label: 'Data Science' },
                        { key: 'nlp', label: 'NLP' }
                      ].map(({ key, label }) => (
                        <button
                          key={key}
                          onClick={() => setFilter(key)}
                          className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                            filter === key
                              ? 'bg-orange-500 text-white shadow-sm border border-orange-500'
                              : 'text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-black border border-gray-200 dark:border-orange-500/30 hover:bg-gray-100 dark:hover:bg-orange-500/10 hover:text-gray-900 dark:hover:text-white dark:hover:border-orange-500/50'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Sort By</h3>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-orange-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 dark:bg-black text-gray-900 dark:text-white"
                    >
                      <option value="chronological">Chronological (Newest First)</option>
                      <option value="alphabetical">Alphabetical</option>
                      <option value="category">Category</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Projects Grid */}
              <div className="flex-1 min-w-0">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {sortedProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-orange-500/20 p-8 space-y-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative hover:border-orange-500/40 dark:hover:border-orange-500/60"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {/* Project Header */}
                      <div className="flex items-start justify-between">
                        <span className="px-3 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full uppercase tracking-wide">
                          {project.categoryDisplay}
                        </span>
                        {project.award && (
                          <div className="absolute top-4 right-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">🏆</span>
                          </div>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{project.title}</h3>

                      {/* Project Description */}
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-xs bg-gray-100 dark:bg-orange-500/20 text-gray-700 dark:text-orange-200 rounded-full font-medium border dark:border-orange-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Year */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Year: {project.year}</div>

                      {/* Links */}
                      <div className="flex gap-3 pt-2">
                        {Object.entries(project.links).map(([type, url]) => (
                          <a
                            key={type}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm font-medium text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-200"
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-orange-500/20 transition-colors duration-300">
        <div className="container-medium text-center">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200">
              ← Back to Portfolio
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
              Interested in collaborating?{' '}
              <Link to="/#contact" className="text-orange-500 hover:text-orange-600 hover:underline transition-colors duration-200">
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Projects;
