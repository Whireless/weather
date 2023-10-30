import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  base: '/weather',
  server: {
    open: true,
  },
  build: {
    outDir: './build',
  },
  plugins: [
    vue(),
    ViteImageOptimizer({
      jpeg: {
        quality: 75,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
