/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "oklch(45.3% 0.124 130.933)",
          foreground: "oklch(14.1% 0.005 285.823)",
        },
        secondary: {
          DEFAULT: "oklch(14.1% 0.005 285.823)",
          foreground: "oklch(45.3% 0.124 130.933)",
        },
        lightText: {
          DEFAULT: "oklch(0.95 0.06 115)",
        },
        lightGreen: {
          DEFAULT: "oklch(0.70 0.13 125)",
        },
      },
    },
    plugins: [],
  },
};
