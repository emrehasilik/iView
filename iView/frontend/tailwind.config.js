/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        electrolize: ['Electrolize', 'sans-serif'], // Electrolize fontunu tanımlama
      },
    },
  },
  plugins: [],
}
