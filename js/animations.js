/**
 * Advanced Animations JavaScript file
 * Implements sophisticated anime.js animations including stagger, timeline, and morphing effects
 */

// Wait for DOM and anime.js to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for anime.js to be available
    if (typeof anime !== 'undefined') {
        initAdvancedAnimations();
    } else {
        // Retry after a short delay if anime.js isn't loaded yet
        setTimeout(() => {
            if (typeof anime !== 'undefined') {
                initAdvancedAnimations();
            } else {
                console.warn('Anime.js not loaded. Advanced animations will be disabled.');
            }
        }, 100);
    }
});

// Also listen for the animeLoaded event
window.addEventListener('animeLoaded', function() {
    console.log('Anime.js loaded via event. Initializing advanced animations.');
    initAdvancedAnimations();
});

/**
 * Initialize all advanced animations
 */
function initAdvancedAnimations() {
    initTextAnimations();
    initStaggerAnimations();
    initTimelineAnimations();
    initMorphingAnimations();
    initScrollTriggeredAnimations();
    initMicroInteractions();
    initPerformanceOptimizations();
}

/**
 * Text reveal animations with letter-by-letter and word-by-word effects
 */
function initTextAnimations() {
    // Hero title typewriter effect
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.borderRight = '2px solid #D2691E';
        
        anime({
            targets: heroName,
            duration: 2000,
            update: function(anim) {
                const progress = Math.floor(anim.progress * text.length);
                heroName.textContent = text.substring(0, progress);
            },
            complete: function() {
                heroName.style.borderRight = 'none';
            }
        });
    }
    
    // Section titles word-by-word reveal
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        const words = title.textContent.split(' ');
        title.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
        
        const wordElements = title.querySelectorAll('.word');
        anime({
            targets: wordElements,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: anime.stagger(100),
            easing: 'easeOutQuart'
        });
    });
    
    // About paragraphs line-by-line reveal
    const aboutParagraphs = document.querySelectorAll('.about-paragraph');
    aboutParagraphs.forEach(paragraph => {
        const lines = paragraph.innerHTML.split('<br>');
        if (lines.length > 1) {
            paragraph.innerHTML = lines.map(line => `<div class="line">${line}</div>`).join('');
            
            const lineElements = paragraph.querySelectorAll('.line');
            anime({
                targets: lineElements,
                opacity: [0, 1],
                translateX: [-20, 0],
                duration: 500,
                delay: anime.stagger(150),
                easing: 'easeOutQuart'
            });
        }
    });
}

/**
 * Stagger animations for grids and lists
 */
function initStaggerAnimations() {
    // Skills grid stagger animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, categoryIndex) => {
        const skillItems = category.querySelectorAll('.skill-item');
        
        // Stagger the skill items
        anime({
            targets: skillItems,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: anime.stagger(100, {start: categoryIndex * 200}),
            easing: 'easeOutQuart'
        });
        
        // Animate skill bars with stagger
        setTimeout(() => {
            skillItems.forEach((item, itemIndex) => {
                const progressBar = item.querySelector('.skill-progress');
                const targetWidth = progressBar.getAttribute('data-width');
                
                anime({
                    targets: progressBar,
                    width: `${targetWidth}%`,
                    duration: 1500,
                    delay: itemIndex * 100,
                    easing: 'easeOutQuart'
                });
            });
        }, 300);
    });
    
    // Project cards stagger animation
    const projectCards = document.querySelectorAll('.project-card');
    anime({
        targets: projectCards,
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: anime.stagger(150),
        easing: 'easeOutElastic(1, .8)'
    });
    
    // Timeline items stagger animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    anime({
        targets: timelineItems,
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 600,
        delay: anime.stagger(200),
        easing: 'easeOutQuart'
    });
    
    // Tech tags stagger animation
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
        anime({
            targets: tag,
            opacity: [0, 1],
            scale: [0, 1],
            duration: 400,
            delay: index * 50,
            easing: 'easeOutElastic(1, .8)'
        });
    });
}

