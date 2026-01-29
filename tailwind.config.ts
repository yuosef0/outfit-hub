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
        primary: "#1f431f",
        "background-light": "#f6f7f6",
        "background-dark": "#151d15",
        "text-light-primary": "#0d121b",
        "text-light-secondary": "#4c669a",
        "text-dark-primary": "#ffffff",
        "text-dark-secondary": "#9fb3d9",
        "card-light": "#ffffff",
        "card-dark": "#1b2537",
        "border-light": "#e7ebf3",
        "border-dark": "#323e58",
        "surface-light": "#ffffff",
        "surface-dark": "#1e293b",
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
