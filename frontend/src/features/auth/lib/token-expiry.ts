import type { AuthSession } from "@/features/auth/lib/session";

/**
 * Check if an authentication session token is expired.
 * @param session - The auth session containing expiration info
 * @returns true if token is expired or will expire within buffer
 */
export function isTokenExpired(
  session: AuthSession | null,
  bufferSeconds: number = 60,
): boolean {
  if (!session?.expiresAt) {
    return false;
  }

  // Convert expiresAt (seconds) to milliseconds and compare with current time
  const expirationTime = session.expiresAt * 1000;
  const currentTime = Date.now();
  const bufferMs = bufferSeconds * 1000;

  return currentTime + bufferMs >= expirationTime;
}

/**
 * Check if a refresh token is available
 */
export function hasRefreshToken(session: AuthSession | null): boolean {
  return !!session?.refreshToken;
}
