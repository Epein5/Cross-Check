import { clearAuthSession } from "@/features/auth/lib/session";
import { callSignoutEndpoint } from "@/features/auth/api/signout";

/**
 * Handle the complete signout flow:
 * 1. Call backend signout endpoint
 * 2. Clear auth session from storage
 * 3. Log errors gracefully (don't fail if backend call fails)
 */
export async function handleSignout(): Promise<void> {
  try {
    // Call backend to invalidate session on server side
    await callSignoutEndpoint();
  } catch (error) {
    // Log error but continue with local cleanup
    console.error("Backend signout failed:", error);
  }

  // Always clear local session
  clearAuthSession();
}
