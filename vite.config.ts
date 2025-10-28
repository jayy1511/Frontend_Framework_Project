import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        // Forward all /api/* calls to Azure backend during `npm run dev`
        '/api': {
          target: env.VITE_API_BASE_URL, // reads from .env.local
          changeOrigin: true,
          secure: true,
        },
      },
    },
  }
})