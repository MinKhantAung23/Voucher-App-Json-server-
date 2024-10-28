/** @type {import('tailwindcss').Config} */
export default {
  'darkMode': 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ["Montserrat", "Padauk", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
}

