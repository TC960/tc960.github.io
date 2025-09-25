import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./components/ContactForm";
import Navigation from "./components/Navigation";
import BackgroundAnimation from "./components/BackgroundAnimation";
import { createScrollReveal, createHoverAnimations, createSkillBarAnimations, smoothScrollTo } from "./utils/smoothScroll";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Simple loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Dark mode initialization
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  // Initialize anime.js scroll effects after loading
  useEffect(() => {
    if (isLoaded) {
      // Create scroll reveal animations
      createScrollReveal('.scroll-reveal', {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1000,
        easing: 'easeOutCubic'
      });

      // Create staggered animations for skill cards
      createScrollReveal('.skill-card', {
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.95, 1],
        duration: 600,
        delay: (el, i) => i * 150
      });

      // Create hover animations
      createHoverAnimations();

      // Create skill bar animations
      createSkillBarAnimations();
    }
  }, [isLoaded]);

  // Minimal loading screen
  if (!isLoaded) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-background-primary flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center">
            <div className="loading-minimal mb-4" />
            <motion.p
              className="text-text-muted text-sm tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <motion.div 
      className="relative min-h-screen bg-background-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Animation */}
      <BackgroundAnimation />
      
      {/* Navigation */}
      <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <section className="section min-h-screen flex items-center texture-overlay">
        <div className="container-wide">
          <div className="grid-asymmetric items-center">
            <div className="content-main">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="space-y-4">
                  <motion.p
                    className="text-caption text-accent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Data Scientist & AI Researcher
                  </motion.p>
                  <motion.h1
                    className="text-display"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    Mohak Akul
                    <br />
                    <span className="text-accent-orange">Prakash</span>
                  </motion.h1>
                </div>
                
                <motion.p
                  className="text-body text-lg lg:text-xl max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Exploring the intersection of artificial intelligence and human cognition 
                  through innovative research methodologies and thoughtful technological solutions.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  <button 
                    className="btn-primary"
                    onClick={() => smoothScrollTo('projects', 80)}
                  >
                    View Projects
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => smoothScrollTo('experience', 80)}
                  >
                    Experience
                  </button>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="content-sidebar">
              <motion.div
                className="space-y-8 pt-8 lg:pt-0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-2xl font-display text-accent-orange">3+</div>
                    <div className="text-caption">Years Experience</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-display text-accent-orange">15+</div>
                    <div className="text-caption">Projects Completed</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-display text-accent-orange">3.8</div>
                    <div className="text-caption">GPA</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section bg-background-secondary">
        <div className="container-medium">
          <div className="section-header text-center scroll-reveal">
            <h2 className="text-display mb-6">About</h2>
            <p className="text-body text-lg max-w-2xl mx-auto">
              Passionate about the convergence of AI and human understanding
            </p>
          </div>

          <div className="grid-asymmetric">
            <motion.div
              className="content-main space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-body leading-relaxed">
                I'm a dedicated data scientist and AI researcher with a deep fascination for 
                the intersection of artificial intelligence and human cognition. My journey 
                began with curiosity about how machines learn and think, evolving into 
                a passion for building systems that augment human intelligence.
              </p>
              <p className="text-body leading-relaxed">
                Currently pursuing advanced studies in cognitive science and machine learning, 
                I focus on developing AI solutions that are not just technically sound, but 
                also ethically responsible and human-centered.
              </p>
            </motion.div>

            <motion.div
              className="content-sidebar"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="card p-8 space-y-6">
                <h3 className="text-display text-xl">Focus Areas</h3>
                <div className="space-y-4">
                  <div className="interactive-subtle">Machine Learning</div>
                  <div className="interactive-subtle">Cognitive Science</div>
                  <div className="interactive-subtle">AI Ethics</div>
                  <div className="interactive-subtle">Data Visualization</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="container-wide">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display text-center mb-6">Skills & Expertise</h2>
            <p className="text-body text-center max-w-2xl mx-auto">
              Technologies and methodologies I work with
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Machine Learning",
                skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
                description: "Building and deploying ML models"
              },
              {
                title: "Data Science",
                skills: ["Pandas", "NumPy", "Matplotlib", "SQL"],
                description: "Extracting insights from data"
              },
              {
                title: "Research",
                skills: ["Academic Writing", "Statistical Analysis", "Experimentation", "Ethics"],
                description: "Conducting rigorous research"
              }
            ].map((category, index) => (
              <div
                key={category.title}
                className="skill-card card-elevated p-8 space-y-6 interactive"
              >
                <div className="space-y-2">
                  <h3 className="text-display text-xl">{category.title}</h3>
                  <p className="text-caption">{category.description}</p>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill} className="flex justify-between items-center">
                      <span className="text-body">{skill}</span>
                      <div className="w-12 h-1 bg-mono-gray-200 rounded">
                        <div className="h-full bg-accent-orange rounded skill-bar" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section bg-background-secondary">
        <div className="container-medium">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display mb-6">Experience</h2>
            <p className="text-body max-w-2xl mx-auto">
              My professional and academic journey
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                date: "2023 - Present",
                title: "Graduate Research Assistant",
                company: "UC San Diego",
                description: "Conducting research in cognitive science and machine learning, focusing on human-AI interaction and developing novel approaches to understanding cognitive processes through computational models."
              },
              {
                date: "2022 - 2023",
                title: "Data Science Intern",
                company: "TechCorp Analytics",
                description: "Developed machine learning models for predictive analytics, worked with large datasets, and created data visualization tools for business intelligence applications."
              },
              {
                date: "2021 - 2022",
                title: "Undergraduate Researcher",
                company: "University Lab",
                description: "Assisted in research projects involving neural networks and deep learning applications in computer vision and natural language processing."
              },
              {
                date: "2020 - 2024",
                title: "Bachelor's in Computer Science",
                company: "University of California",
                description: "Specialized in artificial intelligence, machine learning, and cognitive science. Graduated with honors and multiple research publications."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="grid-asymmetric items-start gap-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="content-sidebar">
                  <div className="text-caption text-accent-orange">{item.date}</div>
                </div>
                <div className="content-main">
                  <div className="card p-8 space-y-4 interactive">
                    <div className="space-y-2">
                      <h3 className="text-display text-xl">{item.title}</h3>
                      <p className="text-accent">{item.company}</p>
                    </div>
                    <p className="text-body leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container-wide px-8 lg:px-12">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display text-center mb-6">Featured Projects</h2>
            <p className="text-body text-center max-w-2xl mx-auto">
              Selected work demonstrating my approach to AI and data science
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-12 mb-12">
            {[
              {
                title: "Clueless",
                description: "AI-powered web navigation assistant for developers that automatically maps any web application structure into a knowledge graph. Users can ask in plain English or by voice how to perform actions, and get step-by-step guidance with exact click highlights, revolutionizing developer onboarding and productivity.",
                tech: ["AI Navigation", "Knowledge Graph", "Voice AI", "Web Mapping", "Developer Tools"],
                category: "AI/Developer Tools",
                award: "Winner @ Hack MIT '25",
                links: {
                  demo: "#",
                  code: "#"
                }
              },
              {
                title: "See With Me",
                description: "Developed a digital forensics tool that uses Meta Ray-Ban smart glasses and a fine-tuned YOLOv11n computer vision model to identify and track digital devices in real-time. Created an LLM-based image analysis pipeline to generate searchable forensic insights.",
                tech: ["Meta Ray-Ban", "YOLOv11n", "Computer Vision", "LLM", "Digital Forensics"],
                category: "Digital Forensics",
                links: {
                  demo: "#",
                  code: "#"
                }
              },
              {
                title: "TaxDaddy",
                description: "Built an AI-powered tax filing web application with document upload, voice-enabled assistance via Twilio, and real-time analytics. Implemented OCR for data extraction, MongoDB for storage, and a RAG system for answering queries and automated form completion with PyPDF Filler.",
                tech: ["React", "MongoDB", "OCR", "Twilio", "RAG System", "PyPDF"],
                category: "AI/Web Application",
                award: "Winner @ Hacklytics '24",
                links: {
                  demo: "#",
                  code: "#"
                }
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                className="card-elevated p-10 space-y-6 interactive group hover:scale-[1.02] rounded-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="space-y-2">
                  <div className="text-caption text-accent-orange">{project.category}</div>
                  <h3 className="text-display text-xl group-hover:text-accent-orange transition-colors duration-300">
                    {project.title}
                  </h3>
                  {project.award && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                      <span>🏆</span>
                      {project.award}
                    </div>
                  )}
                </div>
                
                <p className="text-body leading-relaxed">{project.description}</p>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-mono-gray-100 text-text-muted text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.links.demo && (
                      <a 
                        href={project.links.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-ghost"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.links.code && (
                      <a 
                        href={project.links.code} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-ghost"
                      >
                        GitHub
                      </a>
                    )}
                    {project.links.paper && (
                      <a 
                        href={project.links.paper} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-ghost"
                      >
                        Research Paper
                      </a>
                    )}
                    {project.links.api && (
                      <a 
                        href={project.links.api} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-ghost"
                      >
                        API Docs
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View All Projects Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <button 
              onClick={() => window.open('/projects.html', '_blank')}
              className="btn-primary inline-flex items-center gap-2 group"
            >
              View All Projects
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M7 17l9.2-9.2M17 17V7H7"/>
              </svg>
            </button>
            <p className="text-caption text-text-muted mt-4">
              Explore my complete portfolio of 17+ projects across AI, machine learning, full-stack development, and research
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />
    </motion.div>
  );
};

export default App;