"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  connectIntegration,
  verifyIntegration,
} from "@/features/onboarding/api/onboarding";

type Platform = "bigquery" | "snowflake" | "databricks";

type PlatformState = {
  status: "idle" | "connecting" | "polling" | "connected" | "error";
  connectionId: string | null;
};

type CredentialForm = {
  platform: Platform;
  fields: { name: string; label: string; type: string; placeholder: string }[];
};

type Step4Props = {
  onNext: () => void;
  orgId: string | null;
};

const PLATFORMS: { key: Platform; name: string; label: string; color: string; description: string }[] = [
  {
    key: "snowflake",
    name: "Snowflake",
    label: "OAUTH 2.0",
    color: "#29B5E8",
    description: "Connect your Snowflake data cloud. Requires account identifier and active warehouse configuration.",
  },
  {
    key: "bigquery",
    name: "BigQuery",
    label: "OAUTH 2.0",
    color: "#4285F4",
    description: "Integrate Google Cloud BigQuery. Authorize access via GCP service account or direct user consent flow.",
  },
  {
    key: "databricks",
    name: "Databricks",
    label: "TOKEN",
    color: "#FF3621",
    description: "Link Databricks workspace. Provide workspace URL and personal access token.",
  },
];

const CREDENTIAL_FORMS: Record<string, CredentialForm> = {
  databricks: {
    platform: "databricks",
    fields: [
      { name: "workspace_url", label: "Workspace URL", type: "text", placeholder: "https://dbc-abc123.cloud.databricks.com" },
      { name: "token", label: "Access Token", type: "password", placeholder: "dapi••••••••" },
    ],
  },
};

