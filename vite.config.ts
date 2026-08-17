import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yaml from "@rollup/plugin-yaml";

export default defineConfig({
  base: "/resume/",
  root: "src",
  publicDir: path.resolve(import.meta.dirname, "src/static"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/resume"),
    emptyOutDir: true,
  },
  plugins: [
    yaml(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});