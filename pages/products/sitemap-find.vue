<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { urlWithMessageSchema } from "~/schemas/urlSchema";

useSeoMeta({
  title: "Sitemap Find Tool | Instantly Check for Website Sitemaps",
  description:
    "Quickly test if a website has a sitemap. Fast, accurate, and free.",
});

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

    if (fetchError.value && fetchError.value?.statusCode === 500) {
      error.value =
        "Something went wrong. Please check your internet connection. Or try a bit later";
      response.value = null;
    } else if (fetchError.value) {
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

const copyToClipboard = async (sitemap) => {
  try {
    // Access the element's text content
    const text = sitemap;

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

const disabledBtn = computed(() => {
  return !url.value || !!errorMessage.value || loading.value;
});
</script>

<template>
  <div>
    <heading-page heading="Sitemap Find">
      <template #text>
        <p>
          Sitemaps help search engines crawl and understand a site better. Our
          tool quickly detects sitemaps and shows what’s inside — including
          valuable page metadata.
        </p>
      </template>
    </heading-page>
    <div class="wrapper mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div
        class="form-wp-check w-2/4 p-2 mx-auto flex flex-col justify-center items-center"
      >
        <div class="w-64 sm:w-96">
          <base-input
            id="id-sitemap-find"
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
          @click.prevent="getSitemapUrl"
        >
          <progress-circle-svg v-if="loading" />
          <span v-if="!loading">Find</span>
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
          <span class="font-medium">Sitemap found</span>
        </div>
        <div class="ml-1 flex flex-col relative">
          <span class="text-xs">This website has a sitemap file:</span>
          <div
            v-for="(sitemap, index) in response.data"
            :key="index"
            class="flex items-center"
          >
            <nuxt-link
              :to="sitemap"
              target="_blank"
              class="font-medium text-purple-700 border-b border-purple-700 border-dashed"
              >{{ sitemap }}</nuxt-link
            >
            <button @click="copyToClipboard(sitemap)">
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
    <content-wrapper>
      <h2 class="text-center mb-2 text-2xl font-semibold">
        How to Use Sitemap Find
      </h2>
      <p>
        Just enter a domain — with or without https — into the search field and
        hit “Find”. Our tool instantly scans the website, automatically detects
        available sitemaps, and reveals what’s inside them, including valuable
        page metadata. Fast, accurate, and effortless.
      </p>
    </content-wrapper>
  </div>
</template>
