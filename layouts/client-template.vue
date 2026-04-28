<script setup lang="ts"></script>

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
              <Icon
                name="iconamoon:menu-burger-horizontal-fill"
                size="1.4em"
                class="mr-1"
              />
              Dashboard
            </button>
          </div>
          <div class="flex flex-col flex-1 gap-3">
            <NuxtLink
              to="/client"
              class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
            >
              <Icon
                name="material-symbols:home-outline-rounded"
                size="1.4em"
                class="mr-1"
              />
              Home
            </NuxtLink>
            <button
              type="button"
              class="flex flex-col items-baseline px-4 py-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl"
            >
              <span class="flex items-center">
                <Icon name="eos-icons:products" size="1.4em" class="mr-1" />
                Products
              </span>
              <span
                id="submenu"
                class="text-left text-sm mt-2 text-gray-200 font-bold"
              >
                <NuxtLink
                  to="/client/client-wp-check"
                  class="cursor-pointer flex px-2 py-1 my-1 hover:bg-blue-600 rounded-md mt-1"
                >
                  <Icon
                    name="material-symbols:search-gear-rounded"
                    size="1.4em"
                    class="mr-1"
                  />
                  Wp Check
                </NuxtLink>
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex flex-col flex-1 overflow-y-auto">
      <div
        class="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4"
      >
        <!-- notification -->
        <div class="text-xl font-semibold text-gray-800">Client Portal</div>
        <div class="flex items-center space-x-4 mr-4">
          <!-- settings -->
          <NuxtLink
            to="#"
            class="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300"
          >
            <Icon
              name="material-symbols:settings-outline-rounded"
              size="1.2em"
            />
          </NuxtLink>
          <UserButton />
        </div>
      </div>
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
