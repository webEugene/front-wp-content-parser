<template>
  <client-only>
    <a :href="emailHref" v-bind="$attrs">
      <slot>{{ emailText }}</slot>
    </a>
  </client-only>
</template>

<script setup>
const props = defineProps({
  user: { type: String, required: true },
  domain: { type: String, required: true },
  label: { type: String, default: null },
});

const emailText = computed(() => `${props.user}@${props.domain}`);
const emailHref = computed(() => `mailto:${emailText.value}`);
</script>
