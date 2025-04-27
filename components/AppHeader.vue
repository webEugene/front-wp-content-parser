<script setup lang="ts">
const route = useRoute();

const links = ref([
  { label: "WP Check", to: "/wp-check" },
  {
    label: "Sitemap test",
    to: "/sitemap-test",
  },
  {
    label: "Sitemap Extractor",
    to: "/sitemap-extractor",
  },
  {
    label: "Link grabber",
    to: "/link-grabber",
  },
]);
// https://chromewebstore.google.com/detail/link-grabber/caodelkhipncidmoebgbbeemedohcdma
// Function to get the class for a link
const getLinkClass = (path: string) => {
  return route.path === path
    ? "text-blue-600 font-bold" // Active link styles
    : "text-gray-700 hover:text-blue-600"; // Inactive link styles
};
</script>

<template>
  <header class="fixed w-full z-20 shadow-md shadow-indigo-100 bg-white">
    <nav
      class="container mx-auto max-w-screen-lg px-4 py-2 flex align-middle justify-between"
    >
      <nuxt-link to="/" class="flex gap-1 items-center">
        <span class="text-1xl font-bold">WP-Scraper</span>
      </nuxt-link>
      <ul class="flex">
        <li v-for="link in links" :key="link.label" class="p-2 hover">
          <nuxt-link
            :to="link.to"
            class="uppercase text-xs font-medium hover:text-blue-600"
            :class="getLinkClass(link.to)"
            >{{ link.label }}</nuxt-link
          >
        </li>
      </ul>
      <div class="header-controls flex items-center">
        <!--        <Icon name="carbon:awake" /> -->
        <!--        <Icon name="carbon:asleep" /> -->
        <nuxt-link
          to="/auth/login"
          class="text-sm/6 font-semibold text-gray-900 mr-2"
          >Log in</nuxt-link
        >
        <nuxt-link
          to="/auth/register"
          class="rounded-md border border-gray-600 bg-gray-200 px-2 py-1.5 text-sm font-semibold hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Sign in</nuxt-link
        >
      </div>
    </nav>
  </header>
</template>
