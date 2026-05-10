"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  clearAuthSession,
  parseAuthSessionFromHash,
  saveAuthSession,
} from "@/features/auth/lib/session";
import { ensureValidToken } from "@/features/auth/lib/session-manager";

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
          router.replace(redirectTo);
          return;
        }

        const existingSession = await ensureValidToken();

        if (isMounted && existingSession) {
          router.replace(redirectTo);
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
