/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fde4e1',
          500: '#e8533a',
          600: '#d4432b',
          700: '#b1351f',
        },
        secondary: {
          500: '#1d4e6b',
          600: '#194358',
          700: '#143a50',
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f4f2',
          200: '#e7e5e4',
          700: '#44403c',
          900: '#1c1917',
        },
        success: '#16a34a',
        warning: '#ea580c',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}