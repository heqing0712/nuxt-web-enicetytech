
import {AppConfig } from './config/app'
export default {
  loading: false,
  server:{
    port:3001
    //host:'localhost'
 },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-web',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {hid:'description',name:'description',content: '' },
      {hid:'keywords',name:'keywords',content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  extend(config, ctx) {
    const path = require('path');
    config.devtool = '#source-map'
    // 以下看着来吧
    // Run ESLint on save
    // if (ctx.isDev && ctx.isClient) {
    //   if (ctx.isDev && ctx.isClient) {
    //     config.devtool = '#source-map'
    //   }
    // }
    },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/styles/variables.scss',
    '@/styles/index.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/i18n',
    '@/plugins/element-ui'
    // {src:'@/plugins/storeCache',ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/proxy"
  ],

  proxy:  {
    '/api': AppConfig.baseUrl,
    '/public':{
      target: AppConfig.baseUrl,
      pathRewrite: { '^/public': '/static' }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    vendor: ['axios'],
    // 按需引入element-ui的css等组件文件
    extractCSS: true,
    vendor: ['element-ui'],
    productionSourceMap: false,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css', 'svg'],
    babel: {
        plugins: [
            ["component", {"libraryName": "element-ui", "styleLibraryName": "theme-chalk"}]
        ]
    }

  },

  router: {
    middleware: ['i18n','init']
  },


}
