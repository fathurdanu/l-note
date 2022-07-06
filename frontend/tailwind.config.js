/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightColor: "#cfd0d4",
        midLightColor: "#3c4043",
        midDarkColor: "#282a2d",
        darkColor: "#17181b",
        firstColor: "#22201e",
        secondColor: "#f3f3f0",
        thirdColor: "#333333",
        trueDark: "#111111"
      },
    },
  },
  plugins: [],
}
