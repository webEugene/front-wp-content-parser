<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { urlWithMessageSchema } from "~/schemas/urlSchema";

useSeoMeta({
  title: "Free Sitemap Extractor – Get All Links from Any Sitemap Instantly",
  description:
    "Extract all URLs from any sitemap.xml file in seconds. Use Sitemap Extractor to analyze, audit, or process links easily. Fast, free, and SEO-friendly.",
});

const urlSchema = toTypedSchema(urlWithMessageSchema);
const { value: url, errorMessage } = useField("url", urlSchema);

const response = ref(null);
const error = ref(null);
const loading = ref(false);
const formattedList = ref("");

async function getSitemapUrl() {
  try {
    loading.value = true;

    const { data, error: fetchError } = await useFetch(
      "/api/extract/sitemap-list-extract",
      {
        params: { url: url.value },
      }
    );

    if (fetchError.value) {
      error.value = fetchError.value.data.data.message;
      response.value = null;
      formattedList.value = "";
    } else {
      const rawData = toRaw(data.value); // Access the raw data
      response.value = data.value;
      error.value = null;
      url.value = "";

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

const disabledBtn = computed(() => {
  return !url.value || !!errorMessage.value || loading.value;
});
// https://seositecheckup.com/
</script>

<template>
  <div>
    <heading-page heading="Sitemap Extractor">
      <template #text>
        <p>
          Sitemap Extractor parses all links from <strong>sitemap</strong> and
          give you a list of links for easy usage.
        </p>
      </template>
    </heading-page>
    <div class="wrapper mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div
        class="form-wp-check w-2/4 p-2 mx-auto flex flex-col justify-center items-center"
      >
        <div class="w-64 sm:w-96">
          <base-input
            id="id-sitemap-extractor"
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
          @click.prevent="getSitemapUrl"
        >
          <progress-circle-svg v-if="loading" />
          <span v-if="!loading">Extract</span>
          <span v-else>Processing... </span>
        </base-button>
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
      <base-alert v-if="error" type="error">
        <span>{{ error }}</span>
      </base-alert>
    </div>
    <content-wrapper>
      <h2 class="text-center mb-2 text-2xl font-semibold">
        How to Use Sitemap Extractor
      </h2>
      <p>
        Enter any domain — with or without https — into the input field and
        click “Extract”. The tool automatically finds the site’s sitemap, parses
        all available links, and delivers a clean, ready-to-use list. Quick,
        simple, and perfect for effortless data extraction.
      </p>
    </content-wrapper>
  </div>
</template>
