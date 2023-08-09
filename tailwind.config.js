/** @type {import('tailwindcss').Config} */
import FlowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,json}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'mirage-100': '#918f96',
        'mirage-200': '#77757e',
        'mirage-300': '#5e5b66',
        'mirage-400': '#47444f',
        'mirage-500': '#302d3a',
        'mirage-600': '#1b1825',
      },
      boxShadow: {
        dark: 'rgba(255, 255, 255, 0.15) 0px 3px 12px',
      },
    },
  },
  darkMode: 'class',
  plugins: [FlowbitePlugin],
};
