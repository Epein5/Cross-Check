import { env } from "@/lib/env";
import { getAuthSession } from "@/features/auth/lib/session";

const SIGNOUT_TIMEOUT_MS = 5000;

/**
 * Call the backend signout endpoint with valid access token.
 */
export async function callSignoutEndpoint(): Promise<void> {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("No active session to sign out");
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), SIGNOUT_TIMEOUT_MS);

  let response: Response;

  try {
    response = await fetch(`${env.apiBaseUrl}/api/v1/auth/signout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Signout timed out. Local session will be cleared.");
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new Error(
      `Signout failed: ${response.status} ${response.statusText}`,
    );
  }
}
