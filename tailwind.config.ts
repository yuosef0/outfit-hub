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
        "primary-light": "#4a7c4a",
        "primary-dark": "#1e3d1e",
        "background-light": "#f6f7f6", // Zinc-50 like
        "background-dark": "#09090b", // Zinc-950 - Deep neutral black
        "text-light-primary": "#18181b", // Zinc-900
        "text-light-secondary": "#71717a", // Zinc-500
        "text-dark-primary": "#f4f4f5", // Zinc-100 - Bright white/gray
        "text-dark-secondary": "#a1a1aa", // Zinc-400
        "card-light": "#ffffff",
        "card-dark": "#18181b", // Zinc-900
        "border-light": "#e4e4e7", // Zinc-200
        "border-dark": "#27272a", // Zinc-800
        "surface-light": "#ffffff",
        "surface-dark": "#18181b", // Zinc-900
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
