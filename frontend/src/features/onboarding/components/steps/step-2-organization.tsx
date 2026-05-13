"use client";

import { useState } from "react";
import { createOrganization } from "../../api/onboarding";

type Step2Props = {
  onNext: () => void;
  setOrgId: (id: string) => void;
};

export function Step2Organization({ onNext, setOrgId }: Step2Props) {
  const [orgName, setOrgName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const org = await createOrganization({ name: orgName });
      setOrgId(org.id);
      onNext();
    } catch (error) {
      console.error("Failed to create org", error);
      onNext();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="mb-10">
        <h1 className="font-headline-lg text-[32px] leading-tight tracking-tight text-on-surface">Create Organization</h1>
        <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Define the primary operational entity for your data validation environment.
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <label className="font-label-mono text-label-mono uppercase text-on-surface-variant" htmlFor="orgName">Organization Name</label>
          <p className="font-body-md text-sm text-outline-variant mb-1">This will be your workspace identifier.</p>
          <input 
            required
            value={orgName}
            onChange={e => setOrgName(e.target.value)}
            className="w-full rounded-sm border-2 border-outline-variant bg-surface px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-0 transition-colors" 
            id="orgName" 
            placeholder="e.g. Cross Check Corp" 
            type="text"
          />
        </div>
      </div>

      <div className="mt-auto flex justify-end pt-4 border-t border-outline-variant">
        <button 
          disabled={isSubmitting || !orgName.trim()}
          type="submit" 
          className="group flex items-center justify-center gap-3 rounded-sm border-2 border-outline-variant bg-surface-container-lowest px-6 py-3 font-body-lg text-body-lg font-medium text-on-surface transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:border-secondary hover:shadow-[6px_6px_0px_0px_#4c5e85] disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Initialize Workspace"}
          <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 text-outline-variant group-hover:text-secondary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}
