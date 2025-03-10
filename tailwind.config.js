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
        move1: {
          '0%': { transform: 'translate(-30vw, -20vh) scale(1)' },
          '50%': { transform: 'translate(40vw, 30vh) scale(1.3)' },
          '100%': { transform: 'translate(-30vw, -20vh) scale(1)' },
        },
        move2: {
          '0%': { transform: 'translate(40vw, -30vh) scale(1)' },
          '50%': { transform: 'translate(-40vw, 40vh) scale(1.4)' },
          '100%': { transform: 'translate(40vw, -30vh) scale(1)' },
        },
        move3: {
          '0%': { transform: 'translate(-40vw, 30vh) scale(1)' },
          '50%': { transform: 'translate(50vw, -40vh) scale(1.2)' },
          '100%': { transform: 'translate(-40vw, 30vh) scale(1)' },
        },
      },
      animation: {
        zoom: 'zoom 0.3s ease-in-out forwards',
        move1: 'move1 25s infinite ease-in-out',
        move2: 'move2 30s infinite ease-in-out',
        move3: 'move3 20s infinite ease-in-out',
      },
      colors: {
        open: '#C2D100',
        opngreen: "#B8EC0C",
        opnpurple: "#C28BE1",
      },
      hueRotate: {
        60: '60deg',
      }
    },
  },
  plugins: [],
};
