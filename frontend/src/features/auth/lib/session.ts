export type AuthSession = {
  accessToken: string;
  refreshToken: string | null;
  expiresAt: number | null;
  expiresIn: number | null;
  tokenType: string | null;
  providerToken: string | null;
};

const AUTH_SESSION_KEY = "cross-check.auth-session";

export function parseAuthSessionFromHash(hash: string): AuthSession | null {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const accessToken = params.get("access_token");

  if (!accessToken) {
    return null;
  }

  return {
    accessToken,
    refreshToken: params.get("refresh_token"),
    expiresAt: parseNullableNumber(params.get("expires_at")),
    expiresIn: parseNullableNumber(params.get("expires_in")),
    tokenType: params.get("token_type"),
    providerToken: params.get("provider_token"),
  };
}

export function saveAuthSession(session: AuthSession) {
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function getAuthSession(): AuthSession | null {
  const storedSession = window.localStorage.getItem(AUTH_SESSION_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    return JSON.parse(storedSession) as AuthSession;
  } catch {
    window.localStorage.removeItem(AUTH_SESSION_KEY);
    return null;
  }
}

export function clearAuthSession() {
  window.localStorage.removeItem(AUTH_SESSION_KEY);
}

function parseNullableNumber(value: string | null) {
  if (!value) {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? null : parsedValue;
}
