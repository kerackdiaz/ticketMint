/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "morado1":"#9747FF",
        "morado2":" #55347B",
        "pink":" #CA67F5 ",
        "morado3":" #55347B",
        "morado4":"  #BBABFF ",
        "azul1":" #0B0B1C", 
    }
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    })
  ],
  
}}