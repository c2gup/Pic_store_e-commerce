/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust to your project structure
  theme: {
    extend: {
      fontFamily: {
        spaceMono: ['"Space Mono"', 'monospace','Work Sans'], // Add your custom font
      },
    },
  },
  plugins: [],
}