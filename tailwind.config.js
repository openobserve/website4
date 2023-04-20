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
            DEFAULT: "#5960B2",
            50: "#EEEEF7",
            100: "#DCDEEF",
            200: "#BDC0E0",
            300: "#9A9ED0",
            400: "#7B81C2",
            500: "#5960B2",
            600: "#444A92",
            700: "#32376C",
            800: "#222549",
            900: "#101223",
            950: "#080911",
          },
          secondary: {
            DEFAULT:"#5CA380",
            50: "#EFF6F2",
            100: "#DEEDE6",
            200: "#BEDACC",
            300: "#9DC8B3",
            400: "#7DB599",
            500: "#5CA380",
            600: "#4A8266",
            700: "#37624D",
            800: "#254133",
            900: "#12211A",
            950: "#09100D",
          },

          whatsapp: "#4dc247",
          footerText: "#6C6C6C",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
