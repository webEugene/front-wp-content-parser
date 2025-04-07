<script setup lang="ts">
type ButtonType = "button" | "submit" | "reset";
type Variant = "primary" | "secondary" | "outline";

defineProps<{
  type?: ButtonType;
  variant?: Variant;
  disabled?: boolean;
}>();

// const emit = defineEmits<{
//   (event: 'click', e: MouseEvent): void;
// }>();
//
// const buttonClasses = computed(() => {
//   const base = 'px-4 py-2 rounded-lg font-medium transition';
//   const variants = {
//     primary: 'bg-blue-500 text-white hover:bg-blue-600',
//     secondary: 'bg-gray-500 text-white hover:bg-gray-600',
//     outline: 'border border-gray-500 text-gray-500 hover:bg-gray-100',
//   };
//
//   return `${base} ${variants[props.variant ?? 'primary']} ${
//     props.disabled ? 'opacity-50 cursor-not-allowed' : ''
//   }`;
// });
//
// const handleClick = (event: MouseEvent) => {
//   if (!props.disabled) {
//     emit('click', event);
//   }
// };
</script>

<template>
  <button
    :type="type"
    class="disabled:opacity-75 disabled:pointer-events-none bg-indigo-600 px-5 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped></style>
