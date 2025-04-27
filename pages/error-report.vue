<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useField } from "vee-validate";
import { ref } from "vue";
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseAlert from "~/components/atoms/BaseAlert.vue";
// Define Zod schema
const reportSchema = toTypedSchema(
  z.object({
    pageName: z.string().min(1, "Page name is required"),
    report: z
      .string()
      .min(10, "Report must be at least 10 characters")
      .max(1000, "Report exceeded limit"),
    email: z.string().email("Invalid email").optional(),
  }),
);
const pageNameList = ref([
  {
    name: "Wp Check",
    label: "wp-check",
  },
  {
    name: "Sitemap test",
    label: "sitemap-test",
  },
  {
    name: "Sitemap Extractor",
    label: "sitemap-extractor",
  },
  {
    name: "Link grabber",
    label: "link-grabber",
  },
  {
    name: "Login",
    label: "login",
  },
  {
    name: "Sign in",
    label: "sign-in",
  },
]);
const response = ref(null);
const error = ref(null);
const loading = ref(false);

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: reportSchema,
});
const { value: pageName } = useField("pageName", undefined, {
  initialValue: pageNameList.value[0]?.label, // Встановлення першого значення списку
});
const { value: email } = useField("email");
const { value: report } = useField("report");

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    const { data, error: fetchError } = await useFetch(
      "/api/reports/create-report",
      {
        params: {
          pageName: values.pageName,
          email: values.email,
          report: values.report,
        },
      },
    );

    if (fetchError.value) {
      error.value = fetchError.value.message;
      response.value = null;
    } else {
      response.value = data.value;
      error.value = null;
      resetForm();
    }
  } catch (err) {
    error.value = err.message || "Something went wrong!";
    response.value = null;
  } finally {
    loading.value = false;
  }
});
const disabledButton = computed(() => {
  return (
    !pageName.value ||
    !report.value ||
    !!(errors.value.email && email.value) ||
    loading.value
  );
});

const tooManyCharacters = computed(() => {
  const x = [...report.value].length;
  return !(x > 10 && x < 1000);
});

const getCharacterLength = computed(() => {
  return report.value ? [...report.value].length : "0";
});
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <icon name="carbon:report" size="3em" class="text-red-500 flex mx-auto" />
      <h2
        class="my-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        Hello, this is error report page
      </h2>
      <span class="mt-2"
        >Please, describe error that you faced with, and we try to fix it as
        fast as possible. And we very appreciate your help to make our service
        better. Please check our updates page, to see all notification that has
        been resolved. Or (not required) you may add your email and we inform
        you when it will be fixed.
      </span>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <base-alert v-if="response && response?.statusCode === 201" type="success"
        >Your report was sent successfully</base-alert
      >
      <base-alert v-if="error" type="info">{{ error }}</base-alert>
      <form class="space-y-6" @submit="onSubmit">
        <div class="w-full relative">
          <label
            for="pageName"
            class="block text-sm/6 font-medium text-gray-900"
            >Page Type</label
          >
          <select
            id="pageName"
            v-model="pageName"
            class="appearance-none block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option
              v-for="(name, index) in pageNameList"
              :key="index"
              :value="name.label"
            >
              {{ name.name }}
            </option>
          </select>
          <div
            class="top-5 pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center"
          >
            <icon name="carbon:chevron-down" />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >Email address (optional)</label
          >
          <div class="mt-2">
            <input
              v-model="email"
              type="email"
              autocomplete="email"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <span
              v-if="errors.email && email"
              class="error font-bold text-amber-700"
              >{{ errors.email }}</span
            >
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="message"
              class="block text-sm/6 font-medium text-gray-900"
              >Message</label
            >
            <span>{{ getCharacterLength }} / 1000</span>
          </div>
          <div class="mt-2">
            <textarea
              v-model="report"
              autocomplete="report"
              placeholder="Please describe in details your report"
              class="block h-32 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            ></textarea>
            <span v-if="errors.report" class="error font-bold text-amber-700">{{
              errors.report
            }}</span>
          </div>
        </div>

        <div>
          <base-button
            type="submit"
            class="flex w-full justify-center rounded"
            :disabled="disabledButton || tooManyCharacters"
          >
            Send report
          </base-button>
        </div>
      </form>
    </div>
  </div>
</template>
