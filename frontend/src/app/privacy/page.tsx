import { LegalPage } from "@/components/layout/legal-page";

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Cross Check is an open-source MIT-licensed project. This policy explains what the application is designed to handle and what operators should configure when they deploy it."
      sections={[
        {
          title: "Open-source software",
          body: "The source code is provided under the MIT License. Using, modifying, or self-hosting the software does not create a hosted service relationship with the project maintainers.",
        },
        {
          title: "Data you provide",
          body: "A deployment may process source-truth files, connected platform metadata, datasets selected for validation, authentication identifiers, and generated validation reports. Do not upload secrets or regulated data unless your own deployment is configured to handle it safely.",
        },
        {
          title: "Connected services",
          body: "If you connect platforms such as Snowflake, BigQuery, Databricks, Google OAuth, or web lookup providers, those integrations are governed by their own privacy terms and by the configuration chosen by the deployment operator.",
        },
        {
          title: "Self-hosted responsibility",
          body: "Operators are responsible for their own storage, logs, retention, access controls, model providers, analytics, and compliance obligations. Review environment variables and backend configuration before production use.",
        },
        {
          title: "No maintainer access by default",
          body: "The project maintainers do not receive your data merely because you use the open-source code. Data exposure depends on where and how you deploy the application and which third-party services you enable.",
        },
      ]}
    />
  );
}
