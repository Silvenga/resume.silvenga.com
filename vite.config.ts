import path from "node:path";
import yaml from "@rollup/plugin-yaml";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type PluginOption } from "vite";

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
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-pdf") || id.includes("pdfjs-dist")) {
              return "pdf-viewer";
            }
            if (
              id.includes("@react-pdf") ||
              id.includes("fontkit") ||
              id.includes("yoga-layout") ||
              id.includes("hyphen") ||
              id.includes("brotli")
            ) {
              return "pdf-renderer";
            }
          }
        },
      },
    },
  },
  plugins: [yaml(), tailwindcss(), react(), injectWorkerPreload()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});

function injectWorkerPreload(): PluginOption {
  return {
    name: "inject-worker-preload",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) {
          return html;
        }
        const worker = Object.values(ctx.bundle).find(
          (chunk) => chunk.type === "asset" && chunk.names[0]?.startsWith("pdf.worker.min"),
        );
        if (!worker || !("fileName" in worker)) {
          return html;
        }
        const href = `${ctx.bundle ? "/resume/" : ""}${worker.fileName}`;
        return html.replace("</head>", `  <link rel="modulepreload" href="${href}" />\n</head>`);
      },
    },
  };
}
