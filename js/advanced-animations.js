/**
 * Advanced Anime.js v4 Animations
 * Implements sophisticated text splitting, high-performance animations, and timeline sequences
 */

// Wait for DOM and anime.js v4 to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if anime.js is already loaded
    if (typeof anime !== 'undefined') {
        console.log('Anime.js v3 detected. Initializing advanced animations.');
        initAdvancedV4Animations();
    } else {
        // Wait for the custom animeLoaded event
        window.addEventListener('animeLoaded', function() {
            console.log('Anime.js v3 loaded via event. Initializing advanced animations.');
            initAdvancedV4Animations();
        });
        
        // Fallback timeout
        setTimeout(() => {
            if (typeof anime !== 'undefined') {
                console.log('Anime.js v3 detected via timeout. Initializing advanced animations.');
                initAdvancedV4Animations();
            } else {
                console.warn('Anime.js v3 not loaded. Advanced animations will be disabled.');
            }
        }, 1000);
    }
});

/**
 * Initialize all advanced anime.js v4 animations
 */
function initAdvancedV4Animations() {
    initTextSplitAnimations();
    initAdvancedTextReveals();
    initScrollTriggeredAnimations();
    initPerformanceOptimizations();
    initMorphingEffects();
}

/**
 * Text split animations using anime.js v4 text splitting
 */
function initTextSplitAnimations() {
    // Hero name character-by-character animation
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        // Split text into characters
        const textContent = heroName.textContent;
        heroName.innerHTML = '';
        
        // Create character spans
        for (let i = 0; i < textContent.length; i++) {
            const char = textContent[i];
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(-100%)';
            heroName.appendChild(span);
        }
        
        // Animate characters with stagger using anime.js v3
        const chars = heroName.querySelectorAll('span');
        anime({
            targets: chars,
            translateY: ['-100%', '0%'],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(50),
            easing: 'easeOutQuart'
        });
    }
    
    // Hero subtitle word-by-word animation
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const words = heroSubtitle.textContent.split(' ');
        heroSubtitle.innerHTML = '';
        
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word;
            wordSpan.style.display = 'inline-block';
            wordSpan.style.opacity = '0';
            wordSpan.style.transform = 'translateY(30px)';
            wordSpan.style.marginRight = '0.5em';
            heroSubtitle.appendChild(wordSpan);
        });
        
        const wordSpans = heroSubtitle.querySelectorAll('span');
        anime({
            targets: wordSpans,
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 500,
            delay: anime.stagger(100),
            easing: 'easeOutQuart'
        });
    }
}

/**
 * High-performance animations using anime.js v3
 */
function initHighPerformanceAnimations() {
    // Portfolio grid items with intersection observer
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    anime({
                        targets: card,
                        scale: [0.8, 1],
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 600,
                        easing: 'easeOutQuart'
                    });
                }
            });
        }, { threshold: 0.1 });
        
        projectCards.forEach(card => observer.observe(card));
    }
    
    // Skills section with stagger from center
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: skillItems,
                        translateY: ['-2rem', '0'],
                        opacity: [0, 1],
                        duration: 400,
                        delay: anime.stagger(50, { from: 'center' }),
                        easing: 'easeOutQuart'
                    });
                    
                    // Animate skill bars after items appear
                    setTimeout(() => {
                        skillItems.forEach((item, index) => {
                            const progressBar = item.querySelector('.skill-progress');
                            if (progressBar) {
                                const targetWidth = progressBar.getAttribute('data-width');
                                anime({
                                    targets: progressBar,
                                    width: `${targetWidth}%`,
                                    duration: 1500,
                                    delay: index * 100,
                                    easing: 'easeOutQuart'
                                });
                            }
                        });
                    }, 200);
                }
            });
        }, { threshold: 0.1 });
        
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) observer.observe(skillsSection);
    }
}

/**
 * Advanced text reveals with line-by-line animations
 */
