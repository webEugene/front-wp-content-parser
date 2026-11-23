import { authApi } from "~~/server/utils/auth";
import { handleAuthRequest } from "~~/server/utils/handleAuthRequest";

export default defineEventHandler((event) => {
  const { registerUser } = authApi();
  return handleAuthRequest(event, registerUser);
});
