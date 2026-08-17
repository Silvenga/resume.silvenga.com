import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react", "typescript", "jsx-a11y"],
  env: {
    browser: true,
    es2020: true,
  },
  ignorePatterns: ["dist"],
  categories: {
    correctness: "warn",
  },
});
