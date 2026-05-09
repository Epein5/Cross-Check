function GoogleIcon() {
  return (
    <svg
      className="h-5 w-5 text-on-surface transition-colors group-hover:text-secondary"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

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

function ArrowRightIcon() {
  return (
    <svg
      className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
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
          <button className="group flex w-full items-center justify-between rounded-sm border-2 border-outline-variant bg-surface-container-lowest px-6 py-4 font-body-lg text-body-lg font-medium text-on-surface transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:border-secondary hover:shadow-[6px_6px_0px_0px_#4c5e85]" type="button">
            <div className="flex items-center gap-4">
              <GoogleIcon />
              <span className="tracking-wide text-on-surface">
                Continue with Google
              </span>
            </div>
            <span className="text-outline-variant transition-colors duration-300 group-hover:text-secondary">
              <ArrowRightIcon />
            </span>
          </button>
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
      <LoginHeader />
      <main className="relative flex w-full flex-grow overflow-hidden">
        <LoginHero />
        <LoginFormPanel />
      </main>
      <LoginFooter />
    </div>
  );
}
