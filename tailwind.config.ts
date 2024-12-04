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
        header: "linear-gradient(to bottom, #58cae3 48px, #ffffff 80px)",
        banner: "linear-gradient(to right, #f7fafe 60%, #58cae3 40%)",
        bannerMobile: "linear-gradient(to right, #f7fafe 90%, #58cae3 10%)",
        login: "linear-gradient(to right, #fff 60%, #01559f 40%)",
        logo: `url('/images/logo.webp')`,
        logo2: `url('/images/logo-2.webp')`,
        logoYellow: `url('/images/logo01.png')`,
        brush: `url('/images/banner-brush.png')`,
        loadingImg: `url('/images/loading-img.png')`,
        yellowBubbleCorner: `url('/images/yellow-bubble-corner.png')`,
      },
      colors: {
        royal: "#01559f",
        // sunny: "#ffd601",
        sunny: "#ffd700",
        skyAqua: "#58cae3",
      },
      fontSize: {
        11: "0.6875rem",
        13: "0.8125rem",
        15: "0.9375rem",
        17: "1.0625rem",
      },
      animation: {
        "translate-element": "translate-element 5s ease-in-out infinite",
        scaleFadeOut: "scaleFadeOut 500ms ease-in-out forwards",
        fadeOut: "fadeOut 5000s ease-in-out forwards",
        fadeIn: "fadeIn 500ms ease-in-out forwards",
        slideUp: "slideUp 500ms ease-in-out forwards",
        slideDown: "slideDown 500ms ease-in-out forwards",
        scaleIn: "scaleIn 500ms ease-in-out forwards",
      },
      keyframes: {
        "translate-element": {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-20px)" },
          "100%": { transform: "translateX(0)" },
        },
        scaleFadeOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(40)", opacity: "0" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(0px)" },
          "100%": { opacity: "1", transform: "translateY(30px)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      screens: {
        "990": "990px", // Add your custom breakpoint here
      },
    },
  },
  plugins: [],
};
export default config;
