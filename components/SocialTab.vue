<script setup lang="ts">
import type { SocialResult } from "~/server/schemas/grabLinksSchema";

interface Props {
  social: SocialResult | null;
}

defineProps<Props>();

// Конфіг відображення — іконка, лейбл, колір для кожної мережі
const SOCIAL_CONFIG: Record<
  keyof SocialResult,
  { label: string; icon: string; color: string }
> = {
  twitter: {
    label: "Twitter / X",
    icon: "carbon:logo-twitter",
    color: "text-sky-500",
  },
  facebook: {
    label: "Facebook",
    icon: "carbon:logo-facebook",
    color: "text-blue-600",
  },
  linkedin: {
    label: "LinkedIn",
    icon: "carbon:logo-linkedin",
    color: "text-blue-700",
  },
  instagram: {
    label: "Instagram",
    icon: "carbon:logo-instagram",
    color: "text-pink-500",
  },
  youtube: {
    label: "YouTube",
    icon: "carbon:logo-youtube",
    color: "text-red-600",
  },
  tiktok: {
    label: "TikTok",
    icon: "carbon:video",
    color: "text-gray-800 dark:text-gray-200",
  },
  pinterest: { label: "Pinterest", icon: "carbon:pin", color: "text-red-500" },
  telegram: {
    label: "Telegram",
    icon: "carbon:send-alt",
    color: "text-sky-400",
  },
  github: {
    label: "GitHub",
    icon: "carbon:logo-github",
    color: "text-gray-700 dark:text-gray-300",
  },
  whatsapp: { label: "WhatsApp", icon: "carbon:chat", color: "text-green-500" },
  viber: { label: "Viber", icon: "carbon:phone", color: "text-purple-600" },
};

const socialKeys = Object.keys(SOCIAL_CONFIG) as (keyof SocialResult)[];
</script>

<template>
  <div>
    <!-- Порожній стан -->
    <div v-if="!social" class="py-8 text-center text-sm text-gray-400">
      Немає даних
    </div>

    <template v-else>
      <!-- Знайдені мережі -->
      <div
        v-if="socialKeys.some((key) => social[key])"
        class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4"
      >
        <template v-for="key in socialKeys" :key="key">
          <a
            v-if="social[key]"
            :href="social[key]"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between px-3 py-2.5 even:bg-gray-50 dark:even:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <div class="flex items-center gap-2.5">
              <icon
                :name="SOCIAL_CONFIG[key].icon"
                size="16"
                :class="SOCIAL_CONFIG[key].color"
                aria-hidden="true"
              />
              <span
                class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {{ SOCIAL_CONFIG[key].label }}
              </span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-gray-400 font-mono truncate max-w-48">
                {{ social[key] }}
              </span>
              <icon
                name="carbon:arrow-up-right"
                size="13"
                class="text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors shrink-0"
                aria-hidden="true"
              />
            </div>
          </a>
        </template>
      </div>

      <!-- Не знайдені мережі -->
      <div v-if="socialKeys.some((key) => !social[key])">
        <p class="text-xs text-gray-400 mb-2">Не знайдено</p>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="key in socialKeys.filter((k) => !social[k])"
            :key="key"
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-xs text-gray-400"
          >
            <icon
              :name="SOCIAL_CONFIG[key].icon"
              size="12"
              aria-hidden="true"
            />
            {{ SOCIAL_CONFIG[key].label }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
