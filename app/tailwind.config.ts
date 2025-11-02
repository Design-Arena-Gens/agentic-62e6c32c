import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        surface: "#111827",
        accent: "#9d4edd",
        muted: "#1f2937",
      }
    }
  },
  plugins: [],
};

export default config;
