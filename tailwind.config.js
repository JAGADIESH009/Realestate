/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-charcoal': '#17201D',
        'dark-walnut': '#241D18',
        'smoked-stone': '#3A3935',
        'warm-limestone': '#C8C0B1',
        'warm-ivory': '#E8E2D7',
        'muted-clay': '#8B6D58',
        'muted-sage': '#A8B49A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      letterSpacing: {
        widest: '.25em',
      }
    },
  },
  plugins: [],
}
