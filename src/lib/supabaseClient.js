import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isConfigured) {
  // Doesn't throw — lets the site still render with a clear console warning
  // instead of a blank white screen if the .env file hasn't been set up yet.
  console.warn(
    "Supabase is not configured. Copy .env.example to .env and add your project URL + anon key."
  );
}

// createClient() throws if given an empty/invalid URL, which would crash the
// whole app on load — so fall back to a harmless placeholder URL until real
// credentials are added. Calls will simply fail gracefully instead.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

export { isConfigured };
