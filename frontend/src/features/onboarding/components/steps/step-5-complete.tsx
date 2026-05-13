"use client";

import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/ui/brand-mark";
import { motion } from "framer-motion";

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

export function Step5Complete() {
  const router = useRouter();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col bg-background text-on-surface antialiased selection:bg-primary selection:text-on-primary"
    >
      <header className="absolute top-0 z-50 w-full bg-transparent">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-container-margin py-6">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <BrandMark />
            </div>
            <span className="font-headline-md text-headline-md font-semibold text-on-surface">
              Cross Check
            </span>
          </div>
        </div>
      </header>
      
      <main className="relative flex flex-grow items-center justify-center px-8 sm:px-16 lg:px-24">
        <div className="login-dot-texture pointer-events-none absolute inset-0 z-0" />
        
        <div className="relative z-10 w-full max-w-2xl mt-16 mb-16 text-center flex flex-col items-center">
          
          <div className="mb-8 inline-flex h-16 w-16 -rotate-3 items-center justify-center rounded-sm bg-secondary text-on-secondary shadow-lg">
            <SecurityIcon />
          </div>
          
          <h1 className="font-label-mono text-label-mono text-primary tracking-[0.15em] uppercase mb-4">
            System Initialization Complete
          </h1>
          <h2 className="font-headline-lg text-[44px] leading-tight tracking-tight text-on-surface mb-6">
            Welcome to Cross Check
          </h2>
          
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto leading-relaxed mb-12">
            A Data Integrity Framework that validates every claim against internal records and live sources, then explains exactly what is wrong and why.
          </p>
          
          <button 
            onClick={() => router.replace("/home")}
            className="group flex items-center justify-center gap-3 rounded-sm border-2 border-outline-variant bg-surface-container-lowest px-8 py-4 font-body-lg text-body-lg font-medium text-on-surface transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:border-secondary hover:shadow-[8px_8px_0px_0px_#4c5e85]"
          >
            Enter Workspace
            <svg className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 text-outline-variant group-hover:text-secondary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
          
          <div className="mt-12 flex items-center gap-2 text-on-surface-variant opacity-70">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="font-label-mono text-label-mono tracking-widest uppercase">End-to-End Encryption Enabled</span>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
