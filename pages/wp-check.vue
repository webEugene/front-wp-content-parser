<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { urlWithMessageSchema } from "~/schemas/urlSchema";
import HeadingPage from "~/components/molecules/HeadingPage.vue";
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseAlert from "~/components/atoms/BaseAlert.vue";
import ProgressCircleSvg from "~/components/atoms/ProgressCircleSvg.vue";
import BaseInput from "~/components/atoms/BaseInput.vue";
import ContentWrapper from "~/components/atoms/ContentWrapper.vue";

useSeoMeta({
  title: "Is It WordPress? | Quick & Easy WordPress Website Checker",
  description:
    "Instantly check if any website is built with WordPress. Just enter the URL and find out in seconds — free, fast, and accurate.",
});

const response = ref(null);
const error = ref(null);
const loading = ref(false);

const urlSchema = toTypedSchema(urlWithMessageSchema);
const { value: url, errorMessage } = useField("url", urlSchema);

async function checkWpDetect() {
  try {
    loading.value = true;

    const { data, error: fetchError } = await useFetch(
      "/api/detect/wp-detect",
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
    <heading-page heading="Wp Check">
      <template #text>
        <p>
          Easy check if website is created on <strong>Wordpress</strong>. Just
          enter url and click to get the answer.
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
          @click.prevent="checkWpDetect"
        >
          <progress-circle-svg v-if="loading" />
          <span v-if="!loading">Check</span>
          <span v-else>Processing... </span>
        </base-button>
      </div>
      <base-alert v-if="response && response?.data.isWp" type="success">
        Website <strong>{{ response?.data.url }}</strong> is created on
        <strong>Wordpress</strong>.
      </base-alert>
      <base-alert
        v-else-if="response && response.data.isWp === false"
        type="error"
      >
        We cannot access your website
        <strong>{{ response?.data.url }}</strong> in order to perform our test!
        Either the site is not online, or our tool is being blocked by your
        server. <strong>Try again</strong> or <strong>Try another URL</strong>
      </base-alert>
      <base-alert v-if="error" type="error">
        <span>{{ error }}</span>
      </base-alert>
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
