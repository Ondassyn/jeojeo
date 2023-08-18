/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#3498db',
        secondary: '#9336B4',
        success: '#00c39a',
        dark: '#320459',
        error: '#ea580c',
        base: '#131F24',
        'my-green': '#00c39a',
        'my-blue': '#3393ff',
        'my-purple': '#c89afe',
        'my-biege': '#fdc799',
        'my-yellow': '#f8fd99',
        'my-orange': '#ffd155',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
