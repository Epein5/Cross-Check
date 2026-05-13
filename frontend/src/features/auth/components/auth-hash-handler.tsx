"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  clearAuthSession,
  parseAuthSessionFromHash,
  saveAuthSession,
} from "@/features/auth/lib/session";
import { ensureValidToken } from "@/features/auth/lib/session-manager";
import { fetchOrganizations } from "@/features/onboarding/api/onboarding";

type AuthHashHandlerProps = {
  redirectTo?: string;
};

export function AuthHashHandler({ redirectTo = "/home" }: AuthHashHandlerProps) {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function handleAuth() {
      try {
        const session = parseAuthSessionFromHash(window.location.hash);

        if (session) {
          saveAuthSession(session);
          window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}`,
          );
        } else {
          const existingSession = await ensureValidToken();
          if (!existingSession) {
             return;
          }
        }

        // We have a valid token, now check if onboarding is needed
        if (isMounted) {
          try {
            const orgs = await fetchOrganizations();
            if (orgs.length === 0) {
              router.replace("/onboarding");
            } else {
              router.replace(redirectTo);
            }
          } catch (orgError) {
             console.error("Failed to fetch orgs:", orgError);
             // On error, try to go to the app, but they might need to onboard
             router.replace("/onboarding");
          }
        }
      } catch (error) {
        console.error("Failed to complete auth callback:", error);
        clearAuthSession();
      }
    }

    handleAuth();

    return () => {
      isMounted = false;
    };
  }, [redirectTo, router]);

  return null;
}
