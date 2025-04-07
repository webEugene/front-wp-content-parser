<script setup lang="ts">
type AlertType = "success" | "error" | "warning" | "info";

const props = defineProps<{
  type?: AlertType;
}>();

const alertClasses = computed(() => {
  const base =
    "px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg";
  const variants = {
    success: "bg-green-200",
    error: "bg-red-200",
    warning: "bg-yellow-200",
    info: "bg-blue-200",
  };

  return `${base} ${variants[props.type ?? "success"]}`;
});

const alertTextColors = computed(() => {
  const variants = {
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-yellow-600",
    info: "text-blue-800",
  };

  return `${variants[props.type ?? "success"]}`;
});

const alertIconName = computed(() => {
  const variants = {
    success: "ep:success-filled",
    error: "ic:round-error",
    warning: "bxs:error",
    info: "solar:info-circle-bold",
  };

  return `${variants[props.type ?? "success"]}`;
});
</script>

<template>
  <div :class="alertClasses">
    <icon :name="alertIconName" size="1.3em" :class="alertTextColors" />
    <span :class="alertTextColors"><slot /></span>
  </div>
</template>

<style scoped></style>
