/**
 * Main JavaScript file for Portfolio Website
 * Handles navigation, smooth scrolling, and basic interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initMobileMenu();
    initContactForm();
    initScrollEffects();
    
    // Initialize animations after a short delay
    setTimeout(() => {
        initAnimations();
    }, 100);
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            navToggle.setAttribute('aria-expanded', !isActive);
            navMenu.setAttribute('aria-hidden', isActive);
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
                navToggle.focus();
            }
        });
    }
}

/**
 * Contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification messages
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#10B981';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#EF4444';
    } else {
        notification.style.backgroundColor = '#3B82F6';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

/**
 * Scroll effects and parallax
 */
function initScrollEffects() {
    // Parallax effect for hero section
    const heroShape = document.querySelector('.hero-shape');
    
    if (heroShape) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroShape.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.1}deg)`;
        });
    }
    
    // Scroll indicator visibility
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

/**
 * Initialize animations (called after DOM is ready)
 */
function initAnimations() {
    // Check if anime.js v4 is loaded
    if (typeof anime === 'undefined') {
        console.warn('Anime.js not loaded. Animations will be disabled.');
        return;
    }
    
    // Check for anime.js v4 features
    if (typeof anime !== 'undefined') {
        console.log('Anime.js v3 detected. Using advanced features.');
        // Advanced animations will be handled by advanced-animations.js
    } else {
        console.log('Using anime.js v3 fallback animations.');
        // Initialize fallback animations
        initPageLoadAnimations();
        initScrollAnimations();
        initInteractiveAnimations();
    }
}

// Also listen for the animeLoaded event
window.addEventListener('animeLoaded', function() {
    console.log('Anime.js v4 loaded via event. Re-initializing animations.');
    initAnimations();
});

/**
 * Page load animations
 */
function initPageLoadAnimations() {
    // Navigation items stagger animation
    anime({
        targets: '.nav-item',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeOutQuart'
    });
    
    // Hero content animation
    anime({
        targets: '.hero-name',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 200,
        easing: 'easeOutQuart'
    });
    
    anime({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: 400,
        easing: 'easeOutQuart'
    });
    
    anime({
        targets: '.hero-description',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: 600,
        easing: 'easeOutQuart'
    });
    
    anime({
        targets: '.hero-buttons',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: 800,
        easing: 'easeOutQuart'
    });
    
    // Hero shape animation
    anime({
        targets: '.hero-shape',
        opacity: [0, 1],
        scale: [0.5, 1],
        rotate: [180, 0],
        duration: 1000,
        delay: 1000,
        easing: 'easeOutElastic(1, .8)'
    });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Animate section headers
                if (element.classList.contains('section-header')) {
                    anime({
                        targets: element.querySelector('.section-title'),
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        easing: 'easeOutQuart'
                    });
                    
                    anime({
                        targets: element.querySelector('.section-subtitle'),
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 600,
                        delay: 200,
                        easing: 'easeOutQuart'
                    });
                }
                
                // Animate about content
                if (element.classList.contains('about-content')) {
                    anime({
                        targets: element.querySelectorAll('.about-paragraph'),
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 600,
                        delay: anime.stagger(200),
                        easing: 'easeOutQuart'
                    });
                    
                    anime({
                        targets: element.querySelectorAll('.stat-item'),
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 600,
                        delay: anime.stagger(100, {start: 400}),
                        easing: 'easeOutQuart'
                    });
                }
                
                // Animate skill categories
                if (element.classList.contains('skill-category')) {
                    anime({
                        targets: element.querySelectorAll('.skill-item'),
                        opacity: [0, 1],
                        translateX: [-30, 0],
                        duration: 600,
                        delay: anime.stagger(100),
                        easing: 'easeOutQuart'
                    });
                    
                    // Animate skill bars
                    setTimeout(() => {
                        const skillBars = element.querySelectorAll('.skill-progress');
                        skillBars.forEach(bar => {
                            const width = bar.getAttribute('data-width');
                            anime({
                                targets: bar,
                                width: `${width}%`,
                                duration: 1500,
                                easing: 'easeOutQuart'
                            });
                        });
                    }, 300);
                }
                
                // Animate project cards
                if (element.classList.contains('projects-grid')) {
                    anime({
                        targets: element.querySelectorAll('.project-card'),
                        opacity: [0, 1],
                        translateY: [30, 0],
                        scale: [0.95, 1],
                        duration: 600,
                        delay: anime.stagger(100),
                        easing: 'easeOutQuart'
                    });
                }
                
                // Animate timeline items
                if (element.classList.contains('timeline-item')) {
                    anime({
                        targets: element.querySelector('.timeline-marker'),
                        opacity: [0, 1],
                        scale: [0, 1],
                        duration: 400,
                        easing: 'easeOutElastic(1, .8)'
                    });
                    
                    anime({
                        targets: element.querySelector('.timeline-content'),
                        opacity: [0, 1],
                        translateX: [-30, 0],
                        duration: 600,
                        delay: 200,
                        easing: 'easeOutQuart'
                    });
                }
                
                // Animate contact form
                if (element.classList.contains('contact-form')) {
                    anime({
                        targets: element.querySelectorAll('.form-group'),
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 600,
                        delay: anime.stagger(100),
                        easing: 'easeOutQuart'
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and elements that need animation
    const elementsToObserve = document.querySelectorAll(
        '.section-header, .about-content, .skill-category, .projects-grid, .project-card, .timeline-item, .contact-form'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Interactive animations
 */
function initInteractiveAnimations() {
    // Button hover animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
    
    // Project card hover animations
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
    
    // Form input focus animations
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            anime({
                targets: input,
                scale: 1.02,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        input.addEventListener('blur', () => {
            anime({
                targets: input,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
    
    // Skill item hover animations
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
}

/**
 * Utility function to check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Utility function to debounce function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other modules
window.PortfolioAnimations = {
    initAnimations,
    initPageLoadAnimations,
    initScrollAnimations,
    initInteractiveAnimations,
    showNotification
};
