export type ApiError = {
  detail: string;
};

export type Organization = {
  id: string;
  name: string;
};

export type ConnectIntegrationResponse = {
  status: string;
  redirect_url: string | null;
  connection_id: string | null;
  platform: string;
};

export type VerifyConnectionResponse = {
  status: string;
  connected_account_id: string | null;
};

export type Integration = {
  id: string;
  organization_id: string;
  platform: string;
  enabled: boolean;
  connection_id: string | null;
  status: string | null;
  created_at: string | null;
};

export type Profile = {
  id: string;
  fullName: string;
  email: string;
};
