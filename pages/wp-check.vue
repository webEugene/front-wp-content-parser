<script setup lang="ts">
import { ref } from 'vue';
import { useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const urlSchema = toTypedSchema(
	z.string().refine(value => !value || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(value), {
		message: 'Please provide a valid URL',
	}),
);
const { value: url, errorMessage } = useField('url', urlSchema);

const response = ref(null);
const error = ref(null);
const loading = ref(false);

async function checkWpDetect() {
  try {
    loading.value = true;
    // Use fetch with proper URL parameter
    const { data, error: fetchError } = await useFetch('/api/detect/wp-detect', {
      params: { url: url.value },
    });

    if (fetchError.value) {
      error.value = fetchError.value.message;
      response.value = null;
    } else {
      response.value = data.value;
      error.value = null;
    }
  } catch (err) {
    error.value = err.message || 'Something went wrong!';
    response.value = null;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
	<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <div class="p-5 bg-amber-100">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        Wp Check
      </h1>
    </div>
    <div class="form-wp-check w-2/4 p-2 mx-auto flex justify-center"
         :class="errorMessage ? 'items-baseline' : 'items-center'"
    >
			<div class="w-96">
				<input
            name="url"
					  v-model="url"
					  type="text"
					  placeholder="Enter a valid URL"
					  class="block w-full rounded-l-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
				    :class="errorMessage ? 'outline-red-500 focus:outline-red-500': 'outline-gray-300 focus:outline-indigo-600'"
        >
				<span
					v-if="errorMessage"
					class="error font-bold text-amber-700"
				>{{ errorMessage }}</span>
			</div>
      <button class="flex disabled:opacity-75 disabled:pointer-events-none rounded-r-md bg-indigo-600 px-5 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click.prevent="checkWpDetect" :disabled="!url || errorMessage || loading">
        <svg v-if="loading" class="w-5 h-5 mr-2 animate-spin" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none">
          <circle class="text-blue-200" cx="25" cy="25" r="20" stroke="white" stroke-width="6"></circle>
          <circle class="text-blue-600" cx="25" cy="25" r="20" stroke="gray" stroke-width="6" stroke-dasharray="125.6" stroke-dashoffset="100"></circle>
        </svg>
        <span v-if="!loading">Checkup</span>
        <span v-else>Processing... </span>
      </button>
		</div>
		<div v-if="response && response.data.isWp" class="flex flex-row align-middle border-2 border-green-300 p-2 rounded">
      <Icon size="1.5em" style="color: lawngreen" name="ooui:success" />
      <div class="ml-1">Website <span class="font-medium">{{response?.data.url}}</span> is written on <span class="font-bold">Wordpress</span>.</div>
		</div>
    <div v-else-if="response && response.data.isWp === false" class="flex flex-row align-middle border-2 border-rose-600 p-2 rounded">
      <Icon size="1.5em" style="color: red" name="ic:round-error" />
      <div class="ml-1">Website <span class="font-medium">{{response?.data.url}}</span> is NOT written on <span class="font-bold">Wordpress</span> / not found or url is incorrect.</div>
    </div>

    <div class="bg-orange-600 p-3 rounded-md font-medium text-white" v-if="error">
      <span>{{error}}</span>
    </div>
	</div>
</template>
