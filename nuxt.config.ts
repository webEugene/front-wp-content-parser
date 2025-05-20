// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@vee-validate/nuxt",
    "nuxt-svgo",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Onest: true,
        },
      },
    ],
    "@nuxtjs/seo",
  ],
  devtools: { enabled: true },
  app: {
    baseURL: "/",
    head: {
      title: "WP Content Parser",
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2024-11-01",
  eslint: {
    config: {
      stylistic: {
        indent: "tab",
        quotes: "single",
        semi: true,
        // ...
      },
    },
  },
  image: {
    dir: "assets/images",
  },
});
