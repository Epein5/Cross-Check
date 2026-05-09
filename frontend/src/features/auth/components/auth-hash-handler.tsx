"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  parseAuthSessionFromHash,
  saveAuthSession,
} from "@/features/auth/lib/session";

type AuthHashHandlerProps = {
  redirectTo?: string;
};

export function AuthHashHandler({ redirectTo = "/home" }: AuthHashHandlerProps) {
  const router = useRouter();

  useEffect(() => {
    const session = parseAuthSessionFromHash(window.location.hash);

    if (!session) {
      return;
    }

    saveAuthSession(session);
    window.history.replaceState(null, "", window.location.pathname);
    router.replace(redirectTo);
  }, [redirectTo, router]);

  return null;
}
