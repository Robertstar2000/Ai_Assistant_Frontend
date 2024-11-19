import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@front_end': path.resolve(__dirname, './src')
    }
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  define: {
    'process.env': {},
  },
});