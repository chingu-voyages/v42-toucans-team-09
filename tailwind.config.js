/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./**/*.{html,js}"],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: '580px',
      md: '768px',
      lg: '976px',
      xl:'1280px',
      '2xl': '1440px',
    },

    fontFamily:{
      sans: ['Roboto','sans-serif']
    },
    extend: {
      boxShadow: {
        'btn': '0px 1.4433px 10.8247px 0.72165px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}