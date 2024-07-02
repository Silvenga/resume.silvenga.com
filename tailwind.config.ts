import type { Config } from "tailwindcss";
import Typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    hljs: {
      theme: "github-dark-dimmed",
    },
    extend: {
      fontFamily: {
        sans: [
          // Loaded
          "Inter Variable",
          // Fallback
          "Inter", "Roboto", "Helvetica Neue", "Arial Nova", "Nimbus Sans", "Arial", "sans-serif",
          // Emotes
          "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
        ],
      },
    },
  },
  plugins: [
    Typography
  ],
} satisfies Config
