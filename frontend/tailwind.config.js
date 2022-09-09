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
      }
    },
  },
  plugins: [],
}
