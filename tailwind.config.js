const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./client/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customgray: '#e6e7eb',
        codgray: '#141414',
        darkgray: "#070707",
      },
    },
    minWidth: {
      "200p": "200px",
    }
  },
  plugins: [],
});