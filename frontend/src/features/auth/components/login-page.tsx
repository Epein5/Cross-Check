import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";
import { AuthHashHandler } from "@/features/auth/components/auth-hash-handler";

function HelpIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2.1-.6.5-.8.9-.8 1.9" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function SecurityIcon() {
  return (
    <svg
      className="h-8 w-8 rotate-3"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2 5 5v6c0 4.55 2.98 8.8 7 10 4.02-1.2 7-5.45 7-10V5l-7-3Zm0 2.2 5 2.14V11c0 3.47-2.08 6.82-5 7.88C9.08 17.82 7 14.47 7 11V6.34l5-2.14Zm3.54 5.26-4.6 4.6-2.12-2.12-1.41 1.41 3.53 3.54 6.02-6.02-1.42-1.41Z" />
    </svg>
  );
}

function LoginHeader() {
  return (
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-container-margin py-6">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rotate-45 rounded-sm bg-primary" />
          <span className="font-headline-md text-headline-md font-semibold text-inverse-surface mix-blend-difference lg:text-surface-container-lowest">
            Data Integrity Framework
          </span>
        </div>

        <button
          aria-label="Help"
          className="scale-95 rounded-[999px] p-2 text-on-surface transition-colors hover:bg-surface-container-low/20 active:scale-90 lg:text-surface-container-lowest"
          type="button"
        >
          <HelpIcon />
        </button>
      </div>
    </header>
  );
}

function LoginHero() {
  return (
    <section className="relative hidden w-[55%] flex-col justify-center overflow-hidden bg-inverse-surface px-24 py-12 lg:flex">
      <div className="pointer-events-none absolute -left-10 top-0 flex select-none flex-col gap-8 opacity-[0.03]">
        <h2 className="whitespace-nowrap font-headline-lg text-[140px] leading-[0.8] tracking-tighter text-surface-container-lowest">
          VALIDATION
        </h2>
        <h2 className="ml-32 whitespace-nowrap font-headline-lg text-[140px] leading-[0.8] tracking-tighter text-surface-container-lowest">
          PROTOCOL
        </h2>
        <h2 className="ml-64 whitespace-nowrap font-headline-lg text-[140px] leading-[0.8] tracking-tighter text-surface-container-lowest">
          MATRIX
        </h2>
      </div>

      <div className="relative z-10 mt-12 max-w-lg text-inverse-on-surface">
        <div className="mb-8 inline-flex h-16 w-16 -rotate-3 items-center justify-center rounded-sm bg-secondary text-on-secondary shadow-lg">
          <SecurityIcon />
        </div>
        <h1 className="mb-6 font-headline-lg text-[48px] leading-tight text-surface-container-lowest">
          Autonomous
          <br />
          Reliability Matrix.
        </h1>
        <p className="max-w-md font-body-lg text-body-lg text-outline-variant">
          Enter the sophisticated gateway for ensuring structural data integrity
          through precision algorithms and neural pathways.
        </p>
      </div>
    </section>
  );
}

function LoginFormPanel() {
  return (
    <section className="relative z-10 flex w-full flex-col justify-center bg-background px-8 sm:px-16 lg:w-[45%] lg:px-24">
      <div className="login-dot-texture pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto w-full max-w-sm lg:mx-0">
        <div className="mb-12">
          <h2 className="mb-3 font-headline-lg text-headline-lg tracking-tight text-on-surface">
            Access Node
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Authenticate your identity to interface with the validation agent.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <GoogleAuthButton />
        </div>

        <div className="mt-16 flex flex-col gap-6">
          <div className="h-px w-full bg-gradient-to-r from-outline-variant to-transparent" />
          <div className="flex items-center justify-between">
            <span className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary">
              Secure Gateway
            </span>
            <p className="flex items-center gap-2 font-label-mono text-label-mono uppercase tracking-wider text-on-surface-variant">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-[999px] bg-[#059669] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-[999px] bg-[#059669]" />
              </span>
              Online
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LoginFooter() {
  return (
    <footer className="pointer-events-none absolute bottom-0 z-50 w-full">
      <div className="pointer-events-auto mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-4 px-container-margin py-6 md:flex-row md:gap-0">
        <div className="hidden font-body-md text-body-md text-surface-container-high/60 lg:block">
          © 2024 Data Integrity Framework. Autonomous Reliability.
        </div>
        <div className="font-body-md text-body-md text-secondary lg:hidden">
          © 2024 Data Integrity Framework.
        </div>
        <nav className="flex items-center gap-6">
          <a className="font-body-md text-body-md text-on-surface-variant transition-colors hover:text-primary lg:text-surface-container-high/60 lg:hover:text-surface-container-lowest" href="#">
            Privacy Policy
          </a>
          <a className="font-body-md text-body-md text-on-surface-variant transition-colors hover:text-primary lg:text-surface-container-high/60 lg:hover:text-surface-container-lowest" href="#">
            Terms of Service
          </a>
          <a className="font-body-md text-body-md text-on-surface-variant transition-colors hover:text-primary lg:text-surface-container-high/60 lg:hover:text-surface-container-lowest" href="#">
            Security
          </a>
        </nav>
      </div>
    </footer>
  );
}

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-on-surface antialiased selection:bg-primary selection:text-on-primary">
      <AuthHashHandler />
      <LoginHeader />
      <main className="relative flex w-full flex-grow overflow-hidden">
        <LoginHero />
        <LoginFormPanel />
      </main>
      <LoginFooter />
    </div>
  );
}
