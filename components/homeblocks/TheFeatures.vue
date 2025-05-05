<script setup lang="ts"></script>

<template>
  <div class="bg-gray-50">
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Our FREE Tools
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Discover what makes our product stand out from the competition.
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Feature 1 -->
          <div
            class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div
              class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6"
            >
              <img src="~/assets/img/wp-check.png" alt="" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">WP Check</h3>
            <p class="text-gray-600">
              Optimized for performance with load times under 2 seconds,
              ensuring your users never wait.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div
              class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6"
            >
              <img src="~/assets/img/sitemap-find.png" alt="" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Sitemap test
            </h3>
            <p class="text-gray-600">
              Enterprise-grade security with end-to-end encryption and regular
              penetration testing.
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div
              class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6"
            >
              <img src="~/assets/img/sitemap-extractor.png" alt="" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Sitemap extractor
            </h3>
            <p class="text-gray-600">
              Designed for humans with thoughtful UX patterns that reduce
              learning curves.
            </p>
          </div>

          <!-- Feature 4 -->
          <div
            class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div
              class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6"
            >
              <img src="~/assets/img/links-grabber.png" alt="" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Link grabber
            </h3>
            <p class="text-gray-600">
              Our award-winning support team is available around the clock to
              assist you.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
