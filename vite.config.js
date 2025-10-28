import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // GitHub Pages base URL
  build: {
    outDir: 'dist',  // Output folder for production build
    sourcemap: true, // Enable source maps for debugging
  },
});
