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
        navy: {
          primary: "var(--navy-primary)",
          dark: "var(--navy-dark)",
          light: "var(--navy-light)",
        },
        gold: {
          primary: "var(--gold-primary)",
          muted: "var(--gold-muted)",
        },
        offwhite: "var(--offwhite)",
        purewhite: "var(--purewhite)",
        silver: "var(--silver)",
        water: "var(--water)",
        whatsapp: "var(--whatsapp)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "xs": ["0.8rem", { lineHeight: "1.25" }],
        "sm": ["1rem", { lineHeight: "1.3" }],
        "base": ["1.25rem", { lineHeight: "1.4" }],
        "lg": ["1.563rem", { lineHeight: "1.4" }],
        "xl": ["1.953rem", { lineHeight: "1.3" }],
        "2xl": ["2.441rem", { lineHeight: "1.25" }],
        "3xl": ["3.052rem", { lineHeight: "1.2" }],
        "4xl": ["3.815rem", { lineHeight: "1.15" }],
        "5xl": ["4.768rem", { lineHeight: "1.1" }],
        "6xl": ["5.96rem", { lineHeight: "1.1" }],
        "7xl": ["7.451rem", { lineHeight: "1.05" }],
      },
      spacing: {
        "0.5": "4px",
        "1": "8px",
        "1.5": "12px",
        "2": "16px",
        "3": "24px",
        "4": "32px",
        "5": "40px",
        "6": "48px",
        "8": "64px",
        "10": "80px",
        "12": "96px",
        "16": "128px",
        "20": "160px",
        "24": "192px",
        "32": "256px",
      },
      boxShadow: {
        resting: "0 4px 20px -2px rgba(11, 35, 65, 0.04)",
        raised: "0 12px 30px -4px rgba(11, 35, 65, 0.08)",
        floating: "0 20px 50px -6px rgba(11, 35, 65, 0.12)",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        xl: "32px",
      },
    },
  },
  plugins: [],
};

export default config;
