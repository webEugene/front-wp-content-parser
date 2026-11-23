import type { AuthUser } from "~/types/AuthType";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<AuthUser | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  const logout = async () => {
    await $fetch("/api/auth/logout", { method: "POST" });
    user.value = null;
    await navigateTo("/auth");
  };

  return { user, isAuthenticated, logout };
});
