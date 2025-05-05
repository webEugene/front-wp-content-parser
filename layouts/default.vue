<template>
  <div>
    <app-header />
    <main class="w-full pt-14">
      <slot />
      <div class="support-wrapper w-full flex justify-center">
        <div class="bg-white w-2/3 px-5 py-10 rounded-lg my-5">
          <nuxt-link
            class="flex flex-row justify-around items-center"
            target="_blank"
            to="#"
            title="Buy Me A Coffee"
            rel="noopener noreferrer nofollow"
          >
            <div class="font-semibold text-xl mr-4">Want to support?</div>
            <img
              class="w-72"
              loading="lazy"
              src="~/assets/img/support_me_on_kofi_blue.png"
              alt="Buy me a coffee"
          /></nuxt-link>
        </div>
      </div>
    </main>
    <app-footer />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
</script>

<style lang="scss" scoped>
main {
  min-height: calc(-357px + 100vh);
}
</style>
