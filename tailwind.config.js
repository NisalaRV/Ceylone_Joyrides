/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: { DEFAULT: '#101820', 800: '#16212b', 700: '#1d2b37' },
        forest: { DEFAULT: '#174B3A', 600: '#1d5d49', 800: '#0f3528' },
        ivory: { DEFAULT: '#F7F4ED', 200: '#ece7db' },
        gold: { DEFAULT: '#D5B477', 400: '#e2c791', 600: '#b8985a' },
        stone: { DEFAULT: '#8C9690', 600: '#6b756f' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 50px -20px rgba(16, 24, 32, 0.35)',
        gold: '0 10px 30px -10px rgba(213, 180, 119, 0.55)',
      },
      backgroundImage: {
        'gold-sheen': 'linear-gradient(135deg, #e8cf9c 0%, #D5B477 50%, #b8985a 100%)',
        'night-forest': 'linear-gradient(160deg, #101820 0%, #12302a 55%, #174B3A 100%)',
      },
      keyframes: {
        scrollDot: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
      },
      animation: {
        scrollDot: 'scrollDot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
