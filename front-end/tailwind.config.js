/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/preline/preline.js'
  ],
  theme: {
    extend: {
      colors:  {
        'cgray': {
          100: '#B3B3B3',
          200: '#F5F5F5',
          300: '#E3E3E3',
          600: '#2C2C2C',
          700: '#757575',
          800: '#1E1E1E',
        },
        'ifrn': {
          500: '#00FD94',
          600: '#376F6C',
          800: '#1E3231',
        }
      }
    },

  },
  plugins: [
    require('preline/plugin'),
  ],
}

