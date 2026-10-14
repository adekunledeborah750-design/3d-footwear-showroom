/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0D0E11',
          secondary: '#15171C',
          elevated: '#1D2026',
          card: '#16181E',
          glass: 'rgba(21, 23, 28, 0.85)',
        },
        text: {
          primary: '#F5F5F2',
          secondary: '#A3A6AE',
          muted: '#666973',
        },
        accent: {
          DEFAULT: '#91ACFF',
          hover: '#B5C7FF',
          muted: 'rgba(145, 172, 255, 0.15)',
        },
        surface: {
          border: 'rgba(255, 255, 255, 0.12)',
          borderSubtle: 'rgba(255, 255, 255, 0.06)',
          active: 'rgba(145, 172, 255, 0.25)',
        },
        status: {
          success: '#4ADE80',
          error: '#F87171',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'glow-subtle': '0 0 30px -10px rgba(145, 172, 255, 0.2)',
        'elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
}
