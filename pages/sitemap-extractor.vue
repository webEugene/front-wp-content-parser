<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import HeadingPage from "~/components/molecules/HeadingPage.vue";
import { urlWithMessageSchema } from "~/schemas/urlSchema";
import ContentWrapper from "~/components/atoms/ContentWrapper.vue";
import ProgressCircleSvg from "~/components/atoms/ProgressCircleSvg.vue";
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseAlert from "~/components/atoms/BaseAlert.vue";

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
      },
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

        <base-button
          class="flex rounded-r-md"
          :disabled="!url || errorMessage || loading"
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
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium
        amet animi consequuntur cupiditate ea eius error, expedita illum ipsam
        iure magnam numquam quis tempora totam ullam veniam.
      </p>

      <p>
        Aliquam explicabo, reprehenderit. Accusantium alias cumque doloribus ex
        fugit libero maxime nostrum, odit qui rem? A accusantium adipisci animi
        asperiores aut beatae consequuntur, culpa cumque deleniti doloribus
        ipsam iste itaque iure laboriosam laborum magni minus odit officiis
        omnis pariatur quo ratione reiciendis sed similique totam. Accusantium
        architecto, incidunt ipsum laudantium maiores quae sunt unde voluptatum?
        Adipisci debitis deserunt, fugit libero nobis omnis reiciendis similique
        temporibus vel vero. Ab aperiam at corporis esse fuga magnam non nulla
        obcaecati totam ullam. Amet consequatur cupiditate error laborum
        molestiae, quasi quibusdam quos sit voluptatem? Ad architecto eveniet
        explicabo natus voluptas. Accusantium aut commodi consequatur cupiditate
        esse eum exercitationem explicabo ipsum laborum nam non nulla
        praesentium, suscipit? Asperiores cum minus porro. Odio quasi quibusdam
        repudiandae sapiente? Dolor dolores expedita, explicabo ipsam laboriosam
        maiores nisi obcaecati pariatur placeat, possimus praesentium provident
        quaerat quidem quo ratione recusandae reiciendis rem repellendus sed
        ullam ut, vel voluptatem! Accusamus aliquam aperiam aspernatur atque,
        consectetur consequatur corporis debitis doloribus ea eligendi explicabo
        impedit nisi non nulla obcaecati perferendis praesentium quod rerum sit
        tempora.
      </p>
    </content-wrapper>
  </div>
</template>
