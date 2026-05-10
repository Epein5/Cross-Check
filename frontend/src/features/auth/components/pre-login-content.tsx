const dataNodes = [
  {
    label: "Node 01",
    title: "Snowflake",
    action: "Initialize Connection",
    description:
      "Establish a secure, high-throughput connection to your Snowflake warehouse for structural integrity checks.",
    icon: "SF",
  },
  {
    label: "Node 02",
    title: "BigQuery",
    action: "Configure Auth",
    description:
      "Link Google Cloud projects with service-account backed schema extraction and validation.",
    icon: "BQ",
  },
  {
    label: "Node 03",
    title: "Databricks",
    action: "Generate Token Link",
    description:
      "Connect Unity Catalog and workspace clusters to inspect schema drift before it breaks downstream checks.",
    icon: "DB",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Load Source Truth",
    description:
      "Upload trusted files manually or connect Snowflake, BigQuery, and Databricks as source-of-truth systems.",
  },
  {
    step: "02",
    title: "Watch The Agent Ingest",
    description:
      "The agent reads schemas, definitions, metadata, relationships, and evidence boundaries before validation starts.",
  },
  {
    step: "03",
    title: "Submit Data To Validate",
    description:
      "Upload files for review or select validation datasets directly from connected data platforms.",
  },
  {
    step: "04",
    title: "Toggle Web Context",
    description:
      "Decide whether the run should use live web evidence or stay limited to internal trusted sources.",
  },
  {
    step: "05",
    title: "Run Multi-Agent Review",
    description:
      "Specialized agents compare claims, records, schemas, lineage, and context to find mismatches and causes.",
  },
  {
    step: "06",
    title: "Export The Report",
    description:
      "Download a report with discrepancies, supporting evidence, explanations, and recommended remediation paths.",
  },
];

function ArchitecturalBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute bottom-[-8%] right-[-5%] font-headline-lg text-[18vw] font-semibold leading-none tracking-[-0.08em] text-surface-container-highest/50">
        PROTOCOL
      </div>
      <div className="absolute left-[15%] top-0 h-full w-px bg-outline-variant/60" />
      <div className="absolute right-[25%] top-0 h-full w-px bg-outline-variant/50" />
      <div className="absolute left-0 top-[35%] h-px w-full bg-outline-variant/50" />
    </div>
  );
}

function SectionIntro() {
  return (
    <div className="relative z-10 max-w-3xl border-l-2 border-primary-container pl-6">
      <p className="mb-5 font-label-mono text-label-mono uppercase tracking-[0.18em] text-secondary">
        Autonomous Reliability
      </p>
      <h2 className="font-headline-lg text-[44px] leading-tight tracking-tight text-on-surface sm:text-[64px]">
        Every claim. Every source. <span className="text-primary">Verified.</span>
      </h2>
      <p className="mt-6 max-w-2xl font-body-lg text-body-lg text-on-surface-variant sm:text-lg">
        Cross Check validates statements against trusted records and live systems,
        then explains exactly what is wrong and why.
      </p>
    </div>
  );
}

