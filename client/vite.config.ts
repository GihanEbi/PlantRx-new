import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],
  // The root is now "current directory" because the file is in /client
  root: __dirname,
  resolve: {
    alias: {
      // Go up one level to find shared and assets
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "..", "shared"),
      "@assets": path.resolve(__dirname, "..", "attached_assets"),
    },
  },
  build: {
    // Go up one level then into dist/public
    outDir: path.resolve(__dirname, "..", "dist", "public"),
    emptyOutDir: true,
  },
  server: {
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5000,
    },
  },
});
