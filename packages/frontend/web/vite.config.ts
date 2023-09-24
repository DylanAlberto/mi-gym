import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: path.resolve(__dirname, '../../commons/api/dist/index.js'),
    },
  },
  optimizeDeps: {
    include: ['api'],
  },
});
