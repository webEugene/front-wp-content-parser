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

    if (fetchError.value && fetchError.value?.statusCode === 500) {
      error.value =
        "Something went wrong. Please check your internet connection. Or try a bit later";
      response.value = null;
      formattedList.value = "";
    } else if (fetchError.value) {
      error.value = fetchError.value.data.data.message;
      response.value = null;
      formattedList.value = "";
    } else {
      const rawData = toRaw(data.value); // Access the raw data
      response.value = data.value;
      error.value = null;
      url.value = "";

      if (Array.isArray(rawData.data.allowedLinks)) {
        formattedList.value = rawData.data.allowedLinks.join("\n");
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

const { downloadJSON, downloadCSV } = useDownload();
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
        <div
          class="inline-block rounded-md bg-blue-600 mt-5 py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm"
        >
          There is <strong>FREE</strong> 1000 links limit are available.
        </div>
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
          <span v-if="!loading">Extract</span>
          <span v-else>Processing... </span>
        </base-button>
      </div>
      <div v-if="response?.data && response.data.allowedLinks">
        <div
          class="flex flex-col justify-center items-center py-2 md:flex-row md:items-end md:justify-between"
        >
          <div class="flex flex-col">
            <span class="font-medium"
              ><b>Total</b>: {{ response.data.total }} links</span
            >
            <span class="font-medium"
              ><b>Free to use</b>:
              {{ response.data.allowedLinks.length }} links</span
            >
          </div>
          <div class="flex flex-col">
            <button
              class="rounded bg-indigo-600 hover:bg-indigo-400 mb-2 px-3 py-1 text-white font-medium flex items-center"
            >
              <icon name="carbon:document-download" class="mr-1" />
              <span
                class="text-sm"
                @click="
                  downloadJSON(
                    response.data.allowedLinks,
                    cleanHostname(response.data.allowedLinks[0])
                  )
                "
                >Download JSON</span
              >
            </button>
            <button
              class="rounded bg-indigo-600 hover:bg-indigo-400 px-3 py-1 text-white font-medium flex items-center"
            >
              <icon name="carbon:document-download" class="mr-1" />
              <span
                class="text-sm"
                @click="
                  downloadCSV(
                    response.data.allowedLinks,
                    cleanHostname(response.data.allowedLinks[0])
                  )
                "
                >Download CSV</span
              >
            </button>
          </div>
        </div>
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
        Just enter any domain — with or without https — and click
        <b>“Extract”</b>. No need for <code>sitemap.xml</code> or any extra
        paths like other tools require. Our service automatically finds the
        sitemap, parses all links, and delivers a clean, ready-to-use list.
        Fast, effortless, and truly hassle-free data extraction.
      </p>
    </content-wrapper>
  </div>
</template>
