/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blueprint: {
          950: '#0B1420',
          900: '#0F1B2E',
          800: '#16273D',
          700: '#1F3450',
          600: '#2C4B6E',
          line: '#4A90A4',
        },
        brass: {
          50: '#FBF3E7',
          100: '#F3E1BF',
          300: '#DDB477',
          500: '#C08B3E',
          600: '#A5722E',
          700: '#835723',
        },
        paper: '#FAF8F3',
        ink: '#1B2431',
        slate: {
          650: '#3E4A5C',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'blueprint-grid':
          "linear-gradient(rgba(74,144,164,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,164,0.16) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: '32px 32px',
      },
    },
  },
  plugins: [],
};