function AgenticAdvantageSection() {
  return (
    <section className="relative z-10 border-y border-outline-variant bg-surface-container-low px-container-margin py-20">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="mb-4 font-label-mono text-label-mono uppercase tracking-[0.18em] text-secondary">
            The Agentic Advantage
          </p>
          <h3 className="font-headline-lg text-[36px] leading-tight tracking-tight text-on-surface">
            Schema context before validation noise.
          </h3>
          <p className="mt-6 font-body-lg text-body-lg text-on-surface-variant">
            The ingestion flow maps source structures, claim context, and trust
            definitions before checks run, so validation failures include the
            reason behind the discrepancy.
          </p>
          <div className="mt-8 grid gap-4 font-label-mono text-label-mono uppercase tracking-[0.14em] text-secondary">
            <span className="border-l-2 border-primary pl-4">Continuous Schema Monitoring</span>
            <span className="border-l-2 border-primary pl-4">Semantic Anomaly Detection</span>
            <span className="border-l-2 border-primary pl-4">Automated Remediation Paths</span>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="relative rounded-sm border-2 border-outline-variant bg-inverse-surface p-6 font-mono text-sm leading-6 text-inverse-primary shadow-[8px_8px_0px_0px_#4c5e85]">
            <span className="absolute -top-3 left-6 bg-surface-container-low px-2 font-label-mono text-[10px] uppercase tracking-[0.18em] text-on-surface">
              Terminal
            </span>
            <p className="text-outline-variant">&gt; Initializing validation sequence...</p>
            <p>&gt; Connecting sources: [Snowflake, BigQuery, Databricks]</p>
            <p>&gt; Extracting schemas... SUCCESS</p>
            <p>&gt; Building semantic graph... SUCCESS</p>
            <div className="mt-4 border-l border-outline pl-4 text-inverse-on-surface/80">
              <p>
                WARN: Structural mismatch detected in <span className="text-inverse-primary">user_events</span>.
              </p>
              <p>Expected: JSON payload. Found: STRING.</p>
              <p>Root cause: upstream schema migration in BigQuery PR-892.</p>
            </div>
            <p className="mt-4 text-inverse-primary">_</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className="relative z-10 px-container-margin pb-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 max-w-3xl border-l-2 border-primary-container pl-6">
          <p className="mb-4 font-label-mono text-label-mono uppercase tracking-[0.18em] text-secondary">
            How Cross Check Works
          </p>
          <h2 className="font-headline-lg text-[40px] leading-tight tracking-tight text-on-surface">
            From source truth to exportable validation report.
          </h2>
          <p className="mt-5 font-body-lg text-body-lg text-on-surface-variant">
            Start with trusted truth, submit the data you want checked, choose
            whether web context is allowed, then let the agents produce a clear
            discrepancy report.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {workflowSteps.map((item) => (
            <article
              key={item.step}
              className="group relative min-h-56 border-2 border-outline-variant bg-surface-container-lowest/90 p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:border-secondary hover:shadow-[6px_6px_0px_0px_#4c5e85]"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-secondary">
                  Step {item.step}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-container font-label-mono text-label-mono text-primary">
                  {item.step}
                </span>
              </div>
              <h3 className="font-headline-lg text-[28px] leading-tight text-on-surface">
                {item.title}
              </h3>
              <p className="mt-4 font-body-md text-body-md text-on-surface-variant">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataNodeCard({
  action,
  description,
  icon,
  label,
  title,
}: (typeof dataNodes)[number]) {
  return (
    <article className="group relative border-l-2 border-outline bg-surface-container-lowest/90 p-8 shadow-sm transition-all hover:border-primary hover:shadow-[6px_6px_0px_0px_#4c5e85]">
      <span className="absolute -left-[5px] top-8 h-2 w-2 rounded-full bg-primary transition-transform group-hover:scale-150" />
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <p className="mb-2 font-label-mono text-label-mono uppercase tracking-[0.14em] text-secondary">
            {label}
          </p>
          <h3 className="font-headline-lg text-[32px] leading-tight text-on-surface">
            {title}
          </h3>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-secondary text-sm font-semibold text-on-secondary">
          {icon}
        </span>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant">{description}</p>
      <p className="mt-8 inline-flex border-b-2 border-primary pb-1 font-label-mono text-label-mono uppercase tracking-[0.14em] text-on-surface">
        {action}
      </p>
    </article>
  );
}

function ConnectionNodesSection() {
  return (
    <section className="relative z-10 px-container-margin py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 max-w-2xl border-l-2 border-primary-container pl-6">
          <p className="mb-4 font-label-mono text-label-mono uppercase tracking-[0.18em] text-secondary">
            Connect Data Sources
          </p>
          <h2 className="font-headline-lg text-[40px] leading-tight tracking-tight text-on-surface">
            Bring source systems into the validation protocol.
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {dataNodes.map((node) => (
            <DataNodeCard key={node.title} {...node} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TransparencySection() {
  return (
    <section className="relative z-10 border-t border-outline-variant px-container-margin py-24">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:items-center">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="relative bg-surface-container-high p-6">
            <div className="border-2 border-error-container bg-surface p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-label-mono text-label-mono uppercase tracking-[0.14em] text-error">
                  Discrepancy Detected
                </span>
                <span className="text-error">!</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                Row count variance in <code className="bg-surface-variant px-1">transactions_daily</code>
              </p>
              <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                Expected: 145,230 | Actual: 142,100
              </p>
            </div>
            <div className="mt-6 translate-x-3 border-2 border-primary-container bg-surface p-6 shadow-sm">
              <p className="mb-3 font-label-mono text-label-mono uppercase tracking-[0.14em] text-primary">
                Agent Counterfactual
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Missing rows correlate with NULL values in <code className="bg-surface-variant px-1">region_id</code> introduced during the upstream deployment.
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <p className="mb-4 font-label-mono text-label-mono uppercase tracking-[0.18em] text-secondary">
            The What And The Why
          </p>
          <h2 className="font-headline-lg text-[40px] leading-tight tracking-tight text-on-surface">
            Discrepancy transparency for every failed check.
          </h2>
          <p className="mt-6 font-body-lg text-body-lg text-on-surface-variant">
            Detecting an error is only half the job. Cross Check synthesizes
            lineage, recent changes, and statistical baselines so teams can fix
            the actual cause instead of guessing from a failed assertion.
          </p>
        </div>
      </div>
    </section>
  );
}

export function PreLoginContent() {
  return (
    <div id="learn-more" className="relative overflow-hidden bg-background text-on-surface">
      <ArchitecturalBackground />
      <section className="relative z-10 mx-auto max-w-[1440px] px-container-margin py-24">
        <SectionIntro />
      </section>
      <WorkflowSection />
      <AgenticAdvantageSection />
      <ConnectionNodesSection />
      <TransparencySection />
    </div>
  );
}
