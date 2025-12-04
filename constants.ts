
// --- REQUIRED AIRTABLE CONFIGURATION ---
// IMPORTANT: For Vercel/Vite deployments, environment variables MUST start with VITE_
// to be exposed to the client-side browser.

// We use a helper to check import.meta.env (Vite) and process.env (Node fallback)
// We also explicitly check for the VITE_ prefixed version.

const getEnv = (key: string): string => {
  // 1. Check Vite standard (import.meta.env)
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // @ts-ignore
    if (import.meta.env[key]) return import.meta.env[key];
    // @ts-ignore
    if (import.meta.env[`VITE_${key}`]) return import.meta.env[`VITE_${key}`];
  }

  // 2. Check Node standard (process.env) - mostly for local tools or define plugin
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env) {
    // @ts-ignore
    if (process.env[key]) return process.env[key];
    // @ts-ignore
    if (process.env[`VITE_${key}`]) return process.env[`VITE_${key}`];
  }

  return "";
};

export const AIRTABLE_PERSONAL_ACCESS_TOKEN = getEnv("AIRTABLE_PERSONAL_ACCESS_TOKEN");
export const AIRTABLE_BASE_ID = getEnv("AIRTABLE_BASE_ID");
export const AIRTABLE_TABLE_NAME = getEnv("AIRTABLE_TABLE_NAME") || "Summaries";
export const N8N_AGENT_API_URL = getEnv("N8N_AGENT_API_URL");

// Validation check to help debugging in the browser console
if (!AIRTABLE_PERSONAL_ACCESS_TOKEN || !AIRTABLE_BASE_ID || !N8N_AGENT_API_URL) {
  console.warn(
    "⚠️ Configuration missing! If you are on Vercel/Vite, ensure your Environment Variables in the Vercel Dashboard start with 'VITE_'.\n" +
    "Example: VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN instead of AIRTABLE_PERSONAL_ACCESS_TOKEN"
  );
}