function initAdvancedTextReveals() {
    // Section headings with line-by-line reveal
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        const words = title.textContent.split(' ');
        title.innerHTML = '';
        
        // Create word spans
        words.forEach(word => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word;
            wordSpan.style.display = 'inline-block';
            wordSpan.style.opacity = '0';
            wordSpan.style.transform = 'translateY(100%)';
            wordSpan.style.marginRight = '0.3em';
            title.appendChild(wordSpan);
        });
        
        // Animate with stagger using anime.js v4
        const wordSpans = title.querySelectorAll('span');
        anime({
            targets: wordSpans,
            translateY: ['100%', '0%'],
            opacity: [0, 1],
            duration: 500,
            delay: anime.stagger(100),
            easing: 'easeOutQuart'
        });
    });
    
    // About paragraphs with line-by-line reveal
    const aboutParagraphs = document.querySelectorAll('.about-paragraph');
    aboutParagraphs.forEach((paragraph, index) => {
        const text = paragraph.textContent;
        const lines = text.split(/(?<=\.)\s+/); // Split at sentence endings
        
        paragraph.innerHTML = '';
        
        lines.forEach(line => {
            const lineDiv = document.createElement('div');
            lineDiv.textContent = line.trim();
            lineDiv.style.opacity = '0';
            lineDiv.style.transform = 'translateX(-30px)';
            lineDiv.style.marginBottom = '0.5em';
            paragraph.appendChild(lineDiv);
        });
        
        const lineElements = paragraph.querySelectorAll('div');
        anime({
            targets: lineElements,
            translateX: ['-30px', '0'],
            opacity: [0, 1],
            duration: 400,
            delay: anime.stagger(150),
            easing: 'easeOutQuart'
        });
    });
}

/**
 * Scroll-triggered animations with advanced stagger patterns
 */
function initScrollTriggeredAnimations() {
    // Timeline items with complex stagger
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const marker = item.querySelector('.timeline-marker');
                    const content = item.querySelector('.timeline-content');
                    
                    // Animate marker first using anime.js v3
                    anime({
                        targets: marker,
                        scale: [0, 1],
                        opacity: [0, 1],
                        duration: 400,
                        easing: 'easeOutElastic(1, .8)'
                    });
                    
                    // Then animate content
                    anime({
                        targets: content,
                        translateX: ['-50px', '0'],
                        opacity: [0, 1],
                        duration: 600,
                        delay: 200,
                        easing: 'easeOutQuart'
                    });
                }
            });
        }, { threshold: 0.1 });
        
        timelineItems.forEach(item => observer.observe(item));
    }
    
    // Contact form with field-by-field animation
    const formGroups = document.querySelectorAll('.form-group');
    if (formGroups.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: formGroups,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        duration: 500,
                        delay: anime.stagger(100),
                        easing: 'easeOutQuart'
                    });
                }
            });
        }, { threshold: 0.1 });
        
        const contactSection = document.querySelector('.contact');
        if (contactSection) observer.observe(contactSection);
    }
}

/**
 * Performance optimizations using anime.js v4 features
 */
function initPerformanceOptimizations() {
    // Use WAAPI for high-performance animations
    const heroShape = document.querySelector('.hero-shape');
    if (heroShape) {
        // Continuous subtle animation using anime.js v3
        anime({
            targets: heroShape,
            rotate: [0, 360],
            duration: 20000,
            easing: 'linear',
            loop: true
        });
        
        // Hover effects using anime.js v3
        heroShape.addEventListener('mouseenter', () => {
            anime({
                targets: heroShape,
                scale: 1.1,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        heroShape.addEventListener('mouseleave', () => {
            anime({
                targets: heroShape,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    }
    
    // Optimize scroll animations with throttling
    let ticking = false;
    function updateScrollAnimations() {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for hero shape
        if (heroShape) {
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
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * Create complex timeline sequences using anime.js v4
 */
function createComplexTimeline() {
    const timeline = anime.timeline({
        easing: 'easeOutQuart',
        duration: 2000
    });
    
    // Hero section timeline
    timeline
        .add({
            targets: '.hero-name',
            opacity: [0, 1],
            duration: 800
        })
        .add({
            targets: '.hero-subtitle',
            opacity: [0, 1],
            duration: 600
        }, '-=400')
        .add({
            targets: '.hero-description',
            opacity: [0, 1],
            duration: 600
        }, '-=300')
        .add({
            targets: '.hero-buttons',
            opacity: [0, 1],
            duration: 600
        }, '-=200')
        .add({
            targets: '.hero-shape',
            scale: [0, 1],
            rotate: [180, 0],
            duration: 1000,
            easing: 'easeOutElastic(1, .8)'
        }, '-=400');
    
    return timeline;
}

/**
 * Advanced morphing effects using anime.js v4
 */
function initMorphingEffects() {
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
                scale: 1.02,
                duration: 400,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                borderRadius: ['20px', '12px'],
                scale: 1,
                duration: 400,
                easing: 'easeOutQuart'
            });
        });
    });
}

/**
 * Initialize morphing effects
 */
initMorphingEffects();

// Export advanced animation functions
window.AdvancedV4Animations = {
    initAdvancedV4Animations,
    createComplexTimeline,
    initTextSplitAnimations,
    initHighPerformanceAnimations
};
