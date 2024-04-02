/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      backgroundImage: {

      },
      fontFamily: {
        'gemunu': ['Gemunu Libre', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
    },
    screens: {
      'movil': '320px',
      
      'tablet': '640px',
      'md': '768px', 

      'laptop': '1024px',
      'lg': '1024px', 

      'desktop': '1280px',

      'sm': '640px',

      '2k': '1536px'


    },
  },
  plugins: [
    
  ],
};
