/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      animation: {
        pulseSlow: "pulse 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
