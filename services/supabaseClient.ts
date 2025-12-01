import { createClient } from "@supabase/supabase-js";

// Read Vite environment variables (VITE_ prefix required)
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "";
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

if (!isSupabaseConfigured) {
  // Helpful warning for local dev: makes it obvious why the app falls back to LocalStorage
  // eslint-disable-next-line no-console
  console.warn(
    "[supabaseClient] Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env"
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;
