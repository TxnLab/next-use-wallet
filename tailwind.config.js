const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--sans-font)', ...fontFamily.sans]
      },
      colors: {
        brand: {
          50: '#FFF1ED',
          100: '#FFDFD5',
          200: '#FFBFAB',
          300: '#FF9675',
          400: '#FF774D',
          500: '#FF602E',
          600: '#EA4817',
          700: '#C2360C',
          800: '#9D2E0D',
          900: '#76250D'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
