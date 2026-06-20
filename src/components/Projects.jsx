import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import projects from '../data/projects.json';

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
        {/* Hero Section - Compressed */}
        <section className="py-8">
          <div className="container-medium text-center">
            <motion.h1
              className="text-4xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Project Showcase
            </motion.h1>
            {/* Stats Section - Inline and Compact */}
            <motion.div
              className="flex justify-center items-center gap-6 lg:gap-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-orange-500">20+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Projects</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-orange-500">13</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">AI/ML</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-orange-500">11</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Full-Stack</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-orange-500">4</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Awards</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter and Projects Section - Tighter Padding */}
        <section className="section py-8">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex gap-6">
              {/* Left Sidebar - Narrower */}
              <motion.div
                className="w-[200px] max-w-[200px] flex-shrink-0"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="sticky top-24 space-y-5">
                  {/* Search */}
                  <div>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>

                  {/* Filters */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Filter</h3>
                    <div className="space-y-1">
                      {[
                        { key: 'all', label: 'All' },
                        { key: 'research', label: 'Research' },
                        { key: 'ml', label: 'ML' },
                        { key: 'fullstack', label: 'Full-Stack' },
                        { key: 'data', label: 'Data' },
                        { key: 'nlp', label: 'NLP' }
                      ].map(({ key, label }) => (
                        <button
                          key={key}
                          onClick={() => setFilter(key)}
                          className={`w-full text-left px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 ${
                            filter === key
                              ? 'bg-orange-500 text-white'
                              : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Sort</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-200 dark:border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                    >
                      <option value="chronological">Newest</option>
                      <option value="alphabetical">A-Z</option>
                      <option value="category">Category</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Projects Grid (3 columns) */}
              <div className="flex-1 min-w-0">
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 auto-rows-fr"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {sortedProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
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
