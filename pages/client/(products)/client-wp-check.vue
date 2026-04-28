<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { urlWithMessageSchema } from "~/schemas/urlSchema";
import { isErrorWithMessage } from "~/utils/isErrorWithMessage";
import {
  getFrameworkByLabel,
  ERROR_MESSAGES,
  type FrameworkDetail,
} from "~/constants";

definePageMeta({
  layout: "client-template",
  middleware: "auth",
});

interface BlockDetection {
  isBlocked: boolean;
  blockerType?: string | null;
  indicators: string[];
  severity: "none" | "low" | "medium" | "high";
  recommendation?: string;
}

interface WpCheckData {
  url: string;
  isWp: boolean;
  framework?: string;
  blockDetection?: BlockDetection;
}

interface WpCheckResponse {
  data?: WpCheckData;
}

type SeverityColor = "red" | "amber" | "blue" | "green";

// State
const response = ref<WpCheckResponse | null>(null);
const error = ref<string | null>(null);
const loading = ref(false);

// Form validation
const urlSchema = toTypedSchema(urlWithMessageSchema);
const { value: url, errorMessage } = useField("url", urlSchema);

const frameworkFound = computed((): FrameworkDetail | null => {
  if (!response.value?.data?.framework) return null;
  return getFrameworkByLabel(response.value.data.framework) ?? null;
});

const disabledBtn = computed(() => {
  return !url.value || !!errorMessage.value || loading.value;
});

const showUnknownFrameworkError = computed((): boolean => {
  return Boolean(
    response.value &&
      response.value.data?.isWp === false &&
      !frameworkFound.value,
  );
});

async function checkWpDetect(): Promise<void> {
  if (!url.value) return;

  resetState();
  loading.value = true;

  try {
    const { data, error: fetchError } = await useFetch("/api/client/wp-check", {
      params: { url: url.value },
    });

    handleResponse(data.value, fetchError.value);
  } catch (err) {
    handleError(err);
  } finally {
    loading.value = false;
  }
}

function handleResponse(data: WpCheckResponse | null, fetchError: any) {
  if (fetchError) {
    if (fetchError.statusCode === 500) {
      error.value = ERROR_MESSAGES.SERVER_ERROR;
    } else {
      error.value = fetchError.message || ERROR_MESSAGES.UNKNOWN;
    }
    response.value = null;
    return;
  }

  response.value = data;
  error.value = null;
  url.value = "";
}

function handleError(err: unknown) {
  if (isErrorWithMessage(err)) {
    error.value = err.message;
    response.value = null;
  }

  if (err instanceof Error) {
    error.value = err.message;
    response.value = null;
  }

  error.value = ERROR_MESSAGES.UNKNOWN;
  response.value = null;
}

function resetState() {
  error.value = null;
  response.value = null;
}

const blockDetectionStructured = computed(() => {
  const blockData = response.value?.data?.blockDetection;
  if (!blockData) return null;

  return {
    isBlocked: blockData.isBlocked ? "Yes" : "No",
    blockerType: blockData.blockerType ?? "N/A",
    indicators:
      blockData.indicators.length > 0
        ? blockData.indicators.join(", ")
        : "None",
    severity: blockData.severity,
  };
});

const showBlockDetectionTable = computed((): boolean => {
  return Boolean(
    response.value?.data?.blockDetection?.isBlocked &&
      blockDetectionStructured.value,
  );
});

function severityColor(severity?: string): SeverityColor {
  const colorMap: Record<string, SeverityColor> = {
    high: "red",
    medium: "amber",
    low: "blue",
  };

  return colorMap[severity ?? ""] ?? "green";
}
</script>

