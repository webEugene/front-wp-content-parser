<script setup lang="ts"></script>

<template>
  <div class="support-wrapper max-w-4xl m-auto flex justify-center">
    <div class="bg-white w-5/6 md:w-2/3 px-5 py-10 rounded-lg my-5">
      <nuxt-link
        class="flex flex-col md:flex-row justify-around items-center"
        target="_blank"
        to="#"
        title="Buy Me A Coffee"
        rel="noopener noreferrer nofollow"
      >
        <div class="font-semibold text-xl mr-4 mb-2 md:mb-0">
          Want to support?
        </div>
        <nuxt-img
          class="w-72"
          loading="lazy"
          src="/imgs/support_me_on_kofi_blue.png"
          alt="Buy me a coffee"
      /></nuxt-link>
    </div>
  </div>
</template>
