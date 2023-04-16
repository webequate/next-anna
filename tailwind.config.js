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
        "light-1": "#f5f5f5", // 100
        "light-2": "#a3a3a3", // 400
        "light-3": "#404040", // 700

        // Dark colors
        "dark-1": "#262626", // 800
        "dark-2": "#525252", // 600
        "dark-3": "#d4d4d4", // 300

        // Accent colors
        "accent-1": "#5588ee",
        "accent-2": "#346ac2",

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
