import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const envOptions = process.env.NODE_ENV === 'dev'
  ? {
    root: resolve(__dirname, 'example')
  } : {
    build: {
      lib: {
        entry: resolve(__dirname, 'lib/index.ts'),
        name: 'VueOssImage',
        fileName: 'lib',
      },
      outDir: resolve(__dirname, 'dist'),
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }

// https://vitejs.dev/config/
export default defineConfig({
  ...envOptions,
  plugins: [vue()],
  publicDir: false
})