export function Step4DataSources({ onNext, orgId }: Step4Props) {
  const [platforms, setPlatforms] = useState<Record<Platform, PlatformState>>({
    bigquery: { status: "idle", connectionId: null },
    snowflake: { status: "idle", connectionId: null },
    databricks: { status: "idle", connectionId: null },
  });

  const [modal, setModal] = useState<CredentialForm | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const popupRef = useRef<Window | null>(null);
  const pollTimers = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  const clearPoll = useCallback((platform: string) => {
    if (pollTimers.current[platform]) {
      clearInterval(pollTimers.current[platform]);
      delete pollTimers.current[platform];
    }
  }, []);

  const startPolling = useCallback(
    (platform: Platform, connectionId: string) => {
      if (!orgId) return;
      clearPoll(platform);

      pollTimers.current[platform] = setInterval(async () => {
        try {
          const result = await verifyIntegration(orgId, connectionId);
          if (result.status === "ACTIVE") {
            clearPoll(platform);
            setPlatforms((prev) => ({
              ...prev,
              [platform]: {
                status: "connected",
                connectionId: result.connected_account_id,
              },
            }));
            if (popupRef.current && !popupRef.current.closed) {
              popupRef.current.close();
            }
          }
        } catch {
          clearPoll(platform);
          setPlatforms((prev) => ({
            ...prev,
            [platform]: { status: "error", connectionId: null },
          }));
        }
      }, 2000);
    },
    [orgId, clearPoll]
  );

  const initiateOAuthFlow = useCallback(
    async (platform: Platform) => {
      if (!orgId) return;

      setPlatforms((prev) => ({
        ...prev,
        [platform]: { status: "connecting", connectionId: null },
      }));

      try {
        const result = await connectIntegration(orgId, platform);
        if (!result.redirect_url) {
          setPlatforms((prev) => ({
            ...prev,
            [platform]: { status: "error", connectionId: null },
          }));
          return;
        }

        setPlatforms((prev) => ({
          ...prev,
          [platform]: { status: "polling", connectionId: result.connection_id },
        }));

        popupRef.current = window.open(
          result.redirect_url,
          `connect-${platform}`,
          "width=600,height=700"
        );

        if (result.connection_id) {
          startPolling(platform, result.connection_id);
        }
      } catch {
        setPlatforms((prev) => ({
          ...prev,
          [platform]: { status: "error", connectionId: null },
        }));
      }
    },
    [orgId, startPolling]
  );

  const handleConnectClick = useCallback(
    (platform: Platform) => {
      if (platform === "databricks") {
        setFormValues({});
        setFormError(null);
        setModal(CREDENTIAL_FORMS.databricks);
      } else {
        initiateOAuthFlow(platform);
      }
    },
    [initiateOAuthFlow]
  );

  const handleCredentialSubmit = useCallback(async () => {
    if (!orgId || !modal) return;

    setFormError(null);
    const platform = modal.platform;

    setPlatforms((prev) => ({
      ...prev,
      [platform]: { status: "connecting", connectionId: null },
    }));

    try {
      const result = await connectIntegration(orgId, platform, formValues);

      if (result.status === "connected") {
        setPlatforms((prev) => ({
          ...prev,
          [platform]: {
            status: "connected",
            connectionId: result.connection_id,
          },
        }));
        setModal(null);
      } else {
        setPlatforms((prev) => ({
          ...prev,
          [platform]: { status: "error", connectionId: null },
        }));
        setFormError("Unexpected response from server");
      }
    } catch {
      setPlatforms((prev) => ({
        ...prev,
        [platform]: { status: "error", connectionId: null },
      }));
      setFormError("Failed to connect. Check your credentials.");
    }
  }, [orgId, modal, formValues]);

  useEffect(() => {
    return () => {
      Object.keys(pollTimers.current).forEach(clearPoll);
      if (popupRef.current && !popupRef.current.closed) {
        popupRef.current.close();
      }
    };
  }, [clearPoll]);

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-lg text-[32px] leading-tight tracking-tight text-on-surface">
          Connect Data Sources
        </h1>
        <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
          Link your primary data warehouses to establish the validation pipeline.
          Our agent requires read-only access to execute precision audits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {PLATFORMS.map((p) => {
          const state = platforms[p.key];
          const isConnected = state.status === "connected";
          const isLoading = state.status === "connecting" || state.status === "polling";

          return (
            <div
              key={p.key}
              className={`bg-surface border-2 rounded-sm p-5 flex flex-col h-full transition-colors duration-300 relative group overflow-hidden ${
                isConnected ? "border-secondary" : "border-outline-variant hover:border-primary"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-container-low opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="relative z-10 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center"
                    style={{ backgroundColor: `${p.color}10` }}
                  >
                    <span className="font-headline-lg text-[20px] font-bold" style={{ color: p.color }}>
                      {p.name[0]}
                    </span>
                  </div>
                  <span className="text-outline-variant font-label-mono text-[10px] px-2 py-1 border border-outline-variant rounded-sm">
                    {p.label}
                  </span>
                </div>
                <h3 className="font-headline-md text-lg text-on-surface mb-2">{p.name}</h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-4">{p.description}</p>
              </div>
              <div className="relative z-10 pt-4 border-t border-outline-variant">
                <button
                  onClick={() => handleConnectClick(p.key)}
                  disabled={isLoading || isConnected || !orgId}
                  className={`w-full py-2 rounded-sm font-body-md font-medium transition-all flex items-center justify-center gap-2 ${
                    isConnected
                      ? "bg-secondary/10 text-secondary border-2 border-secondary cursor-default"
                      : isLoading
                        ? "bg-surface-container-lowest text-on-surface-variant border-2 border-outline-variant cursor-wait"
                        : "bg-surface-container-lowest text-on-surface border-2 border-outline-variant hover:border-secondary hover:shadow-[4px_4px_0px_0px_#4c5e85] hover:-translate-x-[2px] hover:-translate-y-[2px]"
                  }`}
                >
                  {isConnected ? (
                    <>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Connected
                    </>
                  ) : isLoading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      {state.status === "connecting" ? "Initializing..." : "Waiting for auth..."}
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Connect
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}

        <div className="bg-surface-container-low border-2 border-dashed border-outline-variant rounded-sm p-5 flex flex-col items-center justify-center h-full hover:bg-surface-container transition-colors duration-300 cursor-pointer group min-h-[180px]">
          <div className="w-10 h-10 bg-surface border-2 border-outline-variant rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-on-surface-variant group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="font-headline-md text-base text-on-surface mb-1 text-center">Add Custom Source</h3>
          <p className="font-body-md text-sm text-on-surface-variant text-center">
            Configure connection via standard JDBC/ODBC.
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant">
        <button onClick={onNext} className="font-body-md text-body-md text-on-surface-variant transition-colors hover:text-primary">
          Skip for now
        </button>
        <button
          onClick={onNext}
          className="group flex items-center justify-center gap-3 rounded-sm border-2 border-outline-variant bg-surface-container-lowest px-6 py-3 font-body-lg text-body-lg font-medium text-on-surface transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:border-secondary hover:shadow-[6px_6px_0px_0px_#4c5e85]"
        >
          Complete Setup
          <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 text-outline-variant group-hover:text-secondary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface border-2 border-outline-variant rounded-sm p-8 w-full max-w-md mx-4 shadow-[8px_8px_0px_0px_#4c5e85]">
            <h2 className="font-headline-lg text-xl text-on-surface mb-2">Connect Databricks</h2>
            <p className="font-body-md text-sm text-on-surface-variant mb-6">
              Enter your Databricks workspace URL and access token.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              {modal.fields.map((field) => (
                <div key={field.name}>
                  <label className="font-label-mono text-xs text-on-surface-variant mb-1 block">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formValues[field.name] || ""}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                    className="w-full px-3 py-2 bg-surface-container-lowest border-2 border-outline-variant rounded-sm text-on-surface font-body-md focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              ))}
            </div>

            {formError && <p className="font-body-md text-sm text-error mb-4">{formError}</p>}

            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setModal(null)} className="px-4 py-2 font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                Cancel
              </button>
              <button onClick={handleCredentialSubmit} className="px-6 py-2 bg-primary text-on-primary rounded-sm font-body-md font-medium hover:opacity-90 transition-opacity">
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
