/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html, js}'],
  daisyui: {
    themes: ["cupcake", "dracula"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

