/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pedal: {
          darkBg: '#0F172A',
          cardBg: '#1E293B',
          cardBorder: '#334155',
          bluePrimary: '#2563EB',
          blueAccent: '#38BDF8',
          textMuted: '#94A3B8'
        }
      }
    },
  },
  plugins: [],
};