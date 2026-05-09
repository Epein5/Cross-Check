"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { handleSignout } from "@/features/auth/lib/signout-handler";

/**
 * Hook to handle user signout
 * @param redirectTo - Where to redirect after signout (default: "/")
 * @returns signout function and loading state
 */
export function useSignout(redirectTo: string = "/") {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signout = useCallback(async () => {
    setIsLoading(true);
    try {
      await handleSignout();
      router.replace(redirectTo);
    } catch (error) {
      console.error("Signout error:", error);
      setIsLoading(false);
    }
  }, [router, redirectTo]);

  return { signout, isLoading };
}
