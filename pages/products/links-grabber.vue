<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { urlWithMessageSchema } from "~/schemas/urlSchema";

// https://chromewebstore.google.com/detail/link-grabber/caodelkhipncidmoebgbbeemedohcdma
// Function to get the class for a link
useSeoMeta({
  title: "Link Grabber Tool | Extract All Links from Any Webpage",
  description:
    "Grab all links from an HTML page in seconds. Use our fast and simple tool to extract, view, and analyze every URL on a web page.",
});

definePageMeta({
  key: (route) => route.fullPath,
});

interface ILinkData {
  link: string;
  title: string;
  origin: string;
}

const urlSchema = toTypedSchema(urlWithMessageSchema);

const { value: url, errorMessage } = useField("url", urlSchema);

const response = useState("response", () => ({ data: [], domain: "" }));
const error = ref(null);
const loading = ref(false);

const filters = ref([
  { name: "Hide duplicate links", checked: false, action: "duplicate" },
  { name: "Group by domain", checked: false, action: "group" },
  { name: "Hide same origin", checked: false, action: "same" },
  // { name: "Show only same origin", checked: false, action: "same-only" },
]);

async function grabLink() {
  try {
    loading.value = true;
    // Use fetch with proper URL parameter
    const { data, error: fetchError } = await useFetch(
      "/api/extract/grab-links",
      {
        params: { url: url.value },
      }
    );

    if (fetchError.value && fetchError.value?.statusCode === 500) {
      error.value =
        "Something went wrong. Please check your internet connection. Or try a bit later";
      response.value = null;
    } else if (fetchError.value) {
      error.value = fetchError.value.message;
      response.value = null;
    } else {
      response.value = data.value;
      error.value = null;
      url.value = "";
    }
  } catch (err) {
    error.value = err.message || "Something went wrong!";
    response.value = null;
  } finally {
    loading.value = false;
  }
}

const filteredItems = computed(() => {
  if (!response || !response.value.data) return [];

  const selectedFilters = filters.value
    .filter((f) => f.checked)
    .map((f) => f.action);

  if (selectedFilters.length === 0) return response.value.data; // Show all if no filter selected

  let newList: ILinkData[] = [...response.value.data];

  if (selectedFilters.includes("group")) {
    newList.sort((a, b) => a?.origin.localeCompare(b?.origin));
  }

  if (selectedFilters.includes("duplicate")) {
    newList = Array.from(new Set(newList.map((a) => a.link))).map((link) => {
      return newList.find((a) => a.link === link);
    });
  }

  if (selectedFilters.includes("same-only")) {
    newList = newList.filter((item) => {
      return item?.link === response.value.domain;
    });
  }

  return newList.filter((item) => {
    return !(
      selectedFilters.includes("same") && item?.link === response.value.domain
    );
  });
});

const disabledBtn = computed(() => {
  return !url.value || !!errorMessage.value || loading.value;
});

onBeforeRouteLeave(() => {
  response.value = { data: [], domain: "" };
  error.value = null;
  loading.value = false;

  filters.value = filters.value.map((f) => ({ ...f, checked: false }));
});

const { downloadJSON, downloadCSV } = useDownload();
// TODO:
// - Link grabber page:
// -- add domain to a path if link grabbed from not home page;
</script>

<template>
  <div>
    <heading-page heading="Link Grabber">
      <template #text>
        <p>
          Our Link Grabber tool scans the HTML and displays all found URLs in a
          clean, easy-to-use format — perfect for SEO, research, and analysis.
        </p>
      </template>
    </heading-page>
    <div class="wrapper mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div
        class="form-wp-check sm:w-full w-2/4 p-2 mx-auto flex flex-col justify-center items-center"
      >
        <div class="w-64 sm:w-96">
          <base-input
            id="id-link-grabber"
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
          @click.prevent="grabLink"
        >
          <progress-circle-svg v-if="loading" />
          <span v-if="!loading">Extract</span>
          <span v-else>Processing... </span>
        </base-button>
      </div>
      <div v-if="response && response.data && response.data.length">
        <div class="my-3 text-xl font-bold text-blue-600">
          {{ response.domain }}
        </div>
        <div class="font-medium">
          <strong
            >Total: {{ filteredItems.length }} /
            {{ response.data.length }} links</strong
          >
        </div>
        <div
          class="flex flex-col justify-center items-center py-2 md:flex-row md:items-end md:justify-between"
        >
          <div class="flex flex-col mb-2 sm:flex-row sm:mb-0">
            <div v-for="filter in filters" :key="filter.name" class="mr-2">
              <label class="inline-flex items-center hover:cursor-pointer">
                <input
                  v-model="filter.checked"
                  type="checkbox"
                  class="w-4 h-4 accent-teal-600"
                />
                <span class="ml-2">{{ filter.name }}</span>
              </label>
            </div>
          </div>

          <div v-if="filteredItems.length" class="flex flex-col">
            <button
              class="rounded bg-indigo-600 hover:bg-indigo-400 mb-2 px-3 py-1 text-white font-medium flex items-center"
            >
              <icon name="carbon:document-download" class="mr-1" />
              <span
                class="text-sm"
                @click="
                  downloadJSON(filteredItems, cleanHostname(response.domain))
                "
                >Download JSON format</span
              >
            </button>
            <button
              class="rounded bg-indigo-600 hover:bg-indigo-400 px-3 py-1 text-white font-medium flex items-center"
            >
              <icon name="carbon:document-download" class="mr-1" />
              <span
                class="text-sm"
                @click="
                  downloadCSV(filteredItems, cleanHostname(response.domain))
                "
                >Download CSV format</span
              >
            </button>
          </div>
        </div>
        <ul class="border rounded p-2 mt-4">
          <li
            v-for="(list, idx) of filteredItems"
            :key="idx"
            class="even:bg-gray-200 truncate p-1"
          >
            <nuxt-link
              :to="list.link"
              class="text-sm hover:border-b-2 hover:border-dashed border-indigo-400"
              target="_blank"
              >{{ list.link }}</nuxt-link
            >
            <span
              class="block text-sm text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
            >
              Title: {{ list.title }}
            </span>
          </li>
        </ul>
      </div>
      <base-alert v-if="error" type="error">
        <span>{{ error }}</span>
      </base-alert>
    </div>
    <content-wrapper>
      <h2 class="text-center mb-2 text-2xl font-semibold">
        How to Use Link Grabber
      </h2>
      <p>
        Simply enter any webpage URL — with or without https — into the input
        field and press “Grab”. The tool instantly scans the page’s HTML and
        collects every link it finds. Within seconds, you’ll get a clean,
        organized list of URLs perfect for SEO tasks, research, or deeper
        website analysis. Fast, effortless, and highly effective.
      </p>
    </content-wrapper>
  </div>
</template>
