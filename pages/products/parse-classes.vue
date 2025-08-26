<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { urlWithMessageSchema } from "~/schemas/urlSchema";

useSeoMeta({
  title: "Parse Classes – Extract WordPress Main CSS Classes Instantly",
  description:
    "Easily get WordPress main classes with Parse Classes. Just enter a URL, click, and instantly extract core CSS classes from any WordPress site.",
});

const response = ref(null);
const error = ref(null);
const loading = ref(false);

const urlSchema = toTypedSchema(urlWithMessageSchema);
const { value: url, errorMessage } = useField("url", urlSchema);

async function parseClasses() {
  try {
    loading.value = true;

    const { data, error: fetchError } = await useFetch(
      "/api/parsing/parsing-classes",
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
const disabledBtn = computed(() => {
  return !url.value || !!errorMessage.value || loading.value;
});
</script>

<template>
  <div>
    <heading-page heading="Parse Classes">
      <template #text>
        <p>
          Easy get <strong>Wordpress</strong> main classes. Just enter url and
          click to get them.
        </p>
      </template>
    </heading-page>
    <div class="wrapper mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        class="form-wp-check w-2/4 p-2 mx-auto flex flex-col justify-center items-center"
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
          @click.prevent="parseClasses"
        >
          <progress-circle-svg v-if="loading" />
          <span v-if="!loading">Check</span>
          <span v-else>Processing... </span>
        </base-button>
      </div>
      <base-alert v-if="response" type="success">
        Website <strong>{{ response?.site }}</strong> has such page types:
        <strong>{{ response?.pages }}</strong>
      </base-alert>
      <base-alert v-if="error" type="error">
        <span>{{ error }}</span>
      </base-alert>
    </div>
    <content-wrapper>
      <h2 class="text-center mb-2 text-2xl font-semibold">
        How get Wordpress Classes
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet
        dolorem earum itaque iure laborum minima veritatis voluptatum. Facilis,
        vero?
      </p>
    </content-wrapper>
  </div>
</template>
