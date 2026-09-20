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
          dark: '#0A0A0A',
          darker: '#050505',
          card: '#121212',
          'card-hover': '#1A1A1A',
          surface: '#161616',
          border: '#262626',
          'border-gold': '#FFD000',
          'border-gold-subtle': 'rgba(255, 208, 0, 0.25)',
          gold: '#FFD000',
          'gold-light': '#FFE066',
          'gold-dark': '#E5A910',
          'gold-muted': '#8C731E',
          'gold-glow': 'rgba(255, 208, 0, 0.15)',
          text: '#F8FAFC',
          'text-muted': '#94A3B8',
          'text-dim': '#64748B',
          black: '#000000',
          green: '#10B981',
          'green-light': 'rgba(16, 185, 129, 0.15)',
          red: '#EF4444',
          'red-light': 'rgba(239, 68, 68, 0.15)',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(255, 208, 0, 0.2)',
        'gold-glow-lg': '0 0 35px rgba(255, 208, 0, 0.35)',
        'card-sharp': '3px 3px 0px 0px #FFD000',
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
