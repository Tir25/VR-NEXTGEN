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
      colors: {
        black: "#000000",
        'deep-charcoal': "#231F20",
        gold: "#FFD700",
        'gold-dark': "#AD974F",
        'gold-darker': "#8E793E",
        white: "#FFFFFF",
        'light-grey': "#EAEAEA"
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
  plugins: []
};



