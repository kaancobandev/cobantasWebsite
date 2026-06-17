/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Gövde metni: temiz, kurumsal sans
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        // Başlıklar: zarif, prestijli serif
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      colors: {
        // Sıcak bronz vurgu paleti
        bronze: {
          50:  '#faf6f1',
          100: '#f2e8dc',
          200: '#e3cdb4',
          300: '#d1ac86',
          400: '#bd8a59',
          500: '#a87242',
          600: '#9a6a3c', // ana vurgu
          700: '#7e5430',
          800: '#65442a',
          900: '#543925',
          950: '#2f1f14',
        },
        // Sıcak antrasit / koyu zemin paleti
        ink: {
          50:  '#f6f5f3',
          100: '#e8e6e1',
          200: '#d2cdc4',
          300: '#b3a99b',
          400: '#8d8170',
          500: '#6f6557',
          600: '#564e43',
          700: '#433d35',
          800: '#2a2620',
          900: '#1c1915',
          950: '#121009',
        },
      },
      letterSpacing: {
        widestx: '0.28em',
      },
      boxShadow: {
        soft: '0 24px 60px -28px rgba(45, 33, 20, 0.28)',
        card: '0 18px 48px -32px rgba(45, 33, 20, 0.45)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
