import type { H3Event } from "h3";
import { AUTH_COOKIE_NAME } from "~~/constants/auth";

const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24;

export function setAuthCookie(event: H3Event, token: string): void {
  setCookie(event, AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE,
  });
}

export function getAuthToken(event: H3Event): string | undefined {
  return getCookie(event, AUTH_COOKIE_NAME);
}

export function clearAuthCookie(event: H3Event): void {
  deleteCookie(event, AUTH_COOKIE_NAME, { path: "/" });
}
