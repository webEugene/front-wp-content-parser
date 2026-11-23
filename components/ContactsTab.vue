<script setup lang="ts">
import type { ContactsResult } from "~/server/schemas/grabLinksSchema";

interface Props {
  contacts: ContactsResult | null;
  isBlocked: boolean;
  blockerType: string | null;
}

defineProps<Props>();
</script>

<template>
  <div>
    <!-- isBlocked банер -->
    <div
      v-if="isBlocked"
      class="flex items-start gap-3 px-3 py-2.5 mb-4 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950"
    >
      <icon
        name="carbon:warning"
        class="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0"
        size="16"
        aria-hidden="true"
      />
      <div>
        <p class="text-sm font-medium text-amber-700 dark:text-amber-300">
          Захищено {{ blockerType }}
        </p>
        <p
          class="text-xs text-amber-600 dark:text-amber-400 mt-0.5 leading-relaxed"
        >
          Статус 200 · Дані можуть бути частковими — деякі контакти недоступні
          через захист сайту.
        </p>
      </div>
    </div>

    <!-- Порожній стан -->
    <div v-if="!contacts" class="py-8 text-center text-sm text-gray-400">
      Немає даних
    </div>

    <template v-else>
      <!-- Emails -->
      <div class="mb-1">
        <div class="flex items-center gap-2 mb-3">
          <icon
            name="carbon:email"
            size="15"
            class="text-gray-500"
            aria-hidden="true"
          />
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400"
            >Emails</span
          >
          <span
            v-if="contacts.emails.length"
            class="px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          >
            {{ contacts.emails.reduce((acc, g) => acc + g.emails.length, 0) }}
          </span>
        </div>

        <div
          v-if="contacts.emails.length"
          class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        >
          <template v-for="group in contacts.emails" :key="group.category">
            <div
              v-for="email in group.emails"
              :key="email"
              class="flex items-center justify-between px-3 py-2 even:bg-gray-50 dark:even:bg-gray-900"
            >
              <span
                class="text-sm font-mono text-indigo-600 dark:text-indigo-400 truncate"
                >{{ email }}</span
              >
              <span
                class="ml-3 shrink-0 text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              >
                {{ group.category }}
              </span>
            </div>
          </template>
        </div>
        <p v-else class="text-sm text-gray-400">Email-адреси не знайдено</p>
      </div>

      <div class="h-px bg-gray-100 dark:bg-gray-800 my-4" />

      <!-- Phones -->
      <div class="mb-1">
        <div class="flex items-center gap-2 mb-3">
          <icon
            name="carbon:phone"
            size="15"
            class="text-gray-500"
            aria-hidden="true"
          />
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400"
            >Phones</span
          >
          <span
            v-if="contacts.phones.length"
            class="px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          >
            {{ contacts.phones.length }}
          </span>
        </div>

        <div
          v-if="contacts.phones.length"
          class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        >
          <div
            v-for="phone in contacts.phones"
            :key="phone.raw"
            class="flex items-center justify-between px-3 py-2 even:bg-gray-50 dark:even:bg-gray-900"
          >
            <span
              class="text-sm font-mono text-indigo-600 dark:text-indigo-400"
            >
              {{ phone.formatted ?? phone.raw }}
            </span>
            <span
              v-if="phone.country"
              class="ml-3 shrink-0 text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            >
              {{ phone.country }}
            </span>
          </div>
        </div>
        <p v-else class="text-sm text-gray-400">Телефони не знайдено</p>
      </div>

      <div class="h-px bg-gray-100 dark:bg-gray-800 my-4" />

      <!-- Addresses -->
      <div>
        <div class="flex items-center gap-2 mb-3">
          <icon
            name="carbon:location"
            size="15"
            class="text-gray-500"
            aria-hidden="true"
          />
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400"
            >Addresses</span
          >
          <span
            v-if="contacts.addresses.length"
            class="px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          >
            {{ contacts.addresses.length }}
          </span>
        </div>

        <div
          v-if="contacts.addresses.length"
          class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        >
          <div
            v-for="(addr, idx) in contacts.addresses"
            :key="idx"
            class="px-3 py-2 even:bg-gray-50 dark:even:bg-gray-900"
          >
            <p class="text-sm text-gray-700 dark:text-gray-300">
              {{
                [
                  addr.streetAddress,
                  addr.addressLocality,
                  addr.addressRegion,
                  addr.postalCode,
                ]
                  .filter(Boolean)
                  .join(", ")
              }}
            </p>
            <p v-if="addr.addressCountry" class="text-xs text-gray-400 mt-0.5">
              {{ addr.addressCountry }}
            </p>
          </div>
        </div>
        <p v-else class="text-sm text-gray-400">Адреси не знайдено</p>
      </div>
    </template>
  </div>
</template>
