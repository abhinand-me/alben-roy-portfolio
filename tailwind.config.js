/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F7F5F0',
          50: '#FFFFFF',
          100: '#FAF9F6',
          200: '#F7F5F0',
          300: '#EFECE4',
          400: '#E4DFD3',
        },
        charcoal: {
          DEFAULT: '#171717',
          950: '#0C0C0D',
          900: '#121213',
          800: '#171717',
          700: '#262626',
          600: '#3D3D3D',
          500: '#525252',
          400: '#737373',
          300: '#A3A3A3',
        },
        beige: {
          DEFAULT: '#E6DED2',
          light: '#EEE7DD',
          dark: '#D8CEBF',
        },
        olive: {
          DEFAULT: '#777B65',
          dark: '#4C513E',
          light: '#8E937A',
        },
        gold: {
          DEFAULT: '#C5A880',
          accent: '#D4AF37',
          muted: '#A88D68',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SF Mono', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
        mega: '0.35em',
      },
      animation: {
        'shutter': 'shutterPulse 1.8s ease-in-out infinite',
        'rec-blink': 'recBlink 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'focus-pulse': 'focusPulse 2s ease-in-out infinite',
      },
      keyframes: {
        shutterPulse: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.08) rotate(15deg)' },
        },
        recBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
        focusPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
