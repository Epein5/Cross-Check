import { env } from "@/lib/env";
import { getAuthSession } from "@/features/auth/lib/session";

/**
 * Call the backend signout endpoint with valid access token.
 */
export async function callSignoutEndpoint(): Promise<void> {
  const session = getAuthSession();
  
  if (!session?.accessToken) {
    throw new Error("No active session to sign out");
  }

  const response = await fetch(`${env.apiBaseUrl}/api/v1/auth/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Signout failed: ${response.status} ${response.statusText}`,
    );
  }
}
