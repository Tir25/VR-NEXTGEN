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
  // Enable purging for production builds
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/hooks/**/*.{js,ts,jsx,tsx}",
      "./src/contexts/**/*.{js,ts,jsx,tsx}",
      "./src/utils/**/*.{js,ts,jsx,tsx}",
      "./src/services/**/*.{js,ts,jsx,tsx}"
    ],
    options: {
      safelist: [
        // Keep dynamic classes that might be missed
        /^animate-/,
        /^transition-/,
        /^duration-/,
        /^ease-/,
        /^transform/,
        /^hover:/,
        /^focus:/,
        /^active:/,
        /^group-hover:/,
        /^md:/,
        /^lg:/,
        /^xl:/,
        /^sm:/,
        /^xs:/,
        // Keep specific color classes
        'bg-amber-900',
        'text-amber-900',
        // Keep custom classes
        'btn-enhanced',
        'card-3d',
        'card-shadow',
        'section-hero',
        'section-services',
        'section-industries',
        'section-why-choose',
        'section-clients',
        'section-cta',
        'site-bg',
        'site-bg__grid',
        'site-bg__aurora',
        'site-bg__shine',
        'site-bg__vignette',
        'memory-card',
        'control-btn',
        'carousel-container',
        'animate-fade-in-up'
      ]
    }
  },
  theme: {
    extend: {
      colors: {
        black: "#000000",
        'deep-charcoal': "#231F20",
        gold: "#FFD700",
        'gold-dark': "#AD974F",
        'gold-darker': "#8E793E",
        white: "#FFFFFF",
        'light-grey': "#EAEAEA",
        'glory-white': "#E6E6E6",
        'sand-yellow': "#FFBB01",
        'gray-night-black': "#1A1A1A",
        amber: {
          900: "#78350F"
        },
        purple: {
          400: "#A855F7",
          500: "#9333EA",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6"
        }
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px"
      },
      fontFamily: {
        'heading': ['Playfair Display', 'Montserrat', 'serif'],
        'body': ['Montserrat', 'Open Sans', 'sans-serif']
      },
      fontSize: {
        'h1': '3rem',
        'h2': '2.25rem', 
        'h3': '1.75rem',
        'body': '1rem'
      }
    }
  },
  plugins: [
    // Safely enable typography if installed; no-op otherwise
    (() => { try { return require('@tailwindcss/typography'); } catch (_) { return () => {}; } })()
  ]
};



