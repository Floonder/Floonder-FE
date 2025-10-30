import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: true, gzipSize: true }), // Untuk analisis
  ],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Pisahkan React libraries
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Pisahkan library maps (sesuaikan dengan yang Anda pakai)
          // Contoh jika pakai Leaflet:
          // 'map-vendor': ['leaflet', 'react-leaflet'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Naikkan limit warning
  },
});
