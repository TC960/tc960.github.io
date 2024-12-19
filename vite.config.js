import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Adjust for your deployment URL
  build: {
    outDir: 'dist',  // Output folder for production build
    sourcemap: true, // Enable source maps for debugging
  },
});
