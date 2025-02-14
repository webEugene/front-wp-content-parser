<script setup lang="ts">
definePageMeta({
	layout: 'admin-template',
});
const page = ref(1);

const { data, error } = await useFetch('/api/analytics/wp-check');
</script>

<template>
	<div class="mx-auto px-4 py-6 sm:px-6 lg:px-8">
		<h1 class="text-3xl font-bold tracking-tight text-gray-900">
			Analytics
		</h1>
		<div
			class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border"
		>
			<table class="w-full text-left table-auto min-w-max">
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
						v-for="analytic of data"
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
							class="p-4 border-b border-blue-gray-50"
						>
							<Icon
								size="1.5em"
								style="color: lawngreen"
								name="ooui:success"
							/>
						</td>
						<td
							v-else
							class="p-4 border-b border-blue-gray-50"
						>
							<Icon
								size="1.6em"
								style="color: red"
								name="material-symbols:cancel"
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<nav
				class="mb-4 flex justify-center space-x-4"
				aria-label="Pagination"
			>
				<span class="rounded-lg border border-teal-500 px-2 py-2 text-gray-700">
					<span class="sr-only">Previous</span>
					<Icon
						name="charm:chevron-left"
						size="1.3em"
					/>
				</span>

				<span class="rounded-lg border border-teal-500 bg-teal-500 px-3 py-2 text-white">1</span>

				<a
					class="rounded-lg border border-teal-500 px-4 py-2 text-gray-700"
					href="/page/2"
				>2
				</a>

				<a
					class="rounded-lg border border-teal-500 px-4 py-2 text-gray-700"
					href="/page/3"
				>3
				</a>

				<NuxtLink to="/page/2"
					class="rounded-lg border border-teal-500 px-2 py-2 text-gray-700"
				>
					<span class="sr-only">Next</span>
					<Icon name="charm:chevron-right" />
				</NuxtLink>
			</nav>
		</div>
	</div>
</template>
