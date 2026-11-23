<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { urlWithMessageSchema } from "~/schemas/urlSchema";
import { ERROR_MESSAGES } from "~/constants";
import type { SitemapListType } from "~/server/schemas/sitemapSchema";

definePageMeta({
  layout: "client-template",
});

const urlSchema = toTypedSchema(urlWithMessageSchema);
const { value: url, errorMessage } = useField("url", urlSchema);

const response = ref<SitemapListType["data"] | null>(null);
const error = ref<string | null>(null);
const loading = ref(false);
const copiedIndex = ref<number | null>(null);

async function getSitemapUrl(): Promise<void> {
  if (!url.value) return;
  resetState();
  loading.value = true;

  try {
    const result = await $fetch<SitemapListType>("/api/client/sitemap-list", {
      params: { url: url.value },
    });

    response.value = result.data ?? null;
    url.value = "";
  } catch (err) {
    handleError(err);
  } finally {
    loading.value = false;
  }
}

function handleError(err: unknown): void {
  response.value = null;
  if (isErrorWithMessage(err) || err instanceof Error) {
    error.value = (err as Error).message;
    return;
  }
  error.value = ERROR_MESSAGES.SERVER_ERROR;
}

function resetState(): void {
  error.value = null;
  response.value = null;
}

const copyToClipboard = async (sitemap: string, index: number) => {
  try {
    await navigator.clipboard.writeText(sitemap);
    copiedIndex.value = index;
    setTimeout(() => (copiedIndex.value = null), 2000);
  } catch {
    console.error("Failed to copy");
  }
};

const disabledBtn = computed(() => {
  return !url.value || !!errorMessage.value || loading.value;
});

const robotsTxtBadge = computed(() => {
  const map = {
    found: { label: "Found", class: "bg-green-100 text-green-700" },
    not_found: { label: "Not found", class: "bg-yellow-100 text-yellow-700" },
    error: { label: "Error", class: "bg-red-100 text-red-700" },
  };
  return response.value ? map[response.value.robotsTxtStatus] : null;
});

function statusClass(status: number): string {
  if (status === 200) return "text-green-600 font-semibold";
  if (status === 301 || status === 302) return "text-yellow-600 font-semibold";
  return "text-red-600 font-semibold";
}
</script>

