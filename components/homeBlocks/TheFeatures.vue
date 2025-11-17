<script setup lang="ts">
const featureList = ref([
  {
    src: "wp-check.png",
    title: "WP Check",
    text: "Easy check if website is created on Wordpress. Just enter url and click to get the answer.",
    url: "/products/wp-check",
  },
  {
    src: "sitemap-find.png",
    title: "Sitemap find",
    text: "Sitemap Find tool quickly detects sitemaps and shows what’s inside.",
    url: "/products/sitemap-find",
  },
  {
    src: "sitemap-extractor.png",
    title: "Sitemap extractor",
    text: "Sitemap Extractor parses all links from sitemap and give you a list of links for easy usage.",
    url: "/products/sitemap-extractor",
  },
  {
    src: "links-grabber.png",
    title: "Links grabber",
    text: "Our Link Grabber tool scans the HTML and displays all found URLs in a clean, easy-to-use format — perfect for SEO, research, and analysis.",
    url: "/products/links-grabber",
  },
  // {
  //   src: "parse-classes.png",
  //   title: "Parse Classes",
  //   text: "Easy get Wordpress main classes. Just enter url and click to get them.",
  //   url: "/products/parse-classes",
  // },
]);
</script>

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
          <div
            v-for="(feature, index) in featureList"
            :key="index"
            class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div
              class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6"
            >
              <nuxt-img :src="feature.src" :alt="feature.title" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">
              {{ feature.text }}
            </p>
            <nuxt-link
              :to="feature.url"
              class="text-indigo-600 mt-2 flex hover:font-semibold"
              >Open ></nuxt-link
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
