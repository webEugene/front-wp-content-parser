<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const urlSchema = toTypedSchema(
  z
    .string()
    .refine(
      (value) =>
        !value ||
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(
          value,
        ),
      {
        message: "Please provide a valid URL",
      },
    ),
);
const { value: url, errorMessage } = useField("url", urlSchema);

const response = ref(null);
const error = ref(null);
const loading = ref(false);
const formattedList = ref("");

async function getSitemapUrl() {
  try {
    loading.value = true;
    // Use fetch with proper URL parameter
    const { data, error: fetchError } = await useFetch(
      "/api/extract/sitemap-list-extract",
      {
        params: { url: url.value },
      },
    );

    if (fetchError.value) {
      error.value = fetchError.value.data.data.message;
      response.value = null;
      formattedList.value = "";
    } else {
      const rawData = toRaw(data.value); // Access the raw data
      response.value = data.value;
      error.value = null;

      if (Array.isArray(rawData.data)) {
        formattedList.value = rawData.data.join("\n");
      } else {
        formattedList.value = "The response does not contain a valid array.";
      }
    }
  } catch (err) {
    error.value = err.data.data.message || "Something went wrong!";
    response.value = null;
    formattedList.value = "";
  } finally {
    loading.value = false;
  }
}
// https://seositecheckup.com/
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <div class="p-5 bg-amber-100">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        Sitemap URL Extractor
      </h1>
    </div>
    <div
      class="form-wp-check w-2/4 p-2 mx-auto flex justify-center"
      :class="errorMessage ? 'items-baseline' : 'items-center'"
    >
      <div class="w-96">
        <input
          v-model="url"
          name="url"
          type="text"
          placeholder="Enter a valid URL"
          class="block w-full rounded-l-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <span v-if="errorMessage" class="error font-bold text-amber-700">{{
          errorMessage
        }}</span>
      </div>

      <button
        class="flex disabled:opacity-75 disabled:pointer-events-none rounded-r-md bg-indigo-600 px-5 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        :disabled="!url || errorMessage || loading"
        @click.prevent="getSitemapUrl"
      >
        <svg
          v-if="loading"
          class="w-5 h-5 mr-2 animate-spin"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <circle
            class="text-blue-200"
            cx="25"
            cy="25"
            r="20"
            stroke="white"
            stroke-width="6"
          ></circle>
          <circle
            class="text-blue-600"
            cx="25"
            cy="25"
            r="20"
            stroke="gray"
            stroke-width="6"
            stroke-dasharray="125.6"
            stroke-dashoffset="100"
          ></circle>
        </svg>
        <span v-if="!loading">Extract</span>
        <span v-else>Processing... </span>
      </button>
    </div>
    <div v-if="response && response.data && response.data.length">
      <span class="font-medium">Total: {{ response.data.length }} links</span>
      <div class="mt-2">
        <textarea
          id="response-text"
          v-model="formattedList"
          name="response-text"
          rows="5"
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-2 outline-green-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        ></textarea>
      </div>
    </div>
    <div
      v-if="error"
      class="bg-orange-600 p-3 rounded-md font-medium text-white"
    >
      <span>{{ error }}</span>
    </div>
  </div>
</template>
