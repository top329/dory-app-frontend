/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'latin'],
        jakarta: ['Plus Jakarta Sans', 'latin'],
      },
      colors: {
        mainColor: '#0087F4',
      },
    },
  },
  plugins: [],
};
