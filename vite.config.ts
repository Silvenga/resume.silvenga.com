import path from "node:path";
import yaml from "@rollup/plugin-yaml";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/resume/",
  root: "src",
  publicDir: path.resolve(import.meta.dirname, "src/static"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/resume"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.names[0]?.endsWith(".mjs") ? ".js" : "[extname]";
          return `assets/[name]-[hash]${ext}`;
        },
      },
    },
  },
  plugins: [yaml(), tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
