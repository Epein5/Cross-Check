const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
}
if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
}

export const env = {
  apiBaseUrl,
  supabaseUrl,
} as const;
