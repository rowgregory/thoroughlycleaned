import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        banner: "linear-gradient(to right, #f7fafe 60%, #01559f 40%)",
        login: "linear-gradient(to right, #fff 60%, #01559f 40%)",
      },
      colors: {
        royal: "#01559f",
        sunny: "#ffd601",
      },
      fontSize: {
        11: "0.6875rem",
        13: "0.8125rem",
        15: "0.9375rem",
        17: "1.0625rem",
      },
      animation: {
        "translate-element": "translate-element 5s ease-in-out infinite", // Adjust duration and timing as needed
      },
      keyframes: {
        "translate-element": {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-20px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
