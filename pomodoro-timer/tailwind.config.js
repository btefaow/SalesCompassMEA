/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        'cute-bg': '#2b2d42',
        'cute-panel': '#3f3d56',
        'cute-primary': '#a2d2ff',
        'cute-secondary': '#ffafcc',
        'cute-accent': '#bde0fe',
      },
    },
  },
  plugins: [],
}
