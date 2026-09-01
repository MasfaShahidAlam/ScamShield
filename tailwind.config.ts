import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0E17",
        surface: "#121826",
        "surface-hover": "#1A2333",
        border: "#232C3F",
        foreground: "#EAEDF3",
        muted: "#7C8698",
        accent: "#4C7EFF",
        warning: "#F2A93C",
        danger: "#E5484D",
        safe: "#3DDC97",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;