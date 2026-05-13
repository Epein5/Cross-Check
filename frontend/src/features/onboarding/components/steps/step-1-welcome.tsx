"use client";

type Step1Props = {
  onNext: () => void;
};

export function Step1Welcome({ onNext }: Step1Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-10">
        <h1 className="font-headline-lg text-[32px] leading-tight tracking-tight text-on-surface">Welcome to Cross Check</h1>
        <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          We&apos;ve securely linked your identity. Let&apos;s set up your workspace so you can start validating claims, checking policies, and ensuring your data is correct, complete, and consistent.
        </p>
      </div>

      <div className="mt-auto flex justify-end pt-4 border-t border-outline-variant">
        <button 
          onClick={onNext}
          className="group flex items-center justify-center gap-3 rounded-sm border-2 border-outline-variant bg-surface-container-lowest px-6 py-3 font-body-lg text-body-lg font-medium text-on-surface transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:border-secondary hover:shadow-[6px_6px_0px_0px_#4c5e85]"
        >
          Begin Setup
          <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 text-outline-variant group-hover:text-secondary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
