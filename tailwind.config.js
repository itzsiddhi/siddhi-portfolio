/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          black: '#000008',
          deep: '#0a0a12',
          panel: '#0d0d1a',
          border: '#1a1a2e',
        },
        holo: {
          violet: '#a78bfa',
          blue: '#60a5fa',
          teal: '#34d399',
          pink: '#f472b6',
        },
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'holo-shimmer': 'holoShimmer 5s linear infinite',
        'holo-border': 'holoBorder 6s linear infinite',
        'float': 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'drift': 'drift 22s ease-in-out infinite',
      },
      keyframes: {
        holoShimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        holoBorder: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.9' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(12px, -18px) rotate(2deg)' },
          '66%': { transform: 'translate(-10px, -10px) rotate(-1.5deg)' },
        },
      },
    },
  },
  plugins: [],
};
