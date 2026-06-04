import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#C0392B',
          dark: '#9a2e22',
          light: '#e74c3c',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1e293b 60%, #2d1a1a 100%)',
        'card-gradient': 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.04)',
        'card-hover': '0 25px 35px -12px rgba(0,0,0,0.15)',
        'glow': '0 0 30px rgba(192,57,43,0.3)',
        'glow-sm': '0 0 15px rgba(192,57,43,0.2)',
      },
    },
  },
  plugins: [],
}
export default config
