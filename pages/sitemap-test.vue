<script setup lang="ts">
import { ref } from 'vue';
import { useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const urlSchema = toTypedSchema(
    z.string().refine(value => !value || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(value), {
      message: 'Please provide a valid URL',
    }),
);
const { value: url, errorMessage } = useField('url', urlSchema);

const response = ref(null);
const error = ref(null);
const loading = ref(false)
const copied = ref(false);

async function getSitemapUrl() {
  try {
    loading.value = true;
    // Use fetch with proper URL parameter
    const { data, error: fetchError } = await useFetch('/api/detect/sitemap-detect', {
      params: { url: url.value },
    });

    if (fetchError.value) {
      error.value = fetchError.value.data.data.message;
      response.value = null;
    } else {
      response.value = data.value;
      error.value = null;
    }
  } catch (err) {
    error.value = err.data.data.message || 'Something went wrong!';
    response.value = null;
  } finally {
    loading.value = false;
  }
}

const copyToClipboard = async () => {
  try {
    // Access the element's text content
    const text = response.value.data;

    if (!text) throw new Error("No text to copy");

    // Use the Clipboard API to copy text
    await navigator.clipboard.writeText(text);

    // Show feedback
    copied.value = true;

    // Reset the feedback after 2 seconds
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    console.error("Failed to copy text:", error);
  }
};
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <div class="p-5 bg-amber-100">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        Sitemap Test
      </h1>
      <div>Check if the website has a sitemap. A sitemap is important as it lists all the web pages of the site and let search engine crawlers to crawl the website more intelligently. A sitemap also provides valuable metadata for each webpage.</div>
    </div>
    <div class="form-wp-check w-2/4 p-2 mx-auto flex justify-center"
      :class="errorMessage ? 'items-baseline' : 'items-center'"
    >
      <div class="w-96">
        <input
            name="url"
            v-model="url"
            type="text"
            placeholder="Enter a valid URL"
            class="block w-full rounded-l-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        >
        <span
            v-if="errorMessage"
            class="error font-bold text-amber-700"
        >{{ errorMessage }}</span>
      </div>

      <button class="flex disabled:opacity-75 disabled:pointer-events-none rounded-r-md bg-indigo-600 px-5 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click.prevent="getSitemapUrl" :disabled="!url || errorMessage || loading">
        <svg v-if="loading" class="w-5 h-5 mr-2 animate-spin" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none">
          <circle class="text-blue-200" cx="25" cy="25" r="20" stroke="white" stroke-width="6"></circle>
          <circle class="text-blue-600" cx="25" cy="25" r="20" stroke="gray" stroke-width="6" stroke-dasharray="125.6" stroke-dashoffset="100"></circle>
        </svg>
        <span v-if="!loading">Checkup</span>
        <span v-else>Processing... </span>
      </button>
    </div>
    <div v-if="response && response.data" class="flex flex-row align-middle border-2 border-green-400 p-2 rounded">
      <div class="flex pr-5 w-2/5">
        <Icon size="1.5em" style="color: limegreen" name="ooui:success" class="mr-2"/>
        <span class="font-medium">Sitemap test</span>
      </div>
      <div class="ml-1 flex flex-col relative">
        <span class="text-xs">This website has a sitemap file:</span>
        <div class="flex items-center">
          <NuxtLink :to="response.data" target="_blank" class="font-medium text-purple-700 border-b border-purple-700 border-dashed">{{response.data}}</NuxtLink>
          <button @click="copyToClipboard">
            <Icon size="1.2em" name="material-symbols:content-copy-outline" class="ml-2 bg-gray-500"/>
            <span v-if="copied" class="border rounded px-1 absolute bg-white -top-3 left-0 w-full">Copied to clipboard!</span>
          </button>

        </div>
      </div>
    </div>

    <div class="bg-orange-600 p-3 rounded-md font-medium text-white" v-if="error">
      <span>{{error}}</span>
    </div>
  </div>
</template>
