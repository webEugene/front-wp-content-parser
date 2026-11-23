<script setup lang="ts">
import ForgotPassword from "~/components/auth/ForgotPassword.vue";
import TheLogin from "~/components/auth/TheLogin.vue";
import TheRegister from "~/components/auth/TheRegister.vue";
import ResetPassword from "~/components/auth/ResetPassword.vue";

type AuthForm = "login" | "register" | "forgotPassword" | "resetPassword";

const currentForm = ref<AuthForm>("login");

function chooseAuthForm(value: AuthForm): void {
  currentForm.value = value;
}
</script>

<template>
  <TheLogin v-if="currentForm === 'login'" @auth-form="chooseAuthForm" />
  <ForgotPassword
    v-else-if="currentForm === 'forgotPassword'"
    @auth-form="chooseAuthForm"
  />
  <ResetPassword
    v-else-if="currentForm === 'resetPassword'"
    @auth-form="chooseAuthForm"
  />
  <TheRegister v-else @auth-form="chooseAuthForm" />
</template>
