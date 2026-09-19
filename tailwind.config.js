/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#000000',
          black: '#000000',
          yellow: '#FFD000',
          'yellow-light': '#FFF066',
          dark: '#141414',
          darker: '#0A0A0A',
          card: '#121212',
          gray: '#1E1E1E',
          'gray-border': '#2E2E2E',
          'gray-muted': '#A1A1AA',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Bebas Neue"', 'sans-serif'],
        condensed: ['"Bebas Neue"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'phone': '0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.08), 0 40px 100px -20px rgba(0, 0, 0, 0.25)',
        'card-sharp': '3px 3px 0px 0px #000000',
        'yellow-sharp': '4px 4px 0px 0px #FFD000',
        'active-sharp': '2px 2px 0px 0px #FFD000',
      },
      animation: {
        'scan': 'scan 2.4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave-bar': 'waveBar 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        waveBar: {
          '0%': { height: '20%' },
          '100%': { height: '100%' },
        }
      }
    },
  },
  plugins: [],
}
