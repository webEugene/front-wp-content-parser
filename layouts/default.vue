<script setup lang="ts"></script>

<template>
  <div>
    <the-header />
    <main class="w-full pt-14">
      <slot />
      <support-me />
    </main>
    <the-footer />
  </div>
</template>

<style lang="scss" scoped>
main {
  min-height: calc(-357px + 100vh);
}
</style>
