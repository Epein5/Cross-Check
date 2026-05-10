"use client";

import { useSignout } from "@/features/auth/hooks/useSignout";

function SignoutIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
      />
    </svg>
  );
}

export function SignoutButton() {
  const { signout, isLoading } = useSignout();

  return (
    <button
      aria-busy={isLoading}
      className="inline-flex items-center gap-2 rounded-sm border-2 border-outline-variant bg-surface-container-lowest px-4 py-2 font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-secondary hover:shadow-[4px_4px_0px_0px_#4c5e85] disabled:pointer-events-none disabled:opacity-70"
      disabled={isLoading}
      onClick={signout}
      type="button"
    >
      {isLoading ? <SpinnerIcon /> : <SignoutIcon />}
      {isLoading ? "Signing out" : "Sign out"}
    </button>
  );
}
