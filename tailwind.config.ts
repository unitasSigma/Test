import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        luxury: {
          black: "#0A0A0A",
          charcoal: "#1A1A1A",
          silver: "#E5E5E5",
          gold: "#D4AF37",
          "gold-light": "#F1D279",
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
