/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
    "./src/services/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // VR NextGEN Design System Colors
      colors: {
        // Core Brand Colors
        black: "#000000",
        'deep-charcoal': "#231F20",
        gold: "#FFD700",
        'gold-dark': "#AD974F",
        'gold-darker': "#8E793E",
        white: "#FFFFFF",
        'light-grey': "#EAEAEA",
        
        // Semantic Colors
        background: "#000000",
        foreground: "#FFFFFF",
        accent: "#FFD700",
        'text-secondary': "#231F20",
        'border-light': "#EAEAEA"
      },
      
      // Mobile-First Responsive Breakpoints (per GUIDE)
      screens: {
        xs: "320px",    // Mobile phones
        sm: "640px",    // Large mobile phones
        md: "768px",    // Tablets
        lg: "1024px",   // Small desktops
        xl: "1280px",   // Large desktops
        '2xl': "1536px" // Extra large displays
      },
      
      // Typography Scale (per GUIDE)
      fontFamily: {
        'heading': ['Playfair Display', 'Montserrat', 'serif'],
        'body': ['Montserrat', 'Open Sans', 'sans-serif'],
        'sans': ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'ui-serif', 'Georgia', 'serif']
      },
      
      fontSize: {
        'h1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.75rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }]
      },
      
      // Spacing Scale for consistent design
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      
      // Animation Durations
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '600ms',
        'very-slow': '1200ms'
      },
      
      // Custom animations
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'orb-float': 'orbFloat 15s ease-in-out infinite',
        'gradient-shift': 'gradientShift 15s ease infinite',
        'btn-ripple': 'btn-ripple 1200ms linear'
      },
      
      // Box shadows for depth
      boxShadow: {
        'gold-glow': '0 0 20px rgba(255, 215, 0, 0.6)',
        'gold-glow-sm': '0 0 10px rgba(255, 215, 0, 0.3)',
        'gold-glow-lg': '0 0 30px rgba(255, 215, 0, 0.8)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.1)'
      }
    }
  },
  plugins: []
};



