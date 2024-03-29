import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#80ed99',
        'secondary': '#121063',
        'primary-dark': '#38a3a5',
        'secondary-dark': '#22577a',
        'light': '#ecebff',
        'dark': '#352F44',
        // hover versions
        'primary-hover': '#98f3b2',
        'secondary-hover': '#2a2a8a',
        'primary-dark-hover': '#319395',
        'secondary-dark-hover': '#1c4d6a',
        'light-hover': '#dcd8f3',
        'dark-hover': '#5C5470',
      },
      spacing: {
        '0.125/10': '1.25%',
        '0.25/10': '2.5%',
        '0.5/10': '5%',
        '0.75/10': '5%',
        '0/10': '0%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        '9.5/10': '95%',
        '10/10': '100%',
        '10': '10dvw',
        '20': '20dvw',
        '25': '25dvw',
        '35': '25dvw',
        '50': '50dvw',
        '75': '75dvw',
        '100': '100dvw',
      },
      fontSize: {
        '0.25': '0.25dvw',
        '0.5': '0.5dvw',
        '1': '1dvw',
        '1.25': '1.25dvw',
        '1.5': '1.5dvw',
        '2': '2dvw',
        '2.5': '2.5dvw',
        '3': '3dvw',
        '4': '4dvw',
        '5': '5dvw',
        '6': '6dvw',
        '7.5': '7.5dvw',
        '10': '10dvw',
        '20': '20dvw',
        '25': '25dvw',
        '50': '50dvw',
        '75': '75dvw',
        '100': '100dvw',
        'sm': '0.5dvw',
        'md': '0.75dvw',
        'lg': '1dvw',
        'xl': '1.25dvw',
        '1.5xl': '1.75dvw',
        '2xl': '2.5dvw',
        '3xl': '3.75dvw',
        '4xl': '5dvw',
      }
    },
  },
  plugins: [require("daisyui")],
};
export default config;
