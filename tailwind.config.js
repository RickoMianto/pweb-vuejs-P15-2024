/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',                // Jika menggunakan file HTML di root
    './src/**/*.{vue,js,ts,jsx,tsx}', // File di folder src dengan ekstensi terkait
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

