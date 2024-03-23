/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html, js}'],
  daisyui: {
    themes: ["sunset", "cupcake"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

