import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Lets other devices on the same Wi-Fi open the page (for showing it to the client).
    host: true,
    // Requests to /api go to the backend, so the page also works from another device.
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
});
