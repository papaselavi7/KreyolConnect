const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1B4F72',
          red: '#E74C3C',
          green: '#27AE60',
          bg: '#F8F9FA',
          surface: '#FFFFFF',
          text: '#1A1A2E',
          textMuted: '#6C757D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
module.exports = config;
