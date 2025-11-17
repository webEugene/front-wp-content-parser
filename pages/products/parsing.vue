<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { urlWithMessageSchema } from "~/schemas/urlSchema";
import { classSchema } from "~/schemas/classSchema";

useSeoMeta({
  title: " | ",
  description: "",
});

const response = ref(null);
const error = ref(null);
const loading = ref(false);
const showClassesList = ref(false);

const urlSchema = toTypedSchema(urlWithMessageSchema);
const classSchemaValidate = toTypedSchema(classSchema);

const { value: url, errorMessage } = useField("url", urlSchema);
const { value: homeTitle } = useField("homeTitle", classSchemaValidate);
const { value: homeContent } = useField("homeContent", classSchemaValidate);
const { value: pageTitle } = useField("pageTitle", classSchemaValidate);
const { value: pageContent } = useField("pageContent", classSchemaValidate);
const { value: singleTitle } = useField("singleTitle", classSchemaValidate);
const { value: singleContent } = useField("singleContent", classSchemaValidate);
const { value: archiveTitle } = useField("archiveTitle", classSchemaValidate);
const { value: archiveContent } = useField(
  "archiveContent",
  classSchemaValidate,
);
const { value: defaultTitle } = useField("defaultTitle", classSchemaValidate);
const { value: defaultContent } = useField(
  "defaultContent",
  classSchemaValidate,
);

async function parseContent() {
  try {
    loading.value = true;

    const { data, error: fetchError } = await useFetch(
      `/api/parsing/parse-content`,
      {
        params: {
          url: url.value,
          homeTitle: homeTitle.value,
          homeContent: homeContent.value,
          pageTitle: pageTitle.value,
          pageContent: pageContent.value,
          singleTitle: singleTitle.value,
          singleContent: singleContent.value,
          archiveTitle: archiveTitle.value,
          archiveContent: archiveContent.value,
          defaultTitle: defaultTitle.value,
          defaultContent: defaultContent.value,
        },
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
    <heading-page heading="Parsing Content">
      <template #text>
        <p>Easy parse content.</p>
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
        <div v-if="showClassesList" class="group-classes mt-3">
          <div class="w-96">
            <fieldset class="border-2 p-4 mb-2 rounded">
              <legend class="font-bold">Home</legend>
              <div class="wrapper-inputs flex gap-1">
                <div class="">
                  <label for="homeTitle">h1 class</label>
                  <base-input id="homeTitle" v-model:input-value="homeTitle" />
                </div>
                <div>
                  <label for="homeContent">Content class</label>
                  <base-input
                    id="homeContent"
                    v-model:input-value="homeContent"
                  />
                </div>
              </div>
            </fieldset>
            <fieldset class="border-2 p-4 mb-2 rounded">
              <legend class="font-bold">Page</legend>
              <div class="wrapper-inputs flex gap-1">
                <div class="">
                  <label for="pageTitle">h1 class</label>
                  <base-input id="pageTitle" v-model:input-value="pageTitle" />
                </div>
                <div>
                  <label for="pageContent">Content class</label>
                  <base-input
                    id="pageContent"
                    v-model:input-value="pageContent"
                  />
                </div>
              </div>
            </fieldset>
            <fieldset class="border-2 p-4 mb-2 rounded">
              <legend class="font-bold">Single</legend>
              <div class="wrapper-inputs flex gap-1">
                <div class="">
                  <label for="singleTitle">h1 class</label>
                  <base-input
                    id="singleTitle"
                    v-model:input-value="singleTitle"
                  />
                </div>
                <div>
                  <label for="singleContent">Content class</label>
                  <base-input
                    id="singleContent"
                    v-model:input-value="singleContent"
                  />
                </div>
              </div>
            </fieldset>
            <fieldset class="border-2 p-4 mb-2 rounded">
              <legend class="font-bold">Archive</legend>
              <div class="wrapper-inputs flex gap-1">
                <div class="">
                  <label for="archiveTitle">h1 class</label>
                  <base-input
                    id="archiveTitle"
                    v-model:input-value="archiveTitle"
                  />
                </div>
                <div>
                  <label for="archiveContent">Content class</label>
                  <base-input
                    id="archiveContent"
                    v-model:input-value="archiveContent"
                  />
                </div>
              </div>
            </fieldset>
            <fieldset class="border-2 p-4 mb-2 rounded">
              <legend class="font-bold">Default</legend>
              <div class="wrapper-inputs flex gap-1">
                <div class="">
                  <label for="defaultTitle">h1 class</label>
                  <base-input
                    id="defaultTitle"
                    v-model:input-value="defaultTitle"
                  />
                </div>
                <div>
                  <label for="defaultContent">Content class</label>
                  <base-input
                    id="defaultContent"
                    v-model:input-value="defaultContent"
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <base-button
          class="flex rounded mt-3 min-w-40 justify-center"
          @click="showClassesList = !showClassesList"
        >
          <span v-if="!showClassesList">Add Classes</span>
          <span v-else>Hide Classes</span>
        </base-button>
        <base-button
          class="flex rounded mt-3 min-w-40 justify-center"
          :disabled="disabledBtn"
          @click.prevent="parseContent"
        >
          <progress-circle-svg v-if="loading" />
          <span v-if="!loading">Parse</span>
          <span v-else>Processing... </span>
        </base-button>
      </div>
    </div>
    <content-wrapper>
      <h2 class="text-center mb-2 text-2xl font-semibold">
        How to use Wp Check
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet
        dolorem earum itaque iure laborum minima veritatis voluptatum. Facilis,
        vero?
      </p>
    </content-wrapper>
  </div>
</template>
