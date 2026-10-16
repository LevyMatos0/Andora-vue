import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const target = (process.env.VITE_API_BASE_URL || env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '')

  return {
    base: './',

    plugins: [vue()],

    // Reserve 5173 for the existing panel; public content uses a same-origin proxy.
    server: {
      port: 5174,
      strictPort: true,
      proxy: {
        '/api': { target, changeOrigin: true },
        '/uploads': { target, changeOrigin: true }
      }
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
