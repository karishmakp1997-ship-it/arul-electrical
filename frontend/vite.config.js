import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// In development, /api and /uploads are forwarded to the PHP server (php -S localhost:8000 -t backend)
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:8000', '/uploads': 'http://localhost:8000' } },
})
