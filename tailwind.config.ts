import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue" : "#1095AA",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1095aa",
          "secondary": "#55D6DE",
          "accent": "#F38787",
          "neutral": "#323232",
          "base-100": "#ffffff",
        },
      },
      "night"
    ],
  },
} satisfies Config;
