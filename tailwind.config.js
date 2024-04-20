/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      },
      colors: {
        'fond': '#0d1720',
        'fond-2': '#16202c',
        'fond-3': '#1a2a3e'
      },
      backgroundImage: {
        'header': "url('/assets/background/fond-header.jpg')",
        'from': "url('/assets/background/bg-form.jpg')",
        'from-2': "url('/assets/background/bg-form-2.jpg')"
      }
    },
  },
  plugins: [],
}