/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#ffffffff',
        'antiflash-white': '#ecececff',
        'silver': '#cececeff',
        'honeydew': '#e2f1e7ff',
        'gunmetal': '#243642ff',
        'red': '#ff2727ff',
        'lime-green': '#22c728ff',
        'argentinian-blue': '#3eb4ffff',
      }
    },
  },
  plugins: [],
}
