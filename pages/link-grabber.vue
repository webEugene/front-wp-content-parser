<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import HeadingPage from "~/components/molecules/HeadingPage.vue";
import { urlWithMessageSchema } from "~/schemas/urlSchema";
import BaseButton from "~/components/atoms/BaseButton.vue";
import ProgressCircleSvg from "~/components/atoms/ProgressCircleSvg.vue";
import BaseAlert from "~/components/atoms/BaseAlert.vue";
import BaseInput from "~/components/atoms/BaseInput.vue";

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
      },
    );

    if (fetchError.value) {
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

// TODO:
// - Link grabber page:
// -- return empty result if url not exists and stop continues loading;
// -- add domain to a path if link grabbed from not home page;
// -- add load button to save all links as csv;
</script>

<template>
  <div>
    <heading-page heading="Link Grabber">
      <template #text>
        <p>
          Our grabber service helps to extract links from an HTML page and
          displays them in convenient view for you.
        </p>
      </template>
    </heading-page>
    <div class="wrapper mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div
        class="form-wp-check sm:w-full w-2/4 p-2 mx-auto flex flex-col justify-center"
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
          @click.prevent="grabLink"
        >
          <progress-circle-svg v-if="loading" />
          <span v-if="!loading">Extract</span>
          <span v-else>Processing... </span>
        </base-button>
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
  </div>
</template>
