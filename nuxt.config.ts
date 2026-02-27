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
    "nuxt-gtag",
    "@nuxtjs/sitemap",
  ],
  components: {
    dirs: [
      "~/components/atoms",
      "~/components/homeBlocks",
      "~/components/molecules",
      "~/components",
    ],
  },
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
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  runtimeConfig: {
    public: {
      apiURL: "",
    },
  },
  compatibilityDate: "2024-11-01",
  eslint: {
    config: {
      stylistic: {
        indent: "tab",
        quotes: "single",
        semi: true,
      },
    },
  },
  gtag: {
    enabled: process.env.NODE_ENV === "production",
    id: "G-L3KQE89RQS",
  },
  image: {
    dir: "public/imgs",
  },
});
