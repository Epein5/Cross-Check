import { LegalPage } from "@/components/layout/legal-page";

export default function Page() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Cross Check is distributed as open-source software under the MIT License. These terms summarize acceptable use and the limits of the project maintainers' responsibility."
      sections={[
        {
          title: "MIT License",
          body: "Cross Check is licensed under the MIT License. You may use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the software, subject to including the copyright and license notice.",
        },
        {
          title: "Software provided as-is",
          body: "The software is provided without warranty of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, and noninfringement.",
        },
        {
          title: "Your deployment, your responsibility",
          body: "If you deploy or operate Cross Check, you are responsible for authentication, access control, infrastructure, data protection, third-party integrations, model usage, and compliance with applicable laws.",
        },
        {
          title: "Validation results",
          body: "Reports, discrepancies, explanations, and agent output should be reviewed by qualified users before relying on them. Cross Check is a validation aid, not a substitute for professional judgment or operational review.",
        },
        {
          title: "Third-party services",
          body: "Use of external data platforms, OAuth providers, model providers, or web context tools may require separate accounts and terms. You are responsible for following those terms when enabling integrations.",
        },
      ]}
    />
  );
}
