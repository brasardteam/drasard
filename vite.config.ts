import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        nova: path.resolve(__dirname, "nova.html"),
        aurelia: path.resolve(__dirname, "examples/aurelia/index.html"),
        northTable: path.resolve(__dirname, "examples/north-table/index.html"),
        ember: path.resolve(__dirname, "examples/ember/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
