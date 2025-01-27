<template>
    <AppHeader />
    <main class="w-full">
      <slot />
    </main>

</template>
<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
</script>