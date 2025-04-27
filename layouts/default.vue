<template>
  <app-header />
  <main class="w-full">
    <slot />
  </main>
  <app-footer />
</template>

<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
</script>
