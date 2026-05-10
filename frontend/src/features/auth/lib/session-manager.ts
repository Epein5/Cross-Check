import { getAuthSession, saveAuthSession } from "@/features/auth/lib/session";
import { isTokenExpired, hasRefreshToken } from "./token-expiry";
import { refreshAccessToken } from "./token-refresh";

/**
 * Ensure the access token is valid, refreshing if necessary
 * @returns The current valid auth session or null if no session exists
 * @throws Error if session exists but token refresh fails
 */
export async function ensureValidToken() {
  const session = getAuthSession();

  // No session exists
  if (!session) {
    return null;
  }

  // Token is still valid
  if (!isTokenExpired(session)) {
    return session;
  }

  // Token expired but no refresh token available
  if (!hasRefreshToken(session)) {
    return session; // Return stale session and let API handle 401
  }

  // Attempt to refresh token
  const refreshedSession = await refreshAccessToken(session.refreshToken!);
  saveAuthSession(refreshedSession);

  return refreshedSession;
}
