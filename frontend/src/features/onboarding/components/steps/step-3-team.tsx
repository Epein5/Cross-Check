"use client";

import { useState } from "react";
import { inviteMember } from "../../api/onboarding";

type Step3Props = {
  onNext: () => void;
  orgId: string | null;
};

export function Step3Team({ onNext, orgId }: Step3Props) {
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !orgId) return;
    
    setIsSubmitting(true);
    try {
      await inviteMember(orgId, email);
      setInvites([...invites, email]);
      setEmail("");
    } catch (error) {
      console.error("Failed to invite member", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-10">
        <h1 className="font-headline-lg text-[32px] leading-tight tracking-tight text-on-surface">Build Your Node</h1>
        <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Invite team members to your workspace.
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-10">
        <form onSubmit={handleInvite} className="flex flex-col gap-3">
          <label className="font-label-mono text-label-mono uppercase text-on-surface-variant" htmlFor="emailAddress">Target Email Address</label>
          <div className="flex gap-4">
            <input 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 rounded-sm border-2 border-outline-variant bg-surface px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-0 transition-colors" 
              id="emailAddress" 
              placeholder="colleague@domain.com" 
              type="email"
            />
            <button 
              disabled={isSubmitting || !email.trim()}
              type="submit" 
              className="group flex items-center justify-center gap-2 rounded-sm border-2 border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md font-medium text-on-surface transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:border-secondary hover:shadow-[4px_4px_0px_0px_#4c5e85] disabled:pointer-events-none disabled:opacity-50"
            >
              Dispatch
            </button>
          </div>
        </form>

        {invites.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            <h3 className="font-label-mono text-label-mono text-on-surface-variant uppercase">Pending Transmissions</h3>
            {invites.map((inv, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-sm bg-surface-container-low p-4 border border-outline-variant">
                <span className="font-body-md text-body-md text-on-surface">{inv}</span>
                <span className="font-label-mono text-label-mono text-on-surface-variant">Sent just now</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant">
        <button 
          onClick={onNext}
          className="font-body-md text-body-md text-on-surface-variant transition-colors hover:text-primary"
        >
          Skip for now
        </button>
        <button 
          onClick={onNext}
          className="group flex items-center justify-center gap-3 rounded-sm border-2 border-outline-variant bg-surface-container-lowest px-6 py-3 font-body-lg text-body-lg font-medium text-on-surface transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:border-secondary hover:shadow-[6px_6px_0px_0px_#4c5e85]"
        >
          Continue
          <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 text-outline-variant group-hover:text-secondary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
