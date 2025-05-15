
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
          // Define UI components chunk with explicit paths
          ui: [
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            // Include other UI component paths without using glob
          ],
        },
      },
    },
    // Add source maps for better debugging
    sourcemap: true,
  }
}));