<template>
  <div>
    <heading-page heading="Sitemap Find" :client="true" />
    <div class="wrapper mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <!-- Form -->
      <div class="w-2/4 p-2 mx-auto flex flex-col justify-center items-center">
        <div class="w-64 sm:w-96">
          <base-input
            id="input-sitemap-find"
            v-model:input-value="url"
            placeholder="Enter https://sample.com or sample.com"
            :error-message="!!errorMessage"
          />
          <span v-if="errorMessage" class="error font-bold text-amber-700">
            {{ errorMessage }}
          </span>
        </div>

        <base-button
          class="flex rounded mt-3 min-w-40 justify-center"
          :disabled="disabledBtn"
          @click.prevent="getSitemapUrl"
        >
          <progress-circle-svg v-if="loading" />
          <span>{{ loading ? "Processing..." : "Find" }}</span>
        </base-button>
      </div>

      <!-- Results -->
      <div v-if="response?.sitemapList" class="mt-6">
        <!-- robots.txt status -->
        <div class="flex items-center gap-2 mb-4">
          <span class="text-sm text-gray-500">robots.txt:</span>
          <span
            v-if="robotsTxtBadge"
            class="text-xs font-medium px-2 py-0.5 rounded-full"
            :class="robotsTxtBadge.class"
          >
            {{ robotsTxtBadge.label }}
          </span>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto rounded-lg border border-gray-200">
          <table class="min-w-full text-sm">
            <thead
              class="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider"
            >
              <tr>
                <th class="px-4 py-3 text-left">Sitemap URL</th>
                <th class="px-4 py-3 text-center">HTTP Status</th>
                <th class="px-4 py-3 text-center">Response Time</th>
                <th class="px-4 py-3 text-center">In robots.txt</th>
                <th class="px-4 py-3 text-center">Googlebot blocked</th>
                <th class="px-4 py-3 text-center">Copy</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr
                v-for="(item, index) in response.sitemapList"
                :key="index"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- URL -->
                <td class="px-4 py-3">
                  <nuxt-link
                    :to="item.url"
                    target="_blank"
                    class="text-purple-700 border-b border-purple-700 border-dashed hover:text-purple-900 break-all"
                  >
                    {{ item.url }}
                  </nuxt-link>
                </td>

                <!-- HTTP Status -->
                <td class="px-4 py-3 text-center">
                  <span :class="statusClass(item.httpStatus)">
                    {{ item.httpStatus }}
                  </span>
                </td>

                <!-- Response Time -->
                <td class="px-4 py-3 text-center text-gray-600">
                  {{ item.responseTimeMs }} ms
                </td>

                <!-- Declared in robots.txt -->
                <td class="px-4 py-3 text-center">
                  <icon
                    v-if="item.declaredInRobots"
                    name="ooui:success"
                    size="1.2em"
                    style="color: limegreen"
                  />
                  <icon
                    v-else
                    name="ooui:close"
                    size="1.2em"
                    class="text-red-400"
                  />
                </td>

                <!-- Googlebot blocked -->
                <td class="px-4 py-3 text-center">
                  <icon
                    v-if="item.blockedForGooglebot"
                    name="ooui:close"
                    size="1.2em"
                    class="text-red-500"
                  />
                  <icon
                    v-else
                    name="ooui:success"
                    size="1.2em"
                    style="color: limegreen"
                  />
                </td>

                <!-- Copy -->
                <td class="px-4 py-3 text-center">
                  <button
                    class="relative inline-flex items-center"
                    @click="copyToClipboard(item.url, index)"
                  >
                    <icon
                      size="1.2em"
                      name="material-symbols:content-copy-outline"
                      class="text-gray-500 hover:text-gray-700"
                    />
                    <span
                      v-if="copiedIndex === index"
                      class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs border rounded px-1.5 py-0.5 bg-white shadow whitespace-nowrap"
                    >
                      Copied!
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <base-alert v-if="error" type="error">
        <span>{{ error }}</span>
      </base-alert>
    </div>
    <content-wrapper>
      <div class="mt-6 mb-6 space-y-4 text-sm">
        <p class="text-gray-700">
          After entering a domain, we perform a basic accessibility check — no
          credentials required. Here's what each column in the results table
          means:
        </p>

        <!-- HTTP Status -->
        <div>
          <div
            class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
          >
            HTTP status
          </div>
          <div
            class="border border-gray-200 rounded-lg divide-y divide-gray-100"
          >
            <div class="flex items-start gap-3 px-2 py-2">
              <span
                class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 shrink-0"
              >
                <icon name="tabler:circle-check" size="0.9em" /> 200
              </span>
              <p class="p-reset text-gray-700">
                Sitemap is publicly accessible.
                <span class="text-gray-400"
                  >Google can fetch it without issues.</span
                >
              </p>
            </div>
            <div class="flex items-start gap-3 px-2 py-2">
              <span
                class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 shrink-0"
              >
                <icon name="tabler:arrow-right" size="0.9em" /> 301 / 302
              </span>
              <p class="p-reset text-gray-700">
                Sitemap URL redirects.
                <span class="text-gray-400"
                  >Usually harmless, but the declared URL should ideally point
                  directly to the file.</span
                >
              </p>
            </div>
            <div class="flex items-start gap-3 px-2 py-2">
              <span
                class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 shrink-0"
              >
                <icon name="tabler:lock" size="0.9em" /> 403
              </span>
              <p class="p-reset text-gray-700">
                Access forbidden.
                <span class="text-gray-400"
                  >The server blocks public requests — Googlebot can't fetch it
                  either.</span
                >
              </p>
            </div>
            <div class="flex items-start gap-3 px-2 py-2">
              <span
                class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 shrink-0"
              >
                <icon name="tabler:file-off" size="0.9em" /> 404
              </span>
              <p class="p-reset text-gray-700">
                Not found.
                <span class="text-gray-400"
                  >The URL is broken or the file has been deleted.</span
                >
              </p>
            </div>
          </div>
        </div>

        <!-- Response Time -->
        <div>
          <div
            class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
          >
            Response time
          </div>
          <div
            class="border border-gray-200 rounded-lg divide-y divide-gray-100"
          >
            <div class="flex items-start gap-3 px-2 py-2">
              <span
                class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 shrink-0"
              >
                <icon name="tabler:bolt" size="0.9em" /> ≤ 500 ms
              </span>
              <p class="p-reset text-gray-700">
                Fast. No issues expected for crawlers.
              </p>
            </div>
            <div class="flex items-start gap-3 px-2 py-2">
              <span
                class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 shrink-0"
              >
                <icon name="tabler:clock" size="0.9em" /> 500 – 2000 ms
              </span>
              <p class="p-reset text-gray-700">
                Acceptable.
                <span class="text-gray-400"
                  >Slow responses may delay Googlebot's crawl budget.</span
                >
              </p>
            </div>
            <div class="flex items-start gap-3 px-2 py-2">
              <span
                class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 shrink-0"
              >
                <icon name="tabler:hourglass" size="0.9em" /> > 2000 ms
              </span>
              <p class="p-reset text-gray-700">
                Slow.
                <span class="text-gray-400"
                  >May indicate server performance problems or throttling.</span
                >
              </p>
            </div>
          </div>
        </div>

        <!-- Declared in robots.txt -->
        <div>
          <div
            class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
          >
            Declared in robots.txt
          </div>
          <div
            class="border border-gray-200 rounded-lg divide-y divide-gray-100"
          >
            <div class="flex items-start gap-3 px-2 py-2">
              <icon
                name="tabler:circle-check"
                size="1.1em"
                class="text-green-500 shrink-0 mt-0.5"
              />
              <p class="p-reset text-gray-700">
                Listed as
                <code class="text-xs bg-gray-300 px-1 rounded"
                  >Sitemap: https://…</code
                >
                in robots.txt.
                <span class="text-gray-400"
                  >Helps crawlers discover it automatically.</span
                >
              </p>
            </div>
            <div class="flex items-start gap-3 px-2 py-2">
              <icon
                name="tabler:circle-x"
                size="1.1em"
                class="text-red-400 shrink-0 mt-0.5"
              />
              <p class="p-reset text-gray-700">
                Not declared in robots.txt.
                <span class="text-gray-400"
                  >Found via common paths (e.g.
                  <code class="text-xs bg-gray-300 px-1 rounded"
                    >/sitemap.xml</code
                  >) — recommended to declare it explicitly.</span
                >
              </p>
            </div>
          </div>
        </div>

        <!-- Googlebot blocked -->
        <div>
          <div
            class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
          >
            Googlebot blocked
          </div>
          <div
            class="border border-gray-200 rounded-lg divide-y divide-gray-100"
          >
            <div class="flex items-start gap-3 px-2 py-2">
              <icon
                name="tabler:circle-check"
                size="1.1em"
                class="text-green-500 shrink-0 mt-0.5"
              />
              <p class="p-reset text-gray-700">
                Googlebot is not blocked.
                <span class="text-gray-400"
                  >The site allows Google to crawl and index pages
                  normally.</span
                >
              </p>
            </div>
            <div class="flex items-start gap-3 px-2 py-2">
              <icon
                name="tabler:robot-off"
                size="1.1em"
                class="text-red-400 shrink-0 mt-0.5"
              />
              <p class="p-reset text-gray-700">
                <code class="text-xs bg-gray-300 px-1 rounded"
                  >Disallow: /</code
                >
                exists for Googlebot.
                <span class="text-gray-400"
                  >The sitemap will be ignored even if it's valid.</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </content-wrapper>
  </div>
</template>
