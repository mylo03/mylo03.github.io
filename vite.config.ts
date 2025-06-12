import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // If using a custom domain or user/organization site (e.g., mylo03.github.io)
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
