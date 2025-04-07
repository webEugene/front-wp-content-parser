<template>
  <app-header />
  <main class="w-full">
    <slot />
  </main>
  <app-footer />
</template>

<script setup lang="ts">
import AppHeader from "~/components/appHeader.vue";
import AppFooter from "~/components/appFooter.vue";
</script>
