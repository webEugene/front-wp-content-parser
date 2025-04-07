<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "admin-template",
});

const showDialog = ref(true);

const { data, status, error } = await useFetch(`/api/reports/report`);

if (error.value) {
  throw createError(error.value);
}

enum StatusEnum {
  Created,
  Pending,
  InProgress,
  Done,
}

const getStatusText = (status: number) => StatusEnum[status] || "Unknown";
const changeStatus = () => {
  showDialog.value = true;
};

const saveStatus = () => {
  showDialog.value = false;
};
</script>

<template>
  <div class="mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900">Reports</h1>
    <div v-if="status === 'pending'">Pending ....</div>
    <div
      v-else
      class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border"
    >
      <table v-if="data.items" class="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th class="px-4 py-2">Page Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Report</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report of data.items" :key="report._id">
            <td class="p-4 border-b border-blue-gray-50">
              {{ report.pageName }}
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              {{ report.email }}
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              {{ report.report }}
            </td>
            <td class="p-4 border-b border-blue-gray-50 flex">
              <span
                v-if="report.status === StatusEnum.Created"
                class="text-xs ml-1 border border-red-400 rounded px-1 py-1 bg-red-400/25 text-red-500"
                >{{ getStatusText(report.status) }}</span
              >
              <span
                v-if="report.status === StatusEnum.Pending"
                class="text-xs ml-1 border border-yellow-400 rounded px-1 py-1 bg-yellow-400/25 text-yellow-500"
                >{{ getStatusText(StatusEnum.Pending) }}</span
              >
              <span
                v-if="report.status === StatusEnum.InProgress"
                class="text-xs ml-1 border border-blue-400 rounded px-1 py-1 bg-blue-400/25 text-blue-500"
                >{{ getStatusText(StatusEnum.InProgress) }}</span
              >
              <span
                v-if="report.status === StatusEnum.Done"
                class="text-xs ml-1 border border-green-400 rounded px-1 py-1 bg-green-400/25 text-green-500"
                >{{ getStatusText(StatusEnum.Done) }}</span
              >
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <button @click="changeStatus()">
                <icon name="octicon:pencil" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <teleport to="body">
        <div
          v-if="showDialog"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-lg font-bold mb-4">Update status</h2>
            <select
              id="status"
              name="status"
              class="appearance-none block w-full border border-black rounded-md py-2 pl-3 pr-10 text-base text-black focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            >
              <option
                v-for="(action, index) in [
                  'Created',
                  'Pending',
                  'InProgress',
                  'Done',
                ]"
                :key="index"
              >
                {{ action }}
              </option>
            </select>
            <div class="mt-4">
              <button
                class="text-xs ml-1 border border-green-400 rounded px-1 py-1 bg-green-400/25 text-green-500"
                @click="saveStatus"
              >
                Save
              </button>
              <button
                class="text-xs ml-1 border border-green-400 rounded px-1 py-1 bg-green-400/25 text-green-500"
                @click="showDialog = !showDialog"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </div>
</template>
