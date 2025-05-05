<script setup lang="ts">
import BaseInput from "~/components/atoms/BaseInput.vue";
import BaseButton from "~/components/atoms/BaseButton.vue";
import ProgressCircleSvg from "~/components/atoms/ProgressCircleSvg.vue";

defineProps<{
  url: string;
  errorMessage?: string;
  disabledBtn: boolean;
  loading: boolean;
}>();

defineEmits<{
  (e: "check-url"): void;
}>();
</script>

<template>
  <div
    class="form-wp-check w-2/4 p-2 mx-auto flex flex-col justify-center"
    :class="errorMessage ? 'items-baseline' : 'items-center'"
  >
    <div class="w-96">
      <base-input
        v-model:input-value="url"
        placeholder="Enter a valid URL"
        :error-message="!!errorMessage"
      />
      <span v-if="errorMessage" class="error font-bold text-amber-700">{{
        errorMessage
      }}</span>
    </div>
    <base-button
      class="flex rounded mt-3 min-w-40 justify-center"
      :disabled="disabledBtn"
      @click.prevent="$emit('check-url')"
    >
      <progress-circle-svg v-if="loading" />
      <span v-if="!loading">Checkup</span>
      <span v-else>Processing... </span>
    </base-button>
  </div>
</template>

<style scoped></style>
