import { clearAuthCookie, getAuthToken } from "~~/server/utils/authCookie";
import { verifyToken } from "~~/server/utils/verifyToken";

export default defineEventHandler((event) => {
  const token = getAuthToken(event);
  if (!token) return { valid: false as const };

  const decoded = verifyToken(token);
  if (!decoded) {
    clearAuthCookie(event);
    return { valid: false as const };
  }

  return {
    valid: true as const,
    user: decoded,
  };
});
