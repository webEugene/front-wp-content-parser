<script setup lang="ts">
const { user } = useUser();

// Create reactive refs for your data
const stats = ref({
  totalProjects: 0,
  activeChecks: 0,
  completed: 0,
});
const loading = ref(false);
const error = ref(null);

// Function to fetch data from backend
const fetchStats = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Call your protected backend endpoint
    const data = await useAuthFetch("auth/protected");

    // Update your stats with real data from backend
    stats.value = {
      totalProjects: data.totalProjects || 12,
      activeChecks: data.activeChecks || 8,
      completed: data.completed || 24,
    };
  } catch (err) {
    console.error("Error fetching stats:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchStats();
});

definePageMeta({
  layout: "client-template",
  middleware: "auth",
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Welcome, {{ user?.firstName }}!</h1>

    <!-- Show error if request failed -->
    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
    >
      Error loading data: {{ error }}
    </div>

    <!-- Show loading state -->
    <div v-if="loading" class="text-center py-8">
      <p>Loading stats...</p>
    </div>

    <!-- Show stats -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Total Projects</p>
            <p class="text-3xl font-bold">{{ stats.totalProjects }}</p>
          </div>
          <Icon name="eos-icons:products" size="3em" class="text-blue-500" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Active Checks</p>
            <p class="text-3xl font-bold">{{ stats.activeChecks }}</p>
          </div>
          <Icon
            name="material-symbols:task"
            size="3em"
            class="text-green-500"
          />
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Completed</p>
            <p class="text-3xl font-bold">{{ stats.completed }}</p>
          </div>
          <Icon
            name="material-symbols:check-circle"
            size="3em"
            class="text-purple-500"
          />
        </div>
      </div>
    </div>

    <div class="mt-8 bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NuxtLink
          to="/client/client-wp-check"
          class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Icon
            name="material-symbols:search-gear-rounded"
            size="2em"
            class="text-blue-500"
          />
          <div>
            <h3 class="font-semibold">WP Check</h3>
            <p class="text-sm text-gray-600">Check WordPress installations</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/client/client-wp-check"
          class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Icon
            name="material-symbols:search"
            size="2em"
            class="text-green-500"
          />
          <div>
            <h3 class="font-semibold">Sitemap Find</h3>
            <p class="text-sm text-gray-600">Find website sitemaps</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
