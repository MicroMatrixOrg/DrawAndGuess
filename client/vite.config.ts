import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //样式按需倒入
    styleImport({
      libs: [
        // {
        //   libraryName: 'element-plus',
        //   esModule: true,
        //   ensureStyleFile: true,
        //   resolveStyle: (name) => {
        //     name = name.slice(3)
        //     return `element-plus/packages/theme-chalk/src/${name}.scss`
        //   },
        //   resolveComponent: (name) => {
        //     return `element-plus/lib/${name}`
        //   },
        // },
      ],
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
