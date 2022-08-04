/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        chat_bg: "url('../public/img/chat_bg.jpg')",
      },
    },
  },
  plugins: [],
};
