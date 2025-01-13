// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    baseURL: "/", // Ensure this is correctly set
  },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@vee-validate/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  eslint: {
    config: {
      stylistic: {
        indent: 'tab',
        quotes: 'single',
        semi: true,
        // ...
      }
    }
  }
})