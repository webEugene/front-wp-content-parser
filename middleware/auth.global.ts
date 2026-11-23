import type { AuthUser } from "~/types/AuthType";

const PROTECTED_ROUTES = ["/client", "/admin", "/dashboard"];

const isProtectedPath = (path: string): boolean =>
  PROTECTED_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );

export default defineNuxtRouteMiddleware(async (to) => {
  const isProtected = isProtectedPath(to.path);
  const isAuthPage = to.path === "/auth";

  if (!isProtected && !isAuthPage) return;

  const data = await $fetch("/api/auth/verify", {
    headers: useRequestHeaders(["cookie"]),
  }).catch(() => null);

  if (isAuthPage) {
    return data?.valid ? navigateTo("/client") : undefined;
  }

  if (!data?.valid) {
    return navigateTo("/auth");
  }

  const authStore = useAuthStore();
  if (!authStore.user) {
    // TODO: JWT payload may not contain email/plan_id — see review notes
    authStore.user = data.user as unknown as AuthUser;
  }
});
