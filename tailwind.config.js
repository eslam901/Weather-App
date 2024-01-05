/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        cloudy: "url('../images/cloudy.jpg')",
        ice: "url('../images/ice.jpg')",
        rain: "url('../images/rain.jpg')",
        sunny: "url('../images/sunny.jpg')",
      },
    },
  },
  plugins: [],
};

