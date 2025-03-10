<script setup lang="ts">
import Pagination from "~/components/Pagination.vue";

definePageMeta({
	layout: 'admin-template',
});

const route = useRoute();
const router = useRouter();

const currentPage = ref(1);
const perPage = 2;
const totalPages = ref(1) // Change this dynamically if needed

// // Update URL when `currentPage` changes
// watch(currentPage, (newPage) => {
//   router.push({ query: { page: newPage } })
// })

const { data, status, error } = await useFetch(() => `/api/analytics/wp-check`, {
  params: {
    page: currentPage.value,
    limit: perPage
  },
  watch: [currentPage]
});

// Update `totalPages` dynamically when data is fetched
watch(data, (newData) => {
  if (newData?.totalPages) totalPages.value = newData.totalPages
})

const isPrevDisabled = computed(() => currentPage.value === 1);
const isNextDisabled = computed(() => data.value.items?.length < perPage);
const goToPage = (page: number) => { currentPage.value = page };

const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (!isNextDisabled.value) currentPage.value++ }

// Generate pagination numbers dynamically
const pages = computed(() => {
  return Array.from({ length: data.value.totalPages }, (_, i) => i + 1)
})
</script>

<template>
	<div class="mx-auto px-4 py-6 sm:px-6 lg:px-8">
		<h1 class="text-3xl font-bold tracking-tight text-gray-900">
			Analytics
		</h1>
    <div v-if="status === 'pending'">Pending ....</div>
		<div
        v-else
			class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border"
		>
			<table class="w-full text-left table-auto min-w-max" v-if="data.items">
				<thead>
					<tr>
						<th class="text-left">
							ID
						</th>
						<th>Website</th>
						<th>Tries</th>
						<th>Host</th>
						<th>User</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="analytic of data.items"
						:key="analytic._id"
					>
						<td class="p-4 border-b border-blue-gray-50">
							{{ analytic._id }}
						</td>
						<td class="p-4 border-b border-blue-gray-50">
							{{ analytic.website }}
						</td>
						<td class="p-4 border-b border-blue-gray-50">
							{{ analytic.tries }}
						</td>
						<td class="p-4 border-b border-blue-gray-50">
							{{ analytic.host }}
						</td>
						<td class="p-4 border-b border-blue-gray-50">
							Not registered/registered
						</td>
						<td
							v-if="analytic.wpDetect"
							class="p-4 border-b border-blue-gray-50 flex "
						>
              <span class="text-xs ml-1 border border-green-400 rounded px-1 py-1 bg-green-400/25 text-green-500">Is Wordpress</span>
						</td>
						<td
							v-else
							class="p-4 border-b border-blue-gray-50"
						>
              <span class="text-xs ml-1 border border-red-400 rounded px-1 py-1 bg-red-400/25 text-red-500">Not Wordpress</span>
						</td>
					</tr>
				</tbody>
			</table>
      <Pagination
          :items="pages"
          :is-prev-disabled="isPrevDisabled"
          :is-next-disabled="isNextDisabled"
          :current-page="currentPage"
          @prevClicked="prevPage"
          @nextClicked="nextPage"
          @toPage="goToPage"
      />
		</div>
	</div>
</template>
