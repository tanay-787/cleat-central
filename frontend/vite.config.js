import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
               target: process.env.NODE_ENV === 'production' 
                 ? "https://cleat-central.vercel.app"
                 : "http://localhost:3000",
                changeOrigin: true,
                secure: true,
      },
    },
  }
});
