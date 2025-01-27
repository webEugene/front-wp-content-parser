<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const links = ref([
  { label: 'WP Check',to: '/wp-check'},
  {
    label: 'Sitemap test',
    to: '/sitemap-test',
  },
  {
    label: 'Sitemap Extractor',
    to: '/sitemap-extractor',
  }
]);

// Function to get the class for a link
const getLinkClass = (path: string) => {
  return route.path === path
      ? "text-blue-600 font-bold" // Active link styles
      : "text-gray-700 hover:text-blue-600"; // Inactive link styles
};
</script>

<template>
  <header class="border-b border-gray-200 dark:border-gray-800">
    <nav class="container mx-auto max-w-screen-lg px-4 py-4 flex align-middle justify-between">
      <NuxtLink to="/" class="flex gap-1 items-center">
        <span class="text-1xl font-bold">WP-Scraper</span>
      </NuxtLink>
      <ul class="flex">
        <li v-for="link in links" class="p-2 hover" :key="link.label">
          <NuxtLink :to="link.to" class="uppercase text-xs font-medium hover:text-purple-700" :class="getLinkClass(link.to)">{{link.label}}</NuxtLink>
        </li>
      </ul>
      <div class="header-controls flex items-center">
<!--        <Icon name="carbon:awake" />-->
<!--        <Icon name="carbon:asleep" />-->
        <NuxtLink to="/auth/login" class="text-sm/6 font-semibold text-gray-900 mr-2">Log in</NuxtLink>
        <NuxtLink to="/auth/register" class="rounded-md border border-gray-600 bg-gray-200 px-2 py-1.5 text-sm font-semibold hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</NuxtLink>
      </div>
    </nav>
  </header>
</template>