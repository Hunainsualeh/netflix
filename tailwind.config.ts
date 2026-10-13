import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nf: {
          red: "#E50914",
          redDark: "#B20710",
          black: "#000000",
          bg: "#141414",
          card: "#181818",
          raised: "#2F2F2F",
          gray: "#808080",
          light: "#E5E5E5",
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        logo: ['"Bebas Neue"', "Impact", "sans-serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        script: ["Caveat", "cursive"],
      },
      keyframes: {
        kenburnsIn: { from: { transform: "scale(1.02)" }, to: { transform: "scale(1.18)" } },
        kenburnsOut: { from: { transform: "scale(1.18)" }, to: { transform: "scale(1.02)" } },
        panLeft: { from: { transform: "scale(1.15) translateX(3%)" }, to: { transform: "scale(1.15) translateX(-3%)" } },
        panRight: { from: { transform: "scale(1.15) translateX(-3%)" }, to: { transform: "scale(1.15) translateX(3%)" } },
        glow: { "0%,100%": { opacity: "0.45" }, "50%": { opacity: "0.85" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        wiggle: { "0%,100%": { transform: "rotate(-3deg)" }, "50%": { transform: "rotate(3deg)" } },
      },
      animation: {
        glow: "glow 5s ease-in-out infinite",
        floaty: "floaty 4s ease-in-out infinite",
        wiggle: "wiggle 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
