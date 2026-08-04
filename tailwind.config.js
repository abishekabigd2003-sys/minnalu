/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#070306',
          800: '#12070e',
          700: '#1e0a17',
          600: '#2b0c20',
        },
        rose: {
          deep: '#3b0616',
          dark: '#5c0920',
          crimson: '#8a0d2f',
          ruby: '#b80f3d',
          accent: '#e6194b',
          glow: '#ff2e63',
          light: '#ff7597',
        },
        gold: {
          light: '#ffe58f',
          DEFAULT: '#ffd700',
          dark: '#d4af37',
          deep: '#b38b00',
          rose: '#f39c12'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        cursive: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        tamil: ['"Noto Sans Tamil"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 15px rgba(255, 46, 99, 0.4), inset 0 0 10px rgba(255, 46, 99, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(255, 46, 99, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.5)' },
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)',
        'rose-gradient': 'linear-gradient(135deg, #5c0920 0%, #8a0d2f 50%, #e6194b 100%)',
        'dark-radial': 'radial-gradient(circle at center, #2b0c20 0%, #12070e 50%, #070306 100%)',
      }
    },
  },
  plugins: [],
}
