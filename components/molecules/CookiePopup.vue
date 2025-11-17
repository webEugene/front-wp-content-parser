<script setup lang="ts">
import { ref } from "vue";
import { useCookie } from "#app";

const cookieDismissed = useCookie<boolean>("cookie-dismissed", {
  default: () => false,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 365, // 1 year
});

const isDismissed = ref(cookieDismissed.value);

const dismissCookie = () => {
  cookieDismissed.value = true;
  isDismissed.value = true;
};
</script>

<template>
  <div v-if="!isDismissed" class="fixed bottom-0 left-0 mb-4 ml-4 w-64">
    <div class="bg-white rounded-lg shadow-lg p-4">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center">
          <img
            src="https://www.svgrepo.com/show/401340/cookie.svg"
            alt="Cookie"
            class="h-6 w-6 mr-2"
          />
          <span class="text-gray-700 font-bold text-sm"
            >Cookie Policy</span
          >
        </div>
        <button
          class="text-gray-500 hover:text-gray-700 focus:outline-none"
          @click="dismissCookie"
        >
          <icon name="material-symbols:close-small-outline-rounded" />
        </button>
      </div>
      <p class="text-gray-600 text-sm">
        We use cookies to enhance your experience. By continuing to visit this
        site, you agree to our use of cookies.
      </p>
      <button
        class="mt-4 bg-indigo-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded"
        @click="dismissCookie"
      >
        Dismiss
      </button>
    </div>
  </div>
</template>

<style scoped></style>
