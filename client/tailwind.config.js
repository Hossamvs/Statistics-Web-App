/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-hero-pattern' : "url('/src/assets/background_image_circuit.jpg')",
      }
    },
  },
  plugins: [],
}