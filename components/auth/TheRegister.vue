<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const emit = defineEmits<{
  (e: "auth-form", value: string): void;
}>();

const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const authStore = useAuthStore();
const errorShow = ref<string | null>(null);
const loading = ref(false);

const { handleSubmit, setFieldError } = useForm({
  validationSchema: toTypedSchema(registerSchema),
});

const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");

// Validate on submit
const onSubmit = handleSubmit(async (values) => {
  errorShow.value = null;

  try {
    loading.value = true;

    const data = await $fetch("/api/auth/register", {
      method: "POST",
      body: values,
    });

    authStore.user = data.userInfo;
    await navigateTo("/client");
  } catch (fetchError: any) {
    const message = fetchError?.data?.data?.message;

    switch (message) {
      case "inc_email":
        setFieldError("email", "Email is incorrect");
        break;
      case "inc_pass":
        setFieldError("password", "Password is incorrect");
        break;
      default:
        errorShow.value = "Something went wrong!";
        break;
    }

    authStore.user = null;
  } finally {
    loading.value = false;
  }
});

const disabledButton = computed(() => {
  return (
    !email.value ||
    !password.value ||
    !!emailError.value ||
    !!passwordError.value
  );
});
</script>

<template>
  <div class="wrapper mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div
      class="form-wp-check w-2/4 p-2 mx-auto flex flex-col justify-center items-center"
    >
      <form class="w-64 sm:w-96" @submit.prevent="onSubmit">
        <div class="text-center text-xl font-semibold mb-4">Sign up</div>
        <base-alert v-if="errorShow" type="error">
          <span>{{ errorShow }}</span>
        </base-alert>
        <base-input
          id="register-email"
          v-model:input-value="email"
          type="email"
          placeholder="Email"
          :error-message="!!emailError"
          class="mb-2"
        />
        <span v-if="emailError" class="error font-bold text-amber-700">{{
          emailError
        }}</span>
        <base-input
          id="register-password"
          v-model:input-value="password"
          type="password"
          placeholder="Password"
          :error-message="!!passwordError"
        />
        <span v-if="passwordError" class="error font-bold text-amber-700">{{
          passwordError
        }}</span>

        <div class="flex flex-row items-center justify-center mt-3">
          <base-button
            class="flex rounded mr-3 min-w-40 justify-center"
            :disabled="disabledButton"
          >
            <progress-circle-svg v-if="loading" />
            <span v-if="!loading">Create account</span>
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
