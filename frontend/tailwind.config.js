/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto: ['Roboto'],

    },
    extend: {
      keyframes:{
        mailTrans:{
          to:{
            "transform": "translateX(0)"
          }
        }
      }
    },
  },
  plugins: [],
}
