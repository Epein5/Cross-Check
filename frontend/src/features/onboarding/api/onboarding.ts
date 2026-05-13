import { apiClient } from "@/lib/api-client";
import {
  ConnectIntegrationResponse,
  Integration,
  Organization,
  Profile,
  VerifyConnectionResponse,
} from "@/types/api";

export async function fetchOrganizations() {
  return apiClient<Organization[]>("/api/v1/organizations");
}

export async function updateProfile(data: { fullName: string; email?: string }) {
  return apiClient<Profile>("/api/v1/profile", {
    method: "PATCH",
    body: data,
  });
}

export async function createOrganization(data: { name: string }) {
  return apiClient<Organization>("/api/v1/organizations", {
    method: "POST",
    body: data,
  });
}

export async function inviteMember(orgId: string, email: string) {
  return apiClient<void>(`/api/v1/organizations/${orgId}/members`, {
    method: "POST",
    body: { email },
  });
}

export async function connectIntegration(
  orgId: string,
  platform: string,
  config?: Record<string, string>
) {
  return apiClient<ConnectIntegrationResponse>(
    `/api/v1/organizations/${orgId}/integrations/connect`,
    { method: "POST", body: { platform, config } }
  );
}

export async function verifyIntegration(
  orgId: string,
  connectionId: string
) {
  return apiClient<VerifyConnectionResponse>(
    `/api/v1/organizations/${orgId}/integrations/verify`,
    { method: "POST", body: { connection_id: connectionId } }
  );
}

export async function listIntegrations(orgId: string) {
  return apiClient<Integration[]>(
    `/api/v1/organizations/${orgId}/integrations`
  );
}
