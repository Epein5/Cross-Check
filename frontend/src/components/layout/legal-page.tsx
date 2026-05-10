import Link from "next/link";

type LegalPageProps = {
  title: string;
  description: string;
};

export function LegalPage({ title, description }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-background px-8 py-12 text-on-surface sm:px-16 lg:px-24">
      <section className="mx-auto max-w-3xl rounded-sm border-2 border-outline-variant bg-surface-container-lowest p-8 shadow-[8px_8px_0px_0px_#4c5e85]">
        <Link
          className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary transition-colors hover:text-primary"
          href="/"
        >
          Back to login
        </Link>
        <h1 className="mt-8 font-headline-lg text-[44px] leading-tight text-on-surface">
          {title}
        </h1>
        <p className="mt-5 font-body-lg text-body-lg text-on-surface-variant">
          {description}
        </p>
      </section>
    </main>
  );
}
