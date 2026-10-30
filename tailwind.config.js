/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          DEFAULT: '#131921',
          light: '#232f3e',
          yellow: '#febd69',
          yellowHover: '#f3a847',
          orange: '#e47911',
          link: '#007185',
          linkHover: '#c7511f',
          grayBg: '#eaeded',
          border: '#d5d9d9',
          dark: '#0f1111'
        }
      },
      fontFamily: {
        sans: ['"Ember"', 'Amazon Ember', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}

