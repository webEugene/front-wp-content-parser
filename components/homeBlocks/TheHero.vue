<script setup lang="ts"></script>

<template>
  <div class="dark:bg-gray-800 bg-blue-50 w-full">
    <section
      class="px-4 py-20 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3"
    >
      <div
        class="order-2 md:order-1 max-w-[631px] flex flex-col items-center text-center md:text-left md:items-start gap-9"
      >
        <h1
          class="dark:text-white text-black text-3xl md:text-4xl lg:text-6xl font-medium"
        >
          Easily Fetch and Use WordPress Content
        </h1>
        <p
          class="dark:text-gray-400 text-black text-base md:text-lg lg:text-xl"
        >
          Easily extract content from any WordPress page using our powerful,
          user-friendly tool.
        </p>
        <nuxt-link
          to="/under-construction"
          class="rounded px-5 py-3 md:px-7 md:py-4 lg:px-9 lg:py-5 bg-indigo-600 text-base md:text-lg lg:text-xl text-white shadow-sm hover:bg-indigo-500"
        >
          Explore WP content parser
          <span
            class="rounded-md bg-red-600 py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm"
            >very soon</span
          >
        </nuxt-link>
      </div>
      <nuxt-img
        class="w-48 sm:w-80 order-1 md:order-2"
        loading="lazy"
        src="../imgs/hero_1.png"
        alt=""
      />
    </section>
  </div>
</template>
