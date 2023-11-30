import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': '#FFFFFF',
        'light-title': '#333333',
        'light-subtitle': '#666666',
        'light-reg-text': '#999999',
        'light-less-text': '#CCCCCC',
        accent: '#98CAEC',
        'dark-bg': '#121212',
        'dark-title': '#FFFFFF',
        'dark-subtitle': '#B0B0B0',
        'dark-reg-text': '#808080',
        'dark-less-text': '#555555',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
