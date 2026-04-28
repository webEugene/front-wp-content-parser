<template>
  <div class="flex justify-center">
    <SignUp :force-redirect-url="'/client'" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>
