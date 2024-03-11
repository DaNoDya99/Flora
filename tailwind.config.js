/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
      "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
        primary: '#F9F5F6',
        secondary: '#F8E8EE',
        secondary2: '#FDCEDF',
        secondary3: '#F2BED1',
    },
  },
  plugins: [
      // eslint-disable-next-line no-undef
      require('flowbite/plugin'),
  ],
}

