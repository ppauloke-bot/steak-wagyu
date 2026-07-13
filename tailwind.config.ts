import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        char: "#0B0A09", // near-black, warm
        coal: "#141210",
        bone: "#F4EFE7", // warm off-white
        ash: "#9A9188", // muted warm grey
        ember: "#D9663B", // terracotta secondary
        amber: "#E7A24A", // golden primary accent
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      letterSpacing: {
        eyebrow: "0.42em",
        wordmark: "0.3em",
      },
    },
  },
  plugins: [],
};

export default config;
