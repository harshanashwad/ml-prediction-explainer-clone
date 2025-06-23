/** @type {import('tailwindcss').Config} */
// content field makes sure Tailwind scans all your React component files.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
