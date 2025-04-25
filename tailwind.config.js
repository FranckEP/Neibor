/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Verdana','sans-serif'],
      },
      colors: {
        primary: {
          light: '#8ECAE6',
          DEFAULT: '#219EBC',
          dark: '#023047',
        },
        secondary: {
          light: '#FFB703',
          DEFAULT: '#FB8500',
        },
      },
    },
  },
  plugins: [],
}
