export default defineNuxtRouteMiddleware((to, from) => {
  const { userId } = useAuth();

  // If not signed in and trying to access protected route
  if (
    !userId.value &&
    to.path !== "/auth/login" &&
    to.path !== "/auth/register"
  ) {
    return navigateTo("/auth/login");
  }

  // If signed in and trying to access auth pages, redirect to home
  if (
    userId.value &&
    (to.path === "/auth/login" ||
      to.path === "/auth/register" ||
      to.path === "/")
  ) {
    return navigateTo("/register");
  }
});
