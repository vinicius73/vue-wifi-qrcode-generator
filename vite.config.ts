import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

const pkg = require('./package.json')

process.env.VITE_APP_VERSION = pkg.version

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('google-')
      }
    }
  })],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cast: resolve(__dirname, 'cast.html')
      }
    }
  }
})
