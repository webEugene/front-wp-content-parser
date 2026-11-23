import { jwtDecode, type JwtPayload } from "jwt-decode";

export type AuthTokenPayload = JwtPayload & { id: string };

/**
 * Decodes the JWT and checks its expiry.
 * NOTE: the signature is NOT verified here — the token must not be trusted
 * for authorization decisions on its own; the backend verifies it.
 */
export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    const payload = jwtDecode<AuthTokenPayload>(token);
    if (!payload?.id) return null;
    if (payload.exp && payload.exp * 1000 <= Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
