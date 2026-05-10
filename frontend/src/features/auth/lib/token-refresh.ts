import { env } from "@/lib/env";
import type { AuthSession } from "@/features/auth/lib/session";

/**
 * Response from Supabase token refresh endpoint
 */
type TokenRefreshResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
};

/**
 * Refresh an access token using Supabase refresh token endpoint
 * @param refreshToken - The refresh token from the auth session
 * @returns Updated auth session with new access token
 * @throws Error if token refresh fails
 */
export async function refreshAccessToken(
  refreshToken: string,
): Promise<AuthSession> {
  const response = await fetch(
    `${env.supabaseUrl}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Token refresh failed: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as TokenRefreshResponse;

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? null,
    expiresAt: data.expires_at ?? null,
    expiresIn: data.expires_in ?? null,
    tokenType: data.token_type ?? null,
    providerToken: null,
  };
}