/**
 * Timeline sequences for complex multi-element animations
 */
function initTimelineAnimations() {
    // Hero section timeline
    const heroTimeline = anime.timeline({
        easing: 'easeOutQuart',
        duration: 2000
    });
    
    heroTimeline
        .add({
            targets: '.hero-name',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800
        })
        .add({
            targets: '.hero-subtitle',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600
        }, '-=400')
        .add({
            targets: '.hero-description',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600
        }, '-=300')
        .add({
            targets: '.hero-buttons',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600
        }, '-=200')
        .add({
            targets: '.hero-shape',
            opacity: [0, 1],
            scale: [0, 1],
            rotate: [180, 0],
            duration: 1000,
            easing: 'easeOutElastic(1, .8)'
        }, '-=400');
    
    // About section timeline
    const aboutTimeline = anime.timeline({
        easing: 'easeOutQuart',
        duration: 1500
    });
    
    aboutTimeline
        .add({
            targets: '.about-paragraph',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: anime.stagger(200)
        })
        .add({
            targets: '.stat-item',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 600,
            delay: anime.stagger(100)
        }, '-=300');
    
    // Contact form timeline
    const contactTimeline = anime.timeline({
        easing: 'easeOutQuart',
        duration: 1200
    });
    
    contactTimeline
        .add({
            targets: '.contact-info',
            opacity: [0, 1],
            translateX: [-30, 0],
            duration: 600
        })
        .add({
            targets: '.contact-form',
            opacity: [0, 1],
            translateX: [30, 0],
            duration: 600
        }, '-=300')
        .add({
            targets: '.form-group',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 400,
            delay: anime.stagger(100)
        }, '-=200');
}

/**
 * Morphing effects for shape transitions
 */
function initMorphingAnimations() {
    // Hero shape morphing animation
    const heroShape = document.querySelector('.hero-shape');
    if (heroShape) {
        // Continuous subtle morphing
        setInterval(() => {
            anime({
                targets: heroShape,
                borderRadius: ['50%', '30%', '50%'],
                duration: 3000,
                easing: 'easeInOutSine'
            });
        }, 5000);
        
        // Hover morphing effect
        heroShape.addEventListener('mouseenter', () => {
            anime({
                targets: heroShape,
                scale: 1.1,
                borderRadius: '20%',
                duration: 500,
                easing: 'easeOutQuart'
            });
        });
        
        heroShape.addEventListener('mouseleave', () => {
            anime({
                targets: heroShape,
                scale: 1,
                borderRadius: '50%',
                duration: 500,
                easing: 'easeOutQuart'
            });
        });
    }
    
    // Button morphing effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                borderRadius: ['8px', '20px'],
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                borderRadius: ['20px', '8px'],
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
    
    // Project card morphing
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                borderRadius: ['12px', '20px'],
                duration: 400,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                borderRadius: ['20px', '12px'],
                duration: 400,
                easing: 'easeOutQuart'
            });
        });
    });
}

/**
 * Scroll-triggered animations with intersection observer
 */
function initScrollTriggeredAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Skills section animation
                if (element.classList.contains('skills-grid')) {
                    const skillCategories = element.querySelectorAll('.skill-category');
                    skillCategories.forEach((category, index) => {
                        anime({
                            targets: category,
                            opacity: [0, 1],
                            translateY: [50, 0],
                            duration: 800,
                            delay: index * 200,
                            easing: 'easeOutQuart'
                        });
                    });
                }
                
                // Projects section animation
                if (element.classList.contains('projects-grid')) {
                    const projectCards = element.querySelectorAll('.project-card');
                    projectCards.forEach((card, index) => {
                        anime({
                            targets: card,
                            opacity: [0, 1],
                            translateY: [50, 0],
                            rotateY: [45, 0],
                            duration: 800,
                            delay: index * 150,
                            easing: 'easeOutQuart'
                        });
                    });
                }
                
                // Timeline animation
                if (element.classList.contains('timeline')) {
                    const timelineItems = element.querySelectorAll('.timeline-item');
                    timelineItems.forEach((item, index) => {
                        anime({
                            targets: item.querySelector('.timeline-marker'),
                            opacity: [0, 1],
                            scale: [0, 1],
                            duration: 400,
                            delay: index * 200,
                            easing: 'easeOutElastic(1, .8)'
                        });
                        
                        anime({
                            targets: item.querySelector('.timeline-content'),
                            opacity: [0, 1],
                            translateX: [-50, 0],
                            duration: 600,
                            delay: index * 200 + 200,
                            easing: 'easeOutQuart'
                        });
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll(
        '.skills-grid, .projects-grid, .timeline, .contact-content'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Micro-interactions and hover effects
 */
function initMicroInteractions() {
    // Navigation link hover effects
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                color: '#D2691E',
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                anime({
                    targets: link,
                    color: '#5f6368',
                    duration: 200,
                    easing: 'easeOutQuart'
                });
            }
        });
    });
    
    // Skill item micro-interactions
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            anime({
                targets: item,
                translateX: 10,
                duration: 300,
                easing: 'easeOutQuart'
            });
            
            anime({
                targets: item.querySelector('.skill-name'),
                color: '#D2691E',
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            anime({
                targets: item,
                translateX: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
            
            anime({
                targets: item.querySelector('.skill-name'),
                color: '#3c4043',
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
    
    // Project card micro-interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -10,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuart'
            });
            
            anime({
                targets: card.querySelector('.project-icon'),
                scale: 1.1,
                rotate: 5,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuart'
            });
            
            anime({
                targets: card.querySelector('.project-icon'),
                scale: 1,
                rotate: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
    
    // Form input micro-interactions
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            anime({
                targets: input,
                scale: 1.02,
                borderColor: '#D2691E',
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        input.addEventListener('blur', () => {
            anime({
                targets: input,
                scale: 1,
                borderColor: '#e8eaed',
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
}

/**
 * Performance optimizations
 */
function initPerformanceOptimizations() {
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollAnimations() {
        // Update parallax effects
        const heroShape = document.querySelector('.hero-shape');
        if (heroShape) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroShape.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.05}deg)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollAnimations);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Preload critical animations
    const criticalElements = document.querySelectorAll('.hero-name, .hero-subtitle, .nav-item');
    criticalElements.forEach(element => {
        element.style.willChange = 'transform, opacity';
    });
    
    // Clean up will-change after animations complete
    setTimeout(() => {
        criticalElements.forEach(element => {
            element.style.willChange = 'auto';
        });
    }, 3000);
}

/**
 * Custom easing functions for unique animation feels
 */
const customEasing = {
    // Smooth bounce with less intensity
    smoothBounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    
    // Elastic with controlled overshoot
    controlledElastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    
    // Smooth ease with slight anticipation
    anticipatedEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    
    // Quick snap for micro-interactions
    quickSnap: 'cubic-bezier(0.4, 0, 0.2, 1)'
};

/**
 * Utility function for creating complex animation sequences
 */
function createAnimationSequence(elements, options = {}) {
    const defaultOptions = {
        duration: 600,
        delay: 0,
        easing: 'easeOutQuart',
        stagger: 100
    };
    
    const config = { ...defaultOptions, ...options };
    
    return anime({
        targets: elements,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: config.duration,
        delay: anime.stagger(config.stagger, {start: config.delay}),
        easing: config.easing
    });
}

/**
 * Advanced scroll-based parallax effects
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    let ticking = false;
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
}

// Initialize parallax effects
initParallaxEffects();

// Export advanced animation functions
window.AdvancedAnimations = {
    initAdvancedAnimations,
    createAnimationSequence,
    customEasing
};
