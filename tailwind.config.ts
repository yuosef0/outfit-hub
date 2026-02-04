import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f431f", // Forest green from user design
        "primary-light": "#4ade80",
        "primary-dark": "#16a34a",
        "background-light": "#f6f7f6",
        "background-dark": "#151d15", // Dark greenish-black from user design
        "text-light-primary": "#0d121b",
        "text-light-secondary": "#71717a",
        "text-dark-primary": "#e0e0e0",
        "text-dark-secondary": "#a1a1aa",
        "card-light": "#ffffff",
        "card-dark": "#27272a",
        "border-light": "#e4e4e7",
        "border-dark": "#27272a",
        "surface-light": "#ffffff",
        "surface-dark": "#27272a", // Dark gray surface
        "accent-green": "#22c55e",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "3rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
