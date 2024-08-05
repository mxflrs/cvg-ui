/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        cvg: {
          400: '#1E1F21',
          300: '#545D68',
          200: '#C5CED6',
          100: '#E8EBEF',
          75: '#E8EBEF75',
          50: '#E8EBEF50',
        }
      }
    },
  },
  plugins: [],
}

