import { LegalPage } from "@/components/layout/legal-page";

export default function Page() {
  return (
    <LegalPage
      title="Security"
      description="Cross Check is open-source software. Security depends on both the codebase and the way each deployment is configured, operated, and integrated."
      sections={[
        {
          title: "Deployment security",
          body: "Operators should configure secure environment variables, restrict network access, enforce HTTPS, rotate credentials, and avoid committing secrets or service-account keys to source control.",
        },
        {
          title: "Authentication and access",
          body: "Access to the application and connected data platforms should be limited to authorized users. Review OAuth settings, callback URLs, token storage, session lifetimes, and sign-out behavior before production use.",
        },
        {
          title: "Data platform credentials",
          body: "Use least-privilege credentials for Snowflake, BigQuery, Databricks, and any other connector. Prefer read-only access for validation workflows unless write access is explicitly required.",
        },
        {
          title: "Model and web context risk",
          body: "If multi-agent validation, model providers, or web lookup are enabled, review what data may be sent to external services. Disable web context for runs that must remain limited to internal evidence.",
        },
        {
          title: "Responsible disclosure",
          body: (
            <>
              If you find a vulnerability or project issue, report it at{" "}
              <a
                className="font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-secondary"
                href="https://github.com/Epein5/Cross-Check/issues"
                rel="noreferrer"
                target="_blank"
              >
                GitHub Issues
              </a>
              . For security-sensitive reports, keep public details minimal and
              avoid posting exploit steps, secrets, tokens, or private data.
            </>
          ),
        },
      ]}
    />
  );
}
