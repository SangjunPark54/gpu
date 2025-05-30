// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Compatibility date
  compatibilityDate: '2025-05-29',
  
  // CSS Framework
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true
  },

  // App configuration
  app: {
    head: {
      title: 'GPU Management System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'GPU Resource Management Dashboard' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiSecret: process.env.API_SECRET,
    
    // Public keys (exposed to client-side)
    public: {
      apiBase: process.env.API_BASE_URL || '/api/core/v1'
    }
  },

  // CSS configuration
  css: [
    '~/assets/css/main.css'
  ],

  // Auto-import configuration
  imports: {
    dirs: [
      'composables/**'
    ]
  },

  // Components auto-import
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  // Build configuration
  build: {
    transpile: ['chart.js']
  },

  // Development server configuration
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },

  // Nitro configuration for API proxy
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.BACKEND_URL || 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
}) 