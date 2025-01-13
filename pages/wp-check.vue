<script setup lang="ts">
import { ref } from 'vue';
import { useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const fieldSchema = toTypedSchema(
	z.string().nonempty('Field is required').refine(value => !value || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(value), {
		message: 'Please provide a valid URL',
	}),
);
const { value: url, errorMessage } = useField('url', fieldSchema);

const response = ref(null);
const error = ref(null);
const loading = ref(false);

async function onSendTest() {
	try {
		loading.value = true;

		const { data, error } = await useFetch('/api/detect/wp-detect',
			{
				params: {
					url,
				},
			});
		response.value = data;
		error.value = null;
	}
	catch (err) {
		error.value = err.message || 'Something went wrong!';
		response.value = null;
	}
	finally {
		loading.value = false;
	}
}
</script>

<template>
	<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
		<h1 class="text-3xl font-bold tracking-tight text-gray-900">
			Wp Check
		</h1>
		<div class="form-wp-check w-96 mx-auto">
			<div class="mt-2">
				<input
					v-model="url"
					type="text"
					placeholder="Enter a valid URL"
					class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				>

				<span
					v-if="errorMessage"
					class="error"
				>{{ errorMessage }}</span>
			</div>
			<div>
				<button
					class="flex rounded-md bg-indigo-600 px-5 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					@click.prevent="onSendTest"
				>
					Check
				</button>
			</div>
		</div>
    {{response?.data}}
		<div class="flex flex-row align-middle border-2 border-green-300 p-2 rounded">
      <Icon size="1.5em" style="color: lawngreen" name="ooui:success" />
      <div class="ml-1">Website <span class="font-medium">{{response?.url}}</span> is written on <span class="font-bold">Wordpress</span>.</div>
		</div>
    <div class="flex flex-row align-middle border-2 border-rose-600 p-2 rounded">
      <Icon size="1.5em" style="color: red" name="ic:round-error" />
      <div class="ml-1">Website <span class="font-medium">{{response?.url}}</span> is NOT written on <span class="font-bold">Wordpress</span>.</div>
    </div>
		<div v-if="error">
			<p>Error: {{ error }}</p>
		</div>
	</div>
</template>
