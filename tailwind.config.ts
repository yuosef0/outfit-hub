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
        primary: "#2d5a2d",
        "primary-light": "#4a7c4a",
        "primary-dark": "#1e3d1e",
        "background-light": "#fafbfa",
        "background-dark": "#0f1a0f",
        "text-light-primary": "#1a1a1a",
        "text-light-secondary": "#6b7280",
        "text-dark-primary": "#f9fafb",
        "text-dark-secondary": "#9ca3af",
        "card-light": "#ffffff",
        "card-dark": "#1a2e1a",
        "border-light": "#e5e7eb",
        "border-dark": "#2d4a2d",
        "surface-light": "#f3f4f6",
        "surface-dark": "#162816",
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
