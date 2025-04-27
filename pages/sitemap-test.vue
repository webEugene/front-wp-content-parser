<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import HeadingPage from "~/components/molecules/HeadingPage.vue";
import { urlWithMessageSchema } from "~/schemas/urlSchema";
import ProgressCircleSvg from "~/components/atoms/ProgressCircleSvg.vue";
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseAlert from "~/components/atoms/BaseAlert.vue";

const urlSchema = toTypedSchema(urlWithMessageSchema);
const { value: url, errorMessage } = useField("url", urlSchema);

const response = ref(null);
const error = ref(null);
const loading = ref(false);
const copied = ref(false);

async function getSitemapUrl() {
  try {
    loading.value = true;

    const { data, error: fetchError } = await useFetch(
      "/api/detect/sitemap-detect",
      {
        params: { url: url.value },
      },
    );

    if (fetchError.value) {
      error.value = fetchError.value.data.data.message;
      response.value = null;
    } else {
      response.value = data.value;
      error.value = null;
      url.value = "";
    }
  } catch (err) {
    error.value = err.data.data.message || "Something went wrong!";
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
  <div>
    <heading-page heading="Sitemap Test">
      <template #text>
        <p>
          Check if the website has a sitemap. A sitemap is important as it lists
          all the web pages of the site and let search engine crawlers to crawl
          the website more intelligently. A sitemap also provides valuable
          metadata for each webpage.
        </p>
      </template>
    </heading-page>
    <div class="wrapper mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div
        class="form-wp-check w-2/4 p-2 mx-auto flex flex-col justify-center"
        :class="errorMessage ? 'items-baseline' : 'items-center'"
      >
        <div class="w-96">
          <input
            v-model="url"
            name="url"
            type="text"
            placeholder="Enter a valid URL"
            class="block w-full rounded bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          <span v-if="errorMessage" class="error font-bold text-amber-700">{{
            errorMessage
          }}</span>
        </div>

        <base-button
          class="flex rounded mt-3 min-w-40 justify-center"
          :disabled="!url || errorMessage || loading"
          @click.prevent="getSitemapUrl"
        >
          <progress-circle-svg v-if="loading" />
          <span v-if="!loading">Checkup</span>
          <span v-else>Processing... </span>
        </base-button>
      </div>
      <div
        v-if="response && response.data"
        class="flex flex-row align-middle border-2 border-green-400 p-2 rounded"
      >
        <div class="flex pr-5 w-2/5">
          <icon
            size="1.5em"
            style="color: limegreen"
            name="ooui:success"
            class="mr-2"
          />
          <span class="font-medium">Sitemap test</span>
        </div>
        <div class="ml-1 flex flex-col relative">
          <span class="text-xs">This website has a sitemap file:</span>
          <div class="flex items-center">
            <nuxt-link
              :to="response.data"
              target="_blank"
              class="font-medium text-purple-700 border-b border-purple-700 border-dashed"
              >{{ response.data }}</nuxt-link
            >
            <button @click="copyToClipboard">
              <icon
                size="1.2em"
                name="material-symbols:content-copy-outline"
                class="ml-2 bg-gray-500"
              />
              <span
                v-if="copied"
                class="border rounded px-1 absolute bg-white -top-3 left-0 w-full"
                >Copied to clipboard!</span
              >
            </button>
          </div>
        </div>
      </div>

      <base-alert v-if="error" type="error">
        <span>{{ error }}</span>
      </base-alert>
    </div>
  </div>
</template>
