/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          deepest: '#050d1f',
          deep: '#0a1628',
          DEFAULT: '#0f1f3d',
          light: '#1a2f56',
        },
        royal: '#1e3a8a',
        gold: {
          DEFAULT: '#c9a55a',
          light: '#e6c980',
          soft: '#f3e3b8',
        },
        cream: '#faf6ec',
        ivory: '#fdfbf6',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
        italic: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'float-medium': 'float-medium 5s ease-in-out infinite',
        'spin-slow': 'spin-slow 60s linear infinite',
        'spin-very-slow': 'spin-very-slow 120s linear infinite',
        'pulse-gold': 'pulse-gold 2.5s infinite',
        'fade-up': 'fade-up 0.9s ease-out forwards',
        'fade-in': 'fade-in 1.2s ease-out forwards',
        'scale-in': 'scale-in 0.7s ease-out forwards',
        'plane': 'plane-fly 22s linear infinite',
        'plane-2': 'plane-fly-2 28s linear infinite',
        'stamp': 'stamp-rotate 4s ease-in-out infinite',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(2deg)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-3deg)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-very-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 165, 90, 0.5)' },
          '50%': { boxShadow: '0 0 0 18px rgba(201, 165, 90, 0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'plane-fly': {
          '0%': { transform: 'translate(-15vw, 10vh) rotate(15deg)', opacity: '0' },
          '10%': { opacity: '0.4' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translate(115vw, -5vh) rotate(15deg)', opacity: '0' },
        },
        'plane-fly-2': {
          '0%': { transform: 'translate(115vw, 60vh) rotate(195deg)', opacity: '0' },
          '10%': { opacity: '0.25' },
          '90%': { opacity: '0.25' },
          '100%': { transform: 'translate(-15vw, 40vh) rotate(195deg)', opacity: '0' },
        },
        'stamp-rotate': {
          '0%': { transform: 'rotate(-12deg) scale(1)' },
          '50%': { transform: 'rotate(-8deg) scale(1.04)' },
          '100%': { transform: 'rotate(-12deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
