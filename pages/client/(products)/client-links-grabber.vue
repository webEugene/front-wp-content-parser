<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { urlWithMessageSchema } from "~/schemas/urlSchema";
import { ERROR_MESSAGES } from "~/constants";
import type { GrabLinksType } from "~/server/schemas/grabLinksSchema";

definePageMeta({
  layout: "client-template",
});

const urlSchema = toTypedSchema(urlWithMessageSchema);
const { value: url, errorMessage } = useField("url", urlSchema);

const response = ref<GrabLinksType | null>(null);
const error = ref<string | null>(null);
const loading = ref(false);

async function grabLinks(): Promise<void> {
  if (!url.value) return;
  resetState();
  loading.value = true;

  try {
    const result = await $fetch<GrabLinksType>("/api/client/link-grabber", {
      params: { url: url.value },
    });

    response.value = result ?? null;
    url.value = "";
  } catch (err) {
    handleError(err);
  } finally {
    loading.value = false;
  }
}

function handleError(err: unknown): void {
  response.value = null;
  if (isErrorWithMessage(err) || err instanceof Error) {
    error.value = (err as Error).message;
    return;
  }
  error.value = ERROR_MESSAGES.SERVER_ERROR;
}

function resetState(): void {
  error.value = null;
  response.value = null;
}

const disabledBtn = computed(() => {
  return !url.value || !!errorMessage.value || loading.value;
});

// const { downloadJSON, downloadCSV } = useDownload();
</script>

<template>
  <div>
    <heading-page heading="Link Grabber" :client="true" />
    <div class="wrapper mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div
        class="form-wp-check sm:w-full w-2/4 p-2 mx-auto flex flex-col justify-center items-center"
      >
        <div class="w-64 sm:w-96">
          <base-input
            id="input-link-grabber"
            v-model:input-value="url"
            placeholder="Enter https://sample.com or sample.com"
            :error-message="!!errorMessage"
          />
          <span v-if="errorMessage" class="error font-bold text-amber-700">{{
            errorMessage
          }}</span>
        </div>

        <base-button
          class="flex rounded mt-3 min-w-40 justify-center"
          :disabled="disabledBtn"
          @click.prevent="grabLinks"
        >
          <progress-circle-svg v-if="loading" />
          <span>{{ loading ? "Processing..." : "Find" }}</span>
        </base-button>
      </div>

      <contacts-tab
        :contacts="response?.contacts ?? null"
        :is-blocked="response?.access?.isBlocked ?? false"
        :blocker-type="response?.access?.blockerType ?? null"
      />
      <social-tab :social="response?.social ?? null" />
      <base-alert v-if="error" type="error">
        <span>{{ error }}</span>
      </base-alert>
    </div>
    <content-wrapper />
  </div>
</template>
