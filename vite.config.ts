
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure we generate clean URLs
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code for better caching
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom', 
            'date-fns', 
            'date-fns-tz',
            '@tanstack/react-query'
          ],
          // Split UI components
          ui: [
            '@/components/ui',
          ],
        },
      },
    },
    // Add source maps for better debugging
    sourcemap: true,
  }
}));
