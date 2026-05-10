import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  description: string;
  sections: Array<{
    title: string;
    body: ReactNode;
  }>;
};

function BrandMark() {
  return (
    <span
      className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary text-primary"
      aria-hidden="true"
    >
      <span className="h-3.5 w-3.5 rounded-full bg-current" />
      <span className="absolute -right-1 top-1 h-2.5 w-2.5 rounded-full bg-secondary" />
      <span className="absolute -bottom-1 left-1 h-2.5 w-2.5 rounded-full bg-secondary" />
    </span>
  );
}

export function LegalPage({ title, description, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-background px-8 py-12 text-on-surface sm:px-16 lg:px-24">
      <section className="mx-auto max-w-3xl rounded-sm border-2 border-outline-variant bg-surface-container-lowest p-8 shadow-[8px_8px_0px_0px_#4c5e85]">
        <Link
          className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary transition-colors hover:text-primary"
          href="/"
        >
          Back to login
        </Link>
        <div className="mt-8 flex items-center gap-3">
          <BrandMark />
          <span className="font-headline-md text-headline-md font-semibold text-on-surface">
            Cross Check
          </span>
        </div>
        <h1 className="mt-6 font-headline-lg text-[44px] leading-tight text-on-surface">
          {title}
        </h1>
        <p className="mt-5 font-body-lg text-body-lg text-on-surface-variant">
          {description}
        </p>

        <div className="mt-10 grid gap-8 border-t border-outline-variant pt-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-headline-lg text-[24px] leading-tight text-on-surface">
                {section.title}
              </h2>
              <div className="mt-3 font-body-md text-body-md text-on-surface-variant">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
