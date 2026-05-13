import { SignoutButton } from "@/features/auth/components/signout-button";
import { BrandMark } from "@/components/ui/brand-mark";

export function HomePage() {
  return (
    <main className="min-h-screen bg-background px-8 py-10 text-on-surface sm:px-16 lg:px-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandMark />
            <span className="font-headline-md text-headline-md font-semibold text-on-surface">
              Cross Check
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary sm:inline">
              Authenticated
            </span>
            <SignoutButton />
          </div>
        </header>

        <section className="relative overflow-hidden rounded-sm border-2 border-outline-variant bg-surface-container-lowest p-8 shadow-[8px_8px_0px_0px_#4c5e85] sm:p-12">
          <div className="login-dot-texture pointer-events-none absolute inset-0" />
          <div className="relative z-10 max-w-2xl">
            <p className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary">
              Validator Ready
            </p>
            <h1 className="mt-4 font-headline-lg text-[44px] leading-tight tracking-tight text-on-surface">
              Start validating claims.
            </h1>
            <p className="mt-5 font-body-lg text-body-lg text-on-surface-variant">
              Upload or connect data, add claims, and let Cross Check compare
              them against trusted internal and live sources.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
