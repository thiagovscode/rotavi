/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f2f5f9',
          100: '#e1e8f2',
          200: '#c7d5e8',
          300: '#a1b8d8',
          400: '#7593c3',
          500: '#5575b0',
          600: '#3f5a93',
          700: '#2d426e',
          800: '#1B2A4A',
          900: '#0F1A2E',
          950: '#09101D',
        },
        gold: {
          50: '#fbf9f3',
          100: '#f5efe0',
          200: '#eadcc0',
          300: '#dcc396',
          400: '#cca66c',
          500: '#C5A059',
          600: '#b08643',
          700: '#926a38',
          800: '#775632',
          900: '#62472b',
        },
        sand: {
          50: '#FAF8F5',
          100: '#F4F0EA',
          200: '#E8E0D5',
          300: '#D6C8B5',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'editorial': '0 4px 24px -4px rgba(15, 26, 46, 0.06), 0 2px 8px -2px rgba(15, 26, 46, 0.04)',
        'editorial-lg': '0 12px 36px -6px rgba(15, 26, 46, 0.1), 0 4px 12px -2px rgba(15, 26, 46, 0.05)',
      }
    },
  },
  plugins: [],
}
