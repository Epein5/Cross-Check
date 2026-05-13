"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchOrganizations } from "@/features/onboarding/api/onboarding";
import { ensureValidToken } from "@/features/auth/lib/session-manager";

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function checkAuthAndOnboarding() {
      try {
        const session = await ensureValidToken();
        if (!session) {
          router.replace("/login");
          return;
        }

        const orgs = await fetchOrganizations();
        if (orgs.length === 0) {
          router.replace("/onboarding");
        } else {
          setIsReady(true);
        }
      } catch (error) {
        console.error("Failed onboarding check:", error);
        // Let them through if the org check fails, or redirect to login? 
        // Redirect to onboarding as a fallback is safer.
        router.replace("/onboarding");
      }
    }

    checkAuthAndOnboarding();
  }, [router]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-on-surface">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-outline-variant border-t-secondary" />
      </div>
    );
  }

  return <>{children}</>;
}
