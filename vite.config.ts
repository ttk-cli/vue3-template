import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import externalGlobals from 'rollup-plugin-external-globals'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import Pages from 'vite-plugin-pages'

const isBuild = process.env.npm_lifecycle_event === 'build'

const cdn = {
  css: [],
  js: [
    'https://unpkg.com/vue@3.2.6/dist/vue.global.prod.js',
    'https://unpkg.com/vue-router@4.0.3/dist/vue-router.global.js',
  ],
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    AutoImport({
      dts: 'src/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: 'readonly', // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts',
    }),
    vue(),
    Unocss(),
    Pages(),
    {
      ...externalGlobals({
        vue: 'Vue',
        'vue-router': 'VueRouter',
      }),
      enforce: 'post',
      apply: 'build',
    },
    createHtmlPlugin({
      inject: {
        data: {
          cdnCss: isBuild ? cdn.css : [],
          cdnJs: isBuild ? cdn.js : [],
        },
      },
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
    target: 'modules', // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
    outDir: 'dist', // 指定输出路径
    sourcemap: false, // 构建后是否生成 source map 文件
    minify: 'terser', // 混淆器
    cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    }, // 去除 console debugger
    rollupOptions: {
      external: ['vue', 'vue-router'],
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return id.toString().split('node_modules/')[1].split('/')[0].toString()
        }
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    }, // 将打包后的资源分开
  },
})
