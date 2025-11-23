<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <div>
    <the-header />
    <main class="w-full pt-14">
      <div>
        <heading-page :heading="error.statusMessage">
          <template #text>
            <nuxt-link
              to="/"
              class="rounded mr-2 bg-indigo-600 px-5 py-1.5 text-sm/6 text-white shadow-sm hover:bg-indigo-500"
              >Go back home</nuxt-link
            >
          </template>
        </heading-page>
      </div>
      <support-me />
    </main>
    <the-footer />
  </div>
  <div></div>
</template>
