import { authApi } from "~~/server/utils/auth";
import { handleAuthRequest } from "~~/server/utils/handleAuthRequest";

export default defineEventHandler((event) => {
  const { login } = authApi();
  return handleAuthRequest(event, login);
});
