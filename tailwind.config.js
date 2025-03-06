/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      fontFamily: {
        custom: ['open', 'sans-serif'],
      },
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(2)' },
        },
      },
      animation: {
        zoom: 'zoom 0.3s ease-in-out forwards',
      },
      colors: {
        open: '#C2D100',
      },
    },
  },
  plugins: [],
};
