const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light colors
        "primary-light": "#f5f5f5", // 100
        "secondary-light": "#a3a3a3", // 400
        "tertiary-light": "#404040", // 700

        // Dark colors
        "primary-dark": "#262626", // 800
        "secondary-dark": "#525252", // 600
        "tertiary-dark": "#d4d4d4", // 300

        // Accent colors
        "accent-light": "#5b8ee1",
        "accent-dark": "#346ac2",

        // Extended v3 color
        gray: colors.neutral,
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "5rem",
          xl: "6rem",
          "2xl": "8rem",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
