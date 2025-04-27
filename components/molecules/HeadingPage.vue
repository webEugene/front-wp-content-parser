<script setup lang="ts">
defineProps<{
  heading: string;
}>();
</script>

<template>
  <div class="p-5 bg-blue-50">
    <div class="mx-auto max-w-5xl text-center">
      <h1 class="mb-3 text-3xl font-bold tracking-tight text-indigo-950">
        {{ heading }}
      </h1>
      <slot name="text" />
      <p></p>
    </div>
  </div>
</template>

<style scoped></style>
