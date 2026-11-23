import { clearAuthCookie } from "~~/server/utils/authCookie";

export default defineEventHandler((event) => {
  clearAuthCookie(event);
  return { success: true };
});
