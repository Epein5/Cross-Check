"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Step1Welcome } from "./steps/step-1-welcome";
import { Step2Organization } from "./steps/step-2-organization";
import { Step3Team } from "./steps/step-3-team";
import { Step4DataSources } from "./steps/step-4-data-sources";
import { Step5Complete } from "./steps/step-5-complete";
import { BrandMark } from "@/components/ui/brand-mark";

function OnboardingHeader() {
  return (
    <header className="absolute top-0 z-50 w-full bg-transparent pointer-events-none">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-container-margin py-6 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="text-primary lg:text-surface-container-lowest">
            <BrandMark />
          </div>
          <span className="font-headline-md text-headline-md font-semibold text-inverse-surface mix-blend-difference lg:text-surface-container-lowest">
            Cross Check
          </span>
        </div>
      </div>
    </header>
  );
}

function OnboardingHero({ step }: { step: number }) {
  const explanations = [
    {
      title: "The AI-Powered Auditor",
      description: "Cross Check automatically reviews and verifies business documents like invoices, expense reports, and compliance files, saving your team from manual checking work.",
      log: "> Verifying identity payload... OK\n> Initializing secure session..."
    },
    {
      title: "Define Trusted References",
      description: "The system needs a workspace to store your internal policies, approved budgets, and historical records. We will compare your company's reports against these to identify errors and suspicious patterns.",
      log: "> Generating workspace isolate...\n> Linking compliance policies..."
    },
    {
      title: "Collaborative Compliance",
      description: "Cross Check acts as a second intelligent auditor that works continuously. Invite your finance and compliance teams to review the structured discrepancy reports.",
      log: "> Provisioning user roles...\n> Establishing audit trails..."
    },
    {
      title: "Contextual Understanding",
      description: "Instead of just scanning documents, the platform understands business rules. Connect your data platforms so the agent can check whether numbers match and policies are followed logically.",
      log: "> Loading semantic rule engine...\n> Awaiting data connections..."
    }
  ];

  const currentInfo = explanations[step - 1] || explanations[0];

  return (
    <section className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-inverse-surface px-16 py-12 lg:flex xl:px-24">
      {/* Parallax Background Text */}
      <motion.div 
        className="pointer-events-none absolute -left-10 top-0 flex select-none flex-col gap-8 opacity-[0.03]"
        animate={{ y: -(step * 15) }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="whitespace-nowrap font-headline-lg text-[140px] leading-[0.8] tracking-tighter text-surface-container-lowest">
          AUDIT
        </h2>
        <h2 className="ml-32 whitespace-nowrap font-headline-lg text-[140px] leading-[0.8] tracking-tighter text-surface-container-lowest">
          VERIFY
        </h2>
        <h2 className="ml-64 whitespace-nowrap font-headline-lg text-[140px] leading-[0.8] tracking-tighter text-surface-container-lowest">
          COMPLY
        </h2>
      </motion.div>

      <div className="relative z-10 text-inverse-on-surface w-full max-w-md mt-16">
        <div className="mb-12 min-h-[220px]">
          <p className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary mb-4">
            Agentic Framework
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-headline-lg text-[40px] leading-tight text-surface-container-lowest mb-6">
                {currentInfo.title}
              </h1>
              <p className="font-body-lg text-body-lg text-outline-variant">
                {currentInfo.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4].map((s) => {
             const isActive = s === step;
             const isPast = s < step;
             return (
               <div key={s} className={`flex items-center gap-4 transition-opacity duration-300 ${isActive ? "opacity-100" : isPast ? "opacity-50" : "opacity-30"}`}>
                 <div className={`relative flex h-10 w-10 items-center justify-center rounded-sm border-2 ${isActive ? "border-primary bg-primary text-on-primary" : isPast ? "border-secondary bg-secondary text-on-secondary" : "border-outline-variant text-outline-variant"} font-label-mono text-sm`}>
                   {isPast ? "✓" : `0${s}`}
                   {isActive && (
                     <motion.div 
                       layoutId="active-step-border" 
                       className="absolute -inset-[6px] rounded-sm border border-primary opacity-50"
                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
                     />
                   )}
                 </div>
                 <span className={`font-label-mono text-label-mono uppercase tracking-wider ${isActive ? "text-surface-container-lowest" : "text-outline-variant"}`}>
                   {s === 1 && "Welcome"}
                   {s === 2 && "Organization"}
                   {s === 3 && "Team Invitation"}
                   {s === 4 && "Data Sources"}
                 </span>
               </div>
             )
          })}
        </div>
      </div>

      {/* Terminal Log */}
      <div className="relative z-10 mt-auto pt-12">
        <div className="rounded-sm border-2 border-outline/30 bg-surface-container-lowest/5 p-4 font-label-mono text-[11px] leading-5 text-secondary shadow-sm backdrop-blur-md">
          <div className="mb-2 flex items-center gap-2 border-b border-outline/30 pb-2">
            <span className="h-2 w-2 rounded-full bg-error opacity-50" />
            <span className="h-2 w-2 rounded-full bg-[#f59e0b] opacity-50" />
            <span className="h-2 w-2 rounded-full bg-[#10b981] opacity-50" />
            <span className="ml-2 text-outline-variant uppercase tracking-widest">Protocol Monitor</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="whitespace-pre-line text-outline-variant"
            >
              {currentInfo.log}
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-3 ml-1 bg-secondary align-middle"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [orgId, setOrgId] = useState<string | null>(null);

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const setOrganization = (id: string) => setOrgId(id);

  if (step === 5) {
    return <Step5Complete />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-on-surface antialiased selection:bg-primary selection:text-on-primary">
      <OnboardingHeader />
      
      <main className="relative flex flex-grow w-full overflow-hidden">
        <OnboardingHero step={step} />

        <section className="relative flex w-full flex-col justify-center bg-background px-8 sm:px-16 lg:w-[55%] lg:px-24 py-24">
          <div className="login-dot-texture pointer-events-none absolute inset-0 z-0" />
          
          <div className="relative z-10 w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-xl xl:max-w-2xl">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <span className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary">
                Workspace Setup
              </span>
              <span className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-outline-variant">
                Step {step} of 4
              </span>
            </div>

            <div className="relative overflow-hidden rounded-sm border-2 border-outline-variant bg-surface-container-lowest p-8 shadow-[8px_8px_0px_0px_#4c5e85] sm:p-12 min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full flex-grow flex flex-col"
                >
                  {step === 1 && <Step1Welcome onNext={nextStep} />}
                  {step === 2 && <Step2Organization onNext={nextStep} setOrgId={setOrganization} />}
                  {step === 3 && <Step3Team onNext={nextStep} orgId={orgId} />}
                  {step === 4 && <Step4DataSources onNext={nextStep} orgId={orgId} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
