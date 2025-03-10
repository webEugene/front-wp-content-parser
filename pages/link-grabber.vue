<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

interface ILinkData {
  link: string;
  title: string;
  origin: string;
}

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
      },
    );

    if (fetchError.value) {
      error.value = fetchError.value.message;
      response.value = null;
    } else {
      response.value = data.value;
      error.value = null;
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

// TODO:
// - Link grabber page:
// -- return empty result if url not exists and stop continues loading;
// -- add domain to a path if link grabbed from not home page;
// -- add load button to save all links as csv;
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <div class="p-5 bg-amber-100">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        Link Grabber
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
        @click.prevent="grabLink"
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
      <div class="my-3 text-xl font-bold text-blue-600">{{ url }}</div>
      <span class="font-medium"
        >Total: {{ filteredItems.length }} /
        {{ response.data.length }} links</span
      >
      <div class="flex justify-between">
        <div class="flex">
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

        <button
          class="rounded bg-indigo-600 hover:bg-indigo-400 px-3 py-1 text-white font-medium flex items-center"
        >
          <icon name="carbon:document-download" class="mr-1" />
          <span class="text-sm">Download in CSV</span>
        </button>
      </div>
      <ul class="border rounded p-2 mt-4">
        <li
          v-for="(list, inx) of filteredItems"
          :key="inx"
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
    <div
      v-if="error"
      class="bg-orange-600 p-3 rounded-md font-medium text-white"
    >
      <span>{{ error }}</span>
    </div>
  </div>
</template>
