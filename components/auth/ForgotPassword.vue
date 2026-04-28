<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const emit = defineEmits<{
  (e: "auth-form", value: string): void;
}>();

const emailSchema = z.object({
  email: z.string().email("Invalid email format"),
});

const errorShow = ref(null);
const loading = ref(false);

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(emailSchema),
});

const { value: email, errorMessage: emailError } = useField("email");

// Validate on submit
const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;

    const { error: fetchError } = await useFetch("/api/auth/forgetPassword", {
      method: "POST",
      body: values,
    });

    if (fetchError.value) {
      switch (fetchError.value.data.data.message) {
        case "inc_email":
          emailError.value = "Email is incorrect";
          break;
        default:
          errorShow.value = "Something went wrong!";
          break;
      }
    } else {
      email.value = null;
    }
  } catch (err) {
    errorShow.value = err.message || "Something went wrong11!";
  } finally {
    loading.value = false;
  }
});

const disabledButton = computed(() => {
  return !email.value || emailError.value;
});
</script>

<template>
  <div class="wrapper mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div
      class="form-wp-check w-2/4 p-2 mx-auto flex flex-col justify-center items-center"
    >
      <form class="w-64 sm:w-96" @submit.prevent="onSubmit">
        <div class="text-center text-xl font-semibold mb-4">Sign in</div>
        <base-alert v-if="errorShow" type="error">
          <span>{{ errorShow }}</span>
        </base-alert>
        <base-input
          id="login-email"
          v-model:input-value="email"
          placeholder="Email"
          :error-message="!!emailError"
          class="mb-2"
        />
        <span v-if="emailError" class="error font-bold text-amber-700">{{
          emailError
        }}</span>
        <div class="flex flex-row items-center justify-center mt-3">
          <base-button
            class="flex rounded mr-3 min-w-40 justify-center"
            :disabled="disabledButton"
          >
            <progress-circle-svg v-if="loading" />
            <span v-if="!loading">Send</span>
            <span v-else>Processing... </span>
          </base-button>

          <button
            class="hover:underline"
            @click.prevent="emit('auth-form', 'login')"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
