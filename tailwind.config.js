/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      gridAutoRows: {
        16: '16rem',        // masonry helper: auto-rows-[16rem]
      },
    },
  },
  plugins: [],
};