<template>
  <div>
    <HeadingPage heading="WordPress Check" :client="true"></HeadingPage>
    <div class="wrapper mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div
        class="form-wp-check w-2/4 p-2 mx-auto flex flex-col justify-center items-center"
      >
        <div class="w-64 sm:w-96">
          <BaseInput
            id="input-wp-check"
            v-model:input-value="url"
            placeholder="Enter https://sample.com or sample.com"
            :error-message="!!errorMessage"
          />
          <span v-if="errorMessage" class="error font-bold text-amber-700">{{
            errorMessage
          }}</span>
        </div>
        <BaseButton
          class="flex rounded mt-3 min-w-40 justify-center"
          :disabled="disabledBtn"
          @click.prevent="checkWpDetect"
        >
          <ProgressCircleSvg v-if="loading" />
          <span v-if="!loading">Check</span>
          <span v-else>Processing... </span>
        </BaseButton>
      </div>
      <!-- Framework Detected Card -->
      <transition name="fade">
        <div
          v-if="frameworkFound"
          class="notify-card w-3/5 my-4 border rounded-md flex flex-col items-center mx-auto"
        >
          <div
            class="notify-card__header w-full flex justify-center items-center bg-green-200 px-6 py-4"
          >
            <Icon
              name="ep:success-filled"
              size="2em"
              class="text-green-800 mr-2"
            />
            Detected {{ frameworkFound.name }}
          </div>
          <div
            class="notify-card__body w-full flex justify-center items-center px-6 py-4"
          >
            <Icon :name="frameworkFound.icon" size="2em" class="mr-2" />
            Website: <strong>{{ response?.data.url }}</strong>
          </div>
        </div>
      </transition>
      <!-- Block Detection Table -->
      <transition name="fade">
        <div
          v-if="showBlockDetectionTable"
          class="min-w-full divide-y divide-gray-200 my-6 shadow-sm border rounded-lg overflow-hidden"
        >
          <!-- Header -->
          <div class="flex bg-gray-50">
            <div
              class="flex-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </div>
            <div
              class="flex-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Value
            </div>
          </div>

          <!-- Body -->
          <div class="bg-white divide-y divide-gray-200">
            <!-- Blocked Status -->
            <div class="flex hover:bg-gray-50 transition-colors">
              <div class="flex-1 px-6 py-4 whitespace-nowrap font-semibold">
                Blocked
              </div>
              <div class="flex-1 px-6 py-4 whitespace-nowrap font-bold">
                {{ blockDetectionStructured?.isBlocked }}
              </div>
            </div>

            <!-- Blocker Type -->
            <div class="flex hover:bg-gray-50 transition-colors">
              <div class="flex-1 px-6 py-4 whitespace-nowrap font-semibold">
                Blocker Type
              </div>
              <div class="flex-1 px-6 py-4 whitespace-nowrap">
                {{ blockDetectionStructured?.blockerType }}
              </div>
            </div>

            <!-- Severity -->
            <div class="flex hover:bg-gray-50 transition-colors">
              <div class="flex-1 px-6 py-4 whitespace-nowrap font-semibold">
                Severity
              </div>
              <div class="flex-1 px-6 py-4 whitespace-nowrap">
                <span
                  :class="`rounded-md bg-${severityColor(blockDetectionStructured?.severity)}-600 py-0.5 px-2.5 border border-transparent text-sm inline text-white transition-all shadow-sm capitalize`"
                >
                  {{ blockDetectionStructured?.severity }}
                </span>
              </div>
            </div>

            <!-- Indicators -->
            <div class="flex hover:bg-gray-50 transition-colors">
              <div class="flex-1 px-6 py-4 whitespace-nowrap font-semibold">
                Indicators
              </div>
              <div class="flex-1 px-6 py-4 font-bold">
                {{ blockDetectionStructured?.indicators }}
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- Unknown Framework Error -->
      <BaseAlert v-if="showUnknownFrameworkError" type="error">
        We cannot access your website
        <strong>{{ response?.data.url }}</strong> in order to perform our test!
        <br /><br />
        Reasons:
        <ul>
          <li>
            - <strong>{{ response?.data.url }}</strong> is not written on
            Wordpress (most common) or other technologies;
          </li>
          <li>
            - <strong>{{ response?.data.url }}</strong> is not online;
          </li>
          <li>
            - our tool is being blocked by
            <strong>{{ response?.data.url }}</strong> server;
          </li>
        </ul>
      </BaseAlert>
      <!-- General Error Alert -->
      <BaseAlert v-if="error" type="error">
        <span>{{ error }}</span>
      </BaseAlert>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
