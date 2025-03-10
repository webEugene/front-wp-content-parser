<script setup lang="ts"></script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <icon name="carbon:report" size="3em" class="text-red-500 flex mx-auto" />
      <h2
        class="my-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        Hello, this is error report page
      </h2>
      <span class="mt-2"
        >Please, describe error that you faced with, and we try to fix it as
        fast as possible. And we very appreciate your help to make our service
        better. Please check our updates page, to see all notification that has
        been resolved. Or (not required) you may add your email and we inform
        you when it will be fixed.
      </span>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div class="w-full relative">
          <label
            for="pageType"
            class="block text-sm/6 font-medium text-gray-900 sr-only"
            >Page</label
          >
          <select
            id="pageType"
            name="pageType"
            class="appearance-none block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option selected>Wp Check</option>
            <option>Sitemap test</option>
            <option>Sitemap Extractor</option>
            <option>Link grabber</option>
            <option>Login/Sign in</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center"
          >
            <icon name="carbon:chevron-down" />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              type="email"
              name="email"
              autocomplete="email"
              required=""
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="message"
              class="block text-sm/6 font-medium text-gray-900"
              >Message</label
            >
          </div>
          <div class="mt-2">
            <textarea
              id="message"
              type="message"
              name="message"
              autocomplete="message"
              placeholder="Please describe in details your report"
              required=""
              class="block h-32 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send report
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
