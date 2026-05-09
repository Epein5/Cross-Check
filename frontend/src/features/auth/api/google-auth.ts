import { env } from "@/lib/env";

export function getGoogleAuthStartUrl() {
  return `${env.apiBaseUrl}/api/v1/auth/google`;
}
