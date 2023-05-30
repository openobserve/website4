/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./base/**/*.vue"],
  theme: {
    extend: {
      container: {
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
      },
      animation: {
        border: "background ease infinite",
      },
      keyframes: {
        background: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      colors: {
        theme: {
          primary: {
            DEFAULT: "#ED4725",
            50: "#FDEBE7",
            100: "#FBDBD5",
            200: "#F8B3A6",
            300: "#F48F7B",
            400: "#F16B51",
            500: "#ED4725",
            600: "#CB3011",
            700: "#97240C",
            800: "#631708",
            900: "#340C04",
            950: "#180602",
          },
          secondary: {
            DEFAULT: "#F5C321",
            50: "#FEF8E7",
            100: "#FDF3D3",
            200: "#FBE7A7",
            300: "#F9DC7B",
            400: "#F7D04F",
            500: "#F5C321",
            600: "#D7A70A",
            700: "#A17D07",
            800: "#6B5305",
            900: "#362A02",
            950: "#181301",
          },

          whatsapp: "#4dc247",
          footerText: "#6C6C6C",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
