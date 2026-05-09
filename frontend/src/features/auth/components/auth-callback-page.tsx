import { AuthHashHandler } from "@/features/auth/components/auth-hash-handler";

export function AuthCallbackPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-8 text-on-surface">
      <AuthHashHandler />
      <div className="relative w-full max-w-sm overflow-hidden rounded-sm border-2 border-outline-variant bg-surface-container-lowest p-8 shadow-[8px_8px_0px_0px_#4c5e85]">
        <div className="login-dot-texture pointer-events-none absolute inset-0" />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="h-10 w-10 animate-spin rounded-[999px] border-4 border-outline-variant border-t-secondary" />
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              Securing session
            </h1>
            <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
              Validating your Google authentication and preparing your workspace.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
