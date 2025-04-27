<template>
  <div>
    <app-header />
    <main class="w-full pt-14">
      <slot />
    </main>
    <app-footer />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
</script>
