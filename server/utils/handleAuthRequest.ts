import type { H3Event } from "h3";
import { authSchema, type AuthBodyType } from "~~/server/schemas/authSchema";
import { setAuthCookie } from "~~/server/utils/authCookie";
import {
  authResponseSchema,
  type AuthResponseType,
} from "~~/server/schemas/authResponseSchema";

export type AuthClientResponse = Pick<AuthResponseType, "userInfo">;

/**
 * Validates credentials, calls the auth backend, stores the token in an
 * httpOnly cookie and returns only user info (the token never reaches JS).
 */
export async function handleAuthRequest(
  event: H3Event,
  action: (body: AuthBodyType) => Promise<unknown>,
): Promise<AuthClientResponse> {
  const body = await readValidatedBody(event, authSchema.safeParse);

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request",
      data: body.error.flatten(),
    });
  }

  const response = await action(body.data);

  const parsed = authResponseSchema.safeParse(response);
  if (!parsed.success) {
    throw createError({
      statusCode: 502,
      statusMessage: "Invalid response from auth service",
    });
  }

  setAuthCookie(event, parsed.data.access_token);

  return { userInfo: parsed.data.userInfo };
}
