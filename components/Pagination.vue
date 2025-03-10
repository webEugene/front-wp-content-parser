<script setup lang="ts">
const props = defineProps<{
  items: number[];
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  currentPage: number;
}>();
</script>

<template>
  <nav class="mb-4 flex justify-center space-x-4" aria-label="Pagination">
    <button
      class="rounded-lg border border-teal-500 px-2 py-2 text-gray-700"
      :class="{
        'disabled:opacity-75 disabled:pointer-events-none': isPrevDisabled,
      }"
      :disabled="isPrevDisabled"
      @click="$emit('prevClicked')"
    >
      <icon name="charm:chevron-left" size="1.3em" />
      Previous
    </button>
    <div v-for="page in items" :key="page">
      <button
        v-if="currentPage === page"
        class="disabled:pointer-events-none rounded-lg border border-teal-500 bg-teal-500 px-3 py-2 text-white"
      >
        {{ page }}
      </button>
      <button
        v-else
        class="rounded-lg border border-teal-500 px-4 py-2 text-gray-700"
        @click="$emit('toPage', page)"
      >
        {{ page }}
      </button>
    </div>
    <button
      class="rounded-lg border border-teal-500 px-2 py-2 text-gray-700"
      :class="{
        'disabled:opacity-75 disabled:pointer-events-none': isNextDisabled,
      }"
      :disabled="isNextDisabled"
      @click="$emit('nextClicked')"
    >
      Next
      <icon name="charm:chevron-right" />
    </button>
  </nav>
</template>

<style scoped></style>
