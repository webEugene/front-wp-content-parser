<script setup lang="ts">
definePageMeta({
  layout: "client-template",
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-6">Home</h1>
    <div class="mt-8 bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NuxtLink
          to="/client/client-wp-check"
          class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Icon
            name="material-symbols:search-gear-rounded"
            size="2em"
            class="text-blue-500"
          />
          <div>
            <h3 class="font-semibold">WP Check</h3>
            <p class="text-sm text-gray-600">Check WordPress installations</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/client/client-sitemap-find"
          class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Icon
            name="material-symbols:search"
            size="2em"
            class="text-green-500"
          />
          <div>
            <h3 class="font-semibold">Sitemap Find</h3>
            <p class="text-sm text-gray-600">Find website sitemaps</p>
          </div>
        </NuxtLink>
        <NuxtLink
          to="/client/client-links-grabber"
          class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Icon
            name="material-symbols:search"
            size="2em"
            class="text-green-500"
          />
          <div>
            <h3 class="font-semibold">Links Grabber</h3>
            <p class="text-sm text-gray-600">
              Scans HTML and displays all found URL
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
