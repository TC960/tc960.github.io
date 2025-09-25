// Simple smooth scrolling without anime.js for better compatibility
export const smoothScrollTo = (targetId, offset = 0) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};

export const createScrollReveal = (selector, options = {}) => {
  const elements = document.querySelectorAll(selector);
  
  // Create intersection observer for scroll-triggered animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Use CSS classes for animations instead of anime.js
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = `all 0.8s ease-out ${index * 0.1}s`;
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  // Set initial state
  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });

  return observer;
};

export const createSkillBarAnimations = () => {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate skill bar width with CSS
          entry.target.style.width = '100%';
          entry.target.style.transition = 'width 1.2s ease-out';
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3
    }
  );

  // Set initial state
  skillBars.forEach((bar) => {
    bar.style.width = '0%';
    observer.observe(bar);
  });

  return observer;
};

export const createHoverAnimations = () => {
  // Enhanced button hover effects with CSS
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-ghost');
  
  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.02)';
      button.style.transition = 'transform 0.2s ease-out';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
  });

  // Card hover effects
  const cards = document.querySelectorAll('.card, .card-elevated');
  
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.transition = 'transform 0.3s ease-out';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
};