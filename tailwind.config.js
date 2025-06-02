/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3B82F6',
          secondary: '#6B7280',
          accent: '#8B5CF6',
          dark: '#111827',
          light: '#F9FAFB',
        },
        animation: {
          'fadeIn': 'fadeIn 0.5s ease-in-out',
          'spin-slow': 'spin 15s linear infinite',
          'reverse-spin': 'reverse-spin 12s linear infinite',
          'scanning-line': 'scanning-line 3s linear infinite',
          'float': 'float 3s ease-in-out infinite',
          'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          'reverse-spin': {
            '0%': { transform: 'rotate(360deg)' },
            '100%': { transform: 'rotate(0deg)' },
          },
          'scanning-line': {
            '0%': { top: '0%' },
            '50%': { top: '100%' },
            '100%': { top: '0%' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          'pulse-soft': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.5 },
          },
        },
      },
    },
    plugins: [],
  }