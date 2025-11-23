<script setup lang="ts">
type InputType = "text" | "submit" | "reset";

const { errorMessage = false } = defineProps<{
  id: string;
  type?: InputType;
  placeholder?: string;
  errorMessage?: boolean;
  inputValue?: string;
}>();

defineEmits(["update:inputValue"]);
</script>

<template>
  <input
    :id="id"
    :value="inputValue"
    :type="type ?? `text`"
    :placeholder="placeholder"
    class="block w-full rounded bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
    :class="
      errorMessage
        ? 'outline-red-500 focus:outline-red-500'
        : 'outline-gray-300 focus:outline-indigo-600'
    "
    @input="$emit('update:inputValue', $event.target?.value)"
  />
</template>

<style scoped></style>
