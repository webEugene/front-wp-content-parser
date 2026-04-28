import { authApi } from "~~/server/utils/auth";
import { loginSchema } from "~~/server/schemas/loginSchema";
import { authResponseSchema } from "~~/server/schemas/authResponseSchema";
import type { AuthResponseType } from "~~/shared/types/ResponsesType";

export default defineEventHandler(async (event): Promise<AuthResponseType> => {
  const body = await readBody(event);

  const parsedBody = loginSchema.safeParse(body);

  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request",
      data: parsedBody.error.flatten(),
    });
  }

  const params = {
    email: parsedBody.data.email,
    password: parsedBody.data.password,
  };

  const { registerUser } = authApi();

  const response = await registerUser(params);

  const parsed = authResponseSchema.safeParse(response);
  if (!parsed.success) {
    throw createError({
      statusCode: 502,
      statusMessage: "Invalid response from auth service",
      data: parsed.error.format(),
    });
  }

  // Save JWT as HttpOnly cookie (secure!)
  setCookie(event, "auth_token", parsed.data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return parsed.data;
});
