import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import importToCDN from 'vite-plugin-cdn-import'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    Unocss(),
    Pages(),
    // 配置CDN
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://unpkg.com/vue@next',
        },
      ],
    }),
  ],
  server: {
    port: 3000,
    open: true, //自动打开
    base: './ ', //生产环境路径
  },
  optimizeDeps: {
    include: ['vue', 'vue-router'],
  },
  css: {
    preprocessorOptions: { scss: { charset: false } },
  },
  // 打包配置
  build: {
    rollupOptions: {
      // manualChunks(id) {
      //   if (id.includes('node_modules')) {
      //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
      //   }
      // },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    }, // 将打包后的资源分开
  },
})
