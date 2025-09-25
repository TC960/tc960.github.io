# State-of-the-Art Minimalistic Portfolio Website

A modern, clean, and minimalistic portfolio website built with vanilla HTML, CSS, and JavaScript, featuring sophisticated anime.js animations and a professional greyscale + orange color scheme.

## 🎨 Design Features

### Color Scheme
- **Primary**: Greyscale palette (whites, light greys, dark greys, charcoal, black)
- **Accent Color**: Rustic orange (#D2691E) - used sparingly for highlights, buttons, links, and key interactive elements
- **Typography**: 
  - **Comfortaa Bold** for headings, name, hero text
  - **Antic Slab** for body text, descriptions, captions

### Layout & Structure
- Single-page application with smooth scrolling sections
- Responsive design (mobile-first approach)
- Generous white space and minimal visual clutter
- Grid-based layout with clean alignment
- Modern card-based components

## 🚀 Sections Included

1. **Hero Section** - Name, title, brief tagline with animated entrance
2. **About** - Short bio with animated text reveals and statistics
3. **Skills/Expertise** - Interactive skill bars with stagger animations
4. **Projects/Portfolio** - Grid layout with hover animations and project cards
5. **Experience/Timeline** - Animated timeline with experience cards
6. **Contact** - Clean contact form with animated interactions

## ✨ Animation Features

### Anime.js v4.1.0 Integration
- **Text Split Animations**: Character-by-character and word-by-word reveals using advanced text splitting
- **ES Module API**: Modern modular approach with tree-shaking for optimal performance
- **Advanced Text Reveals**: Line-by-line text animations with sophisticated stagger patterns
- **Scroll-Triggered Animations**: Section reveals with stagger from center, skill bars, timeline sequences
- **Interactive Animations**: Hover effects, button morphing, form field focus animations
- **Timeline Sequences**: Complex multi-element animations using createTimeline()
- **Performance Optimized**: Hardware-accelerated animations with improved tween composition

### Specific Animations Implemented
- Portfolio grid items: staggered entrance with scale and opacity
- Skill indicators: progress bar animations from 0 to target percentage
- Text blocks: line-by-line and word-by-word reveals
- Contact form: field highlight animations and submit button morphing
- Navigation: smooth underline animations for active states

## 🛠️ Technical Stack

- **HTML5** with semantic markup and accessibility features
- **CSS3** with modern features (Grid, Flexbox, CSS Variables)
- **Vanilla JavaScript** with anime.js library
- **Anime.js v4.1.0** - loaded via ES modules with advanced features
- Responsive design without frameworks (pure CSS)

## 📁 File Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main styles with greyscale + orange theme
│   └── animations.css      # Animation classes and keyframes
├── js/
│   ├── main.js               # Core functionality and basic animations
│   ├── animations.js         # Advanced anime.js v3 animations
│   └── advanced-animations.js # Anime.js v3 advanced features
└── README.md              # This documentation
```

## 🎯 Performance & Accessibility

- Optimized animations (60fps performance)
- Respects `prefers-reduced-motion` for accessibility
- Fast loading times with efficient code
- Proper semantic HTML structure
- ARIA labels and screen reader support
- Skip to content link
- High contrast mode support
- Print styles included

## 🚀 Getting Started

1. **Clone or download** the portfolio files
2. **Open `index.html`** in a web browser
3. **Customize content** by editing the HTML file
4. **Modify colors** by updating CSS custom properties in `style.css`
5. **Adjust animations** by modifying the JavaScript files

## 🎨 Customization Guide

### Changing Colors
Update the CSS custom properties in `css/style.css`:

```css
:root {
    /* Greyscale Palette */
    --color-white: #ffffff;
    --color-grey-100: #f1f3f4;
    /* ... other grey values ... */
    
    /* Rustic Orange Accent */
    --color-orange: #D2691E;
    --color-orange-light: #E07B3A;
    --color-orange-dark: #B85A1A;
}
```

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding CSS in `style.css`
3. Add animation triggers in `animations.js`

### Modifying Animations
- **Page load animations**: Edit `initPageLoadAnimations()` in `main.js`
- **Scroll animations**: Modify `initScrollAnimations()` in `main.js`
- **Interactive animations**: Update `initInteractiveAnimations()` in `main.js`
- **Advanced animations**: Customize functions in `animations.js`

### Adding New Projects
Update the projects grid in the HTML:

```html
<div class="project-card">
    <div class="project-image">
        <div class="project-placeholder">
            <span class="project-icon">🔬</span>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Title</h3>
        <p class="project-description">Project description...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link">View Project</a>
            <a href="#" class="project-link">GitHub</a>
        </div>
    </div>
</div>
```

### Updating Skills
Modify the skills section in the HTML:

```html
<div class="skill-item">
    <span class="skill-name">Your Skill</span>
    <div class="skill-bar">
        <div class="skill-progress" data-width="85"></div>
    </div>
    <span class="skill-percentage">85%</span>
</div>
```

## 🎭 Animation Philosophy

- **Purposeful**: Every animation serves a function (guiding attention, providing feedback, enhancing UX)
- **Subtle**: Animations feel natural and not overwhelming
- **Fast**: Quick, snappy animations (typically 200-800ms duration)
- **Smooth**: Uses appropriate easing functions for realistic motion
- **Cohesive**: Consistent animation style throughout the site

## 🔧 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers
- Progressive enhancement approach

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Customization Examples

### Changing the Accent Color
Replace all instances of `#D2691E` with your preferred color:

```css
:root {
    --color-orange: #your-color;
    --color-orange-light: #your-light-color;
    --color-orange-dark: #your-dark-color;
}
```

### Adding Dark Mode
Add a dark mode toggle and corresponding CSS variables:

```css
@media (prefers-color-scheme: dark) {
    :root {
        --color-white: #1a1a1a;
        --color-grey-100: #2a2a2a;
        /* ... other dark theme colors ... */
    }
}
```

### Customizing Animations
Modify animation durations and easing:

```javascript
anime({
    targets: '.your-element',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800, // Change duration
    easing: 'easeOutElastic(1, .8)' // Change easing
});
```

## 🚀 Deployment

1. **GitHub Pages**: Push to a GitHub repository and enable Pages
2. **Netlify**: Drag and drop the folder to Netlify
3. **Vercel**: Connect your GitHub repository
4. **Traditional hosting**: Upload files to any web server

## 📄 License

This portfolio template is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements.

## 📞 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using vanilla HTML, CSS, JavaScript, and anime.js**