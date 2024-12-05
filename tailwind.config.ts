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
        logoText: `url('/images/logo-text.webp')`,
        logoYellow: `url('/images/yellow-logo.png')`,
        brush: `url('/images/brush-icon.png')`,
        logo: `url('/images/logo.png')`,
        yellowBubbleCorner: `url('/images/yellow-bubble-corner.png')`,
        yellowDots: `url('/images/yellow-dots.png')`,
        yellowStripes: `url('/images/yellow-stripes.png')`,
        cleaningBucket: `url('/images/cleaning-bucket.png')`,
        vaccuum: `url('/images/vaccuum.jpg')`,
        residentialIcon: `url('/images/residential-icon.png')`,
        commercialIcon: `url('/images/commercial-icon.png')`,
        biohazardIcon: `url('/images/biohazard-icon.png')`,
        clearBubbles: `url('/images/clear-bubbles.png')`,
      },
      colors: {
        royal: "#01559f",
        sunny: "#ffd700",
        skyAqua: "#58cae3",
        paleBlue: "#f7fafe",
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
        scaleBackForth: "scaleBackForth 5s ease-in-out infinite",
        translateXBackForth: "translateXBackForth 5s ease-in-out infinite",
        translateYBackForth: "translateYBackForth 5s ease-in-out infinite",
        translateXFromLeft: "translateXFromLeft 500ms ease-out forwards",
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
          from: {
            transform: "translateY(50px)",
          },
          to: {
            opacity: "1",
          },
        },
        slideDown: {
          from: {
            transform: "translateY(-50px)",
          },
          to: {
            opacity: "1",
          },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        scaleBackForth: {
          "0%, 100%": {
            transform: "scale(0.8)",
          },
          "50%": {
            transform: "scale(0.6)",
          },
        },
        translateXBackForth: {
          "0%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(20px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        translateYBackForth: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(20px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        translateXFromLeft: {
          "0%": {
            transform: "translateX(-150px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
      },
      screens: {
        "990": "990px",
        "1200": "1200px",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
    },
  },
  plugins: [],
};
export default config;
