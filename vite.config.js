import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// .envファイル読み込み
dotenv.config();
console.log("API BASE URL:", process.env.VITE_DICTIONARY_API_URL);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_DICTIONARY_API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api/v2/entries/en'),
      },
    },
  },
});
