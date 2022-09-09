/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#BC7C9C',
        secondary: '#CF9893',
        dark: "#292929",
        light: "#f4f4f4",
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.125)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        scale: 'scale 1s ease-in-out',
      }
    }
  },
    plugins: [],
}
