import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/Andora-vue/',
  
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
<<<<<<< HEAD
})
=======
})
>>>>>>> d07e6a8117bee0ab59fc9b412bf8a4d7ea8c8fa1
