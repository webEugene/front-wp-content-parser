<template>
  <div class="flex h-screen bg-gray-100">
    <!-- sidebar -->
    <div class="hidden md:flex flex-col w-64 rounded-r-2xl">
      <div class="flex flex-col flex-1 overflow-y-auto">
        <nav
          class="flex flex-col flex-1 overflow-y-auto bg-gradient-to-b from-gray-700 to-blue-500 px-2 py-4 gap-10 rounded-r"
        >
          <div>
            <button
              type="button"
              class="flex items-center px-4 py-2 text-gray-100"
            >
              <icon
                name="iconamoon:menu-burger-horizontal-fill"
                size="1.4em"
                class="mr-1"
              />
              Dashboard
            </button>
          </div>
          <div class="flex flex-col flex-1 gap-3">
            <nuxt-link
              to="/admin"
              class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
            >
              <icon
                name="material-symbols:home-outline-rounded"
                size="1.4em"
                class="mr-1"
              />
              Home
            </nuxt-link>
            <button
              type="button"
              class="flex flex-col items-baseline px-4 py-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
              @click="openSubmenu"
            >
              <span class="flex items-center">
                <icon name="hugeicons:analytics-01" size="1.4em" class="mr-1" />
                Analytics
              </span>
              <span
                id="submenu"
                class="text-left text-sm mt-2 text-gray-200 font-bold"
              >
                <nuxt-link
                  to="/admin/analytics/analytics-wp-detect"
                  class="cursor-pointer flex px-2 py-1 my-1 hover:bg-blue-600 rounded-md mt-1"
                >
                  Analytics Wp Check
                </nuxt-link>
                <nuxt-link
                  to="/admin/analytics/analytics-sitemap"
                  class="cursor-pointer flex px-2 py-1 my-1 hover:bg-blue-600 rounded-md mt-1"
                >
                  Analytics Sitemap
                </nuxt-link>
              </span>
            </button>
            <nuxt-link
              to="#"
              class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
            >
              <icon name="tabler:users-group" size="1.4em" class="mr-1" />
              Users
            </nuxt-link>
            <nuxt-link
              to="#"
              class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
            >
              <icon name="tabler:message-report" size="1.4em" class="mr-1" />
              Reports
            </nuxt-link>
          </div>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex flex-col flex-1 overflow-y-auto">
      <div
        class="flex items-center justify-end h-16 bg-white border-b border-gray-200"
      >
        <!-- notification -->
        <div class="flex items-center space-x-4 mr-4">
          <!-- settings -->
          <nuxt-link
            to="#"
            class="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300"
          >
            <icon
              name="material-symbols:settings-outline-rounded"
              size="1.2em"
            />
          </nuxt-link>
          <!-- logout -->
          <nuxt-link
            to="#"
            class="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300"
          >
            <icon name="tabler:logout-2" size="1.2em" />
            <span class="font-bold">Logout</span>
          </nuxt-link>
        </div>
      </div>
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
