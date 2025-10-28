/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Use class-based dark mode instead of media query
  theme: {
    extend: {
      colors: {
        // Monochrome foundation
        'mono': {
          white: '#ffffff',
          'gray-50': '#fafafa',
          'gray-100': '#f5f5f5',
          'gray-200': '#e5e5e5',
          'gray-300': '#d4d4d4',
          'gray-400': '#a3a3a3',
          'gray-500': '#737373',
          'gray-600': '#525252',
          'gray-700': '#404040',
          'gray-800': '#262626',
          'gray-900': '#171717',
          black: '#000000',
        },
        // Rustic orange accent
        'accent': {
          orange: '#D2691E',
          'orange-light': '#E07B39',
          'orange-dark': '#B8541A',
        },
        // Semantic colors built on monochrome
        background: {
          primary: '#ffffff',
          secondary: '#fafafa',
          tertiary: '#f5f5f5',
          dark: '#171717',
        },
        text: {
          primary: '#171717',
          secondary: '#404040',
          muted: '#737373',
          light: '#a3a3a3',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'], // Default body font
        'display': ['Space Grotesk', 'Inter', 'sans-serif'], // Headings and display text
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        'glass': '20px',
      },
      boxShadow: {
        'minimal': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'soft': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'medium': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'accent': '0 4px 16px rgba(210, 105, 30, 0.2)',
        'accent-hover': '0 8px 24px rgba(210, 105, 30, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'gentle-pulse': 'gentlePulse 3s ease-in-out infinite',
        'subtle-float': 'subtleFloat 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gentlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
