import { HomePage } from "@/features/dashboard/components/home-page";
import { OnboardingGuard } from "@/features/onboarding/components/onboarding-guard";

export default function Page() {
  return (
    <OnboardingGuard>
      <HomePage />
    </OnboardingGuard>
  );
}
