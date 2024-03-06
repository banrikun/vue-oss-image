/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const envOptions = command === 'serve'
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

    return {
      ...envOptions,
      test: {
        include: [resolve(__dirname, 'tests/**/*.test.ts')],
        environment: 'jsdom',
        watch: false
      },
      plugins: [vue()],
      publicDir: false
    }
  }
)
