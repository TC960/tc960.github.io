import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";
import Navigation from "./Navigation";
import BackgroundAnimation from "./BackgroundAnimation";
import ResumeButton from "./ResumeButton";
import ProjectCard from "./ProjectCard";
import AboutCarousel from "./AboutCarousel";
import MarqueeSkills from "./MarqueeSkills";
import { createScrollReveal, createHoverAnimations, createSkillBarAnimations, smoothScrollTo } from "../utils/smoothScroll";

const Home = () => {
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
                className="space-y-8 pt-8 lg:pt-0 flex flex-col items-center lg:items-center"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="flex flex-col gap-6 w-full">
                  <h3 className="text-display text-lg text-text-primary text-center">Connect with me</h3>
                  <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/mohakap/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-mono-gray-200 text-text-secondary hover:text-accent-orange hover:border-accent-orange transition-all duration-300"
                      aria-label="LinkedIn Profile"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>

                    {/* GitHub */}
                    <a
                      href="https://github.com/tc960"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-mono-gray-200 text-text-secondary hover:text-accent-orange hover:border-accent-orange transition-all duration-300"
                      aria-label="GitHub Profile"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="text-sm font-medium">GitHub</span>
                    </a>

                    {/* DevPost */}
                    <a
                      href="https://devpost.com/mprakash?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-mono-gray-200 text-text-secondary hover:text-accent-orange hover:border-accent-orange transition-all duration-300"
                      aria-label="DevPost Profile"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853H10.112z"/>
                      </svg>
                      <span className="text-sm font-medium">DevPost</span>
                    </a>

                    {/* Resume - Split Button */}
                    <ResumeButton />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutCarousel />

      {/* Skills Section */}
      <MarqueeSkills />

      {/* Research Teaser Section */}
      <section id="research" className="section bg-background-secondary">
        <div className="container-medium">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display mb-6">Research</h2>
            <p className="text-body max-w-2xl mx-auto mb-8">
              Exploring the frontiers of AI, NLP, and human-computer interaction through academic research at UC San Diego labs
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-4 py-2 bg-accent-orange/10 text-accent-orange rounded-full text-sm font-medium">Knight Lab</span>
              <span className="px-4 py-2 bg-accent-orange/10 text-accent-orange rounded-full text-sm font-medium">ProtoLab</span>
              <span className="px-4 py-2 bg-accent-orange/10 text-accent-orange rounded-full text-sm font-medium">MOSAIC Lab</span>
            </div>

            <Link
              to="/research"
              className="btn-primary inline-flex items-center gap-2 group"
            >
              View Research
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
            </Link>
          </motion.div>
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
                date: "Sep 2025 - Jan 2026",
                title: "Undergraduate Research Assistant",
                company: "ProtoLab, UC San Diego Design Lab",
                location: "San Diego, California, United States • On-site",
                type: "Part-time",
                description: "Built audio processing pipeline with pyannote.ai + Whisper Large V3, optimized on A100 GPU (40% faster). Designed multi-agent conversational AI for mock interviews with configurable personas. Achieved 60-70% latency reduction through parallel processing pipeline. Compared OpenAI models, open-source LLMs + 11Labs, and NVIDIA ACE framework."
              },
              {
                date: "Feb 2025 - Present",
                title: "Undergraduate Research Assistant",
                company: "Knight Lab, UC San Diego",
                location: "La Jolla, California, United States • On-site",
                type: "Part-time",
                description: "Building full research pipeline: scraping ~2000 articles, NER/RE script for data extraction, Knowledge Graph for microbiology research. Automated Python data collection pipelines with Google Sheets API, 99%+ accuracy on 2000+ studies. Built bash-based automation scripts for sample metadata extraction used across all lab subdivisions."
              },
              {
                date: "Oct 2025 - Present",
                title: "EMG Translator Project Lead",
                company: "Triton NeuroTech",
                location: "La Jolla, California, United States • On-site",
                type: "Extracurricular",
                description: "Leading team of 11 engineers building wearable EMG system translating ASL gestures to text/speech. Managing two tracks: Interface/Dashboard team (ML inference, visualization) and Portable Speech team (Arduino/ESP32, audio synthesis). Full data pipeline from OpenBCI Ganglion signal acquisition to model deployment."
              },
              {
                date: "Oct 2025 - Present",
                title: "Lead Board Member",
                company: "DS3 UCSD - DataHacks Board",
                location: "La Jolla, California, United States • On-site",
                type: "Extracurricular",
                description: "Organizing data science hackathons and programming competitions. Handling logistics for university-wide events."
              },
              {
                date: "Jun 2025 - Sep 2025",
                title: "FRAC Intern",
                company: "EXL",
                location: "La Jolla, California, United States",
                type: "Full-time",
                description: "Contributing to development of RiskXpert, an Agentic AI tool for automated insurance and risk analysis, focusing on risk assessment frameworks and control identification methodologies. Analyzing risk descriptions and implementing control mechanisms to enhance automated risk evaluation processes. Collaborating on AI/ML-driven risk assessment to streamline insurance underwriting through automation. Conducted an in-depth case study on potential OCR tool suggestions to be incorporated with the tool, ranging from on-the-fly SoTA methods, to from-the-ground-up approaches, comparing metrics like computational cost, efficiency and financial impact."
              },
              {
                date: "Mar 2025 - Aug 2025",
                title: "Tutor",
                company: "Halıcıoğlu Data Science Institute, UC San Diego",
                location: "La Jolla • On-site",
                type: "Part-time",
                description: "Provided tutoring support for DSC 40A (Kyle M. Shannon: SP24) and DSC 20 (Brendan Tomoschuk: SA1 25), helping students understand fundamental concepts in data science and programming.",
                skills: "Teaching • Data Science • Python Programming"
              },
              {
                date: "Aug 2024 - Sep 2024",
                title: "Computer Science and AI Intern",
                company: "300plus Consulting Services",
                location: "Dwarka, Delhi, India • On-site",
                type: "Internship",
                description: "Developed a software integrated into interviews for better analysis of the candidate. Leveraged python and its libraries to convert video data to text, followed by deploying LLMs and GenAI to evaluate answer relevance, scoring responses based on fluency, coherence, and technical accuracy. Currently working on developing an integrated solution with a built-in plagiarism checker to verify answer authenticity and prevent AI-generated or internet-copied content.",
                skills: "LLMs • LangChain • Application Programming Interfaces (API) • Ffmpeg • Prompt Engineering"
              },
              {
                date: "Jun 2024 - Sep 2024",
                title: "AI & ML Intern",
                company: "Indian Institute of Technology, Guwahati",
                location: "Gurugram, Haryana, India • Remote",
                type: "Internship",
                description: "Worked on developing and evaluating Spiking Neural Networks (SNNs) to improve real-time pattern recognition and object detection compared to traditional Artificial Neural Networks (ANNs). Designed and optimized various SNN architectures, tuning parameters for enhanced performance. Evaluated models using metrics like accuracy, precision, and F1-score, addressing challenges in training and encoding.",
                skills: "Artificial Intelligence (AI) • Spiking Neural Networks (SNN)"
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
                      {item.location && (
                        <p className="text-caption text-text-muted">{item.location}</p>
                      )}
                      {item.type && (
                        <span className="inline-block px-3 py-1 bg-mono-gray-100 text-text-muted text-sm rounded-full">
                          {item.type}
                        </span>
                      )}
                    </div>
                    <p className="text-body leading-relaxed">{item.description}</p>
                    {item.skills && (
                      <div className="pt-2">
                        <p className="text-caption text-accent-orange font-medium mb-2">Skills:</p>
                        <p className="text-body text-sm">{item.skills}</p>
                      </div>
                    )}
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

          {/* View All Projects Button - Above Cards */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              to="/projects"
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
            </Link>
            <p className="text-caption text-text-muted mt-3">
              Explore my complete portfolio of 20+ projects
            </p>
          </motion.div>

          {/* Featured Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 items-stretch">
            {[
              {
                id: 'clueless',
                title: "Clueless",
                categoryDisplay: "AI/Developer Tools",
                description: "AI-powered web navigation assistant that automatically maps web applications into Neo4j knowledge graph and provides voice/text-based guidance. Built multi-agent backend with Claude for intent classification, Pinecone + Sentence Transformers for semantic RAG, and Cerebras for accelerated reasoning.",
                tech: ["Neo4j", "Claude", "Pinecone", "React", "TypeScript", "RAG", "Voice AI"],
                year: 2025,
                award: "Winner @ HackMIT '25",
                links: {
                  demo: "#",
                  code: "#"
                }
              },
              {
                id: 'taxdaddy',
                title: "TaxDaddy",
                categoryDisplay: "AI/Web Application",
                description: "Multi-agentic real-time voice tax assistant using WebSockets and Twilio integration. Implemented RAG-based system with Pinecone VectorDB for tax guidance, OCR document processing with PyPDF and MongoDB for automated form completion, fraud detection using Benford's Law analysis.",
                tech: ["React", "MongoDB", "OCR", "Twilio", "Pinecone", "RAG", "WebSockets"],
                year: 2025,
                award: "Winner @ Hacklytics '25",
                links: {
                  demo: "#",
                  code: "#"
                }
              },
              {
                id: 'few-words',
                title: "Few Words Do Trick",
                categoryDisplay: "EEG-assisted Speech Aid",
                description: "Assistive communication platform for speech impediments combining real-time EEG emotion classification (Fourier Transforms, PSD analysis, ICA, PCA, Random Forest achieving 90% accuracy) with MBTI personality modeling to generate context-aware, emotionally nuanced speech.",
                tech: ["EEG", "GPT-5", "ElevenLabs", "FastAPI", "React", "Signal Processing", "Random Forest"],
                year: 2025,
                award: "Winner @ CalHacks '25",
                links: {
                  devpost: "https://devpost.com/software/why-waste-time-say-lot-word-when-few-word-do-trick",
                  demo: "https://www.youtube.com/watch?v=MEH357zinV4&t=1s"
                }
              }
            ].map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />
    </motion.div>
  );
};

export default Home;
