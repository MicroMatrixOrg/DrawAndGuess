import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  plugins: [
    vue(),
    //样式按需倒入
    styleImport({
      libs: [],
    }),
  ],
  //配置代理
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
})
