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
        header: "linear-gradient(to bottom, #007a8f 48px, #ffffff 48px)",
        banner: "linear-gradient(to right, #f7fafe 60%, #007a8f 40%)",
        bannerMobile: "linear-gradient(to right, #f7fafe 90%, #3da3bf 10%)",
        login: "linear-gradient(to right, #fff 60%, #01559f 40%)",
        iconShadow: `linear-gradient(to top, #f1f2f5, rgba(255, 255, 255, 0)), linear-gradient(to bottom, #f6f6f9, #f6f6f9)`,
        navigationDrawer: `linear-gradient(90deg, #e2e9f7 0%, #ffffff 100%)`,
        logoText: `url('/images/logo-text.webp')`,
        clearBubbles: `url('/images/clear-bubbles.png')`,
        curvyDottedYellowLine: `url('/images/curvy-yellow.png')`,
        quotations: `url('/images/quotations.png')`,
        wc1: `url('/images/wc-1.png')`,
        wc2: `url('/images/wc-2.png')`,
        wc3: `url('/images/wc-3.png')`,
        wc4: `url('/images/wc-4.png')`,
        sqysh: `url('/images/sqysh-001.png')`,
        createServiceIconAdmin: `url('/images/create-service-icon-2.png')`,
        createTestimonialIconAdmin: `url('/images/create-admin-testimonial-icon.png')`,
        commercialIconAdmin: `url('/images/commercial-icon-admin.png')`,
        residentialIconAdmin: `url('/images/residential-icon-admin.png')`,
        photoGallerylIconAdmin: `url('/images/admin-photo-gallery-icon.png')`,
        manageApprovedUsersIconAdmin: `url('/images/manage-approved-users-icon.png')`,
        footer: `url('/images/footerbg.png')`,
      },
      colors: {
        royal: "#01559f",
        sunny: "#ffd700",
        skyAqua: "#007a8f",
        paleBlue: "#f7fafe",
        jetBlack: "#0A0A0A",
        espresso: "#332",
        charcoalBlack: "#101010",
        midnightPlum: "#2e294e",
        mediumGray: "#686868",
        lightGray: "#F3F4F7",
        onyx: "#212529",
        inputBorder: "#eeeef0",
        inputText: "#495057",
        inputPlaceholderText: "#c8c8ca",
        neonSkyAqua: "#00c5d9",
        neonGreen: "#00D64D",
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
        slideLeft: "slideLeft 500ms ease-in-out forwards",
        slideRight: "slideRight 500ms ease-in-out forwards",
        scaleIn: "scaleIn 500ms ease-in-out forwards",
        scaleBackForth: "scaleBackForth 3s ease-in-out infinite",
        translateXBackForth: "translateXBackForth 5s ease-in-out infinite",
        translateXForthBack: "translateXForthBack 5s ease-in-out infinite",
        translateYBackForth: "translateYBackForth 5s ease-in-out infinite",
        translateXFromLeft: "translateXFromLeft 500ms ease-out forwards",
        shimmer: "shimmer 1.5s infinite linear",
        slideDownDrawer: "slideDown 0.5s ease-out forwards",
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
        slideLeft: {
          from: {
            transform: "translateX(-50px)",
          },
          to: {
            opacity: "1",
          },
        },
        slideRight: {
          from: {
            transform: "translateX(50px)",
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
            transform: "scale(0.7)",
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
        translateXForthBack: {
          "0%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(-20px)",
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
        fadeSlide: {
          "0%": {
            transform: "translateY(-20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        moveBar: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideDownDrawer: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      screens: {
        "400": "400px",
        "480": "480px",
        "760": "760px",
        "990": "990px",
        "1160": "1160px",
        "1200": "1200px",
        "1315": "1315px",
        "1690": "1690px",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
      boxShadow: {
        neu: "4px 4px 10px 0 rgba(0, 0, 0, 0.08), -5px -6px 10px 0 rgba(253, 253, 253, 0.9)",
        neuInset:
          "inset 4px 4px 10px 0 rgba(0, 0, 0, 0.08), inset -5px -6px 10px 0 rgba(253, 253, 253, 0.9)",
        input: "inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff",
        submit:
          "0 2px 2px 0 rgba(0, 197, 217, 0.5), 0 3px 1px -2px rgba(0, 197, 217, 0.5), 0 1px 5px 0 rgba(0, 197, 217, 0.5)",
        adminHeader: "0 -9px 61px 4px #3da3bf",
        serviceCard: "0px 0px 20px 0px rgba(0, 0, 0, 0.09)",
        adminInput: "0 0 0 4px rgba(0, 197, 217,.6)",
        adminServiceCard: "17px 20px 40px rgba(0,0,0,0.65)",
        adminServiceCardHover: "17px 20px 60px rgba(0,0,0,0.65)",
        publicCard: "17px 20px 40px rgba(230,230,230,0.65)",
        publicClientLeadInput: "0px 0px 40px 0px rgba(1, 83, 159, 0.23)",
      },
      maxWidth: {
        "1140": "1140px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
