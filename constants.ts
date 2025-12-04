
// --- REQUIRED AIRTABLE CONFIGURATION ---
// IMPORTANT: For Vercel/Vite deployments, environment variables MUST start with VITE_
// to be exposed to the client-side browser.

// We check multiple patterns to ensure compatibility across different setups.

export const AIRTABLE_PERSONAL_ACCESS_TOKEN = 
  // @ts-ignore
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN) ||
  // @ts-ignore
  (typeof process !== 'undefined' && process.env && process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN) ||
  "";

export const AIRTABLE_BASE_ID = 
  // @ts-ignore
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_AIRTABLE_BASE_ID) ||
  // @ts-ignore
  (typeof process !== 'undefined' && process.env && process.env.AIRTABLE_BASE_ID) ||
  "";

export const AIRTABLE_TABLE_NAME = 
  // @ts-ignore
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_AIRTABLE_TABLE_NAME) ||
  // @ts-ignore
  (typeof process !== 'undefined' && process.env && process.env.AIRTABLE_TABLE_NAME) ||
  "Summaries";

// --- REQUIRED N8N WEBHOOK CONFIGURATION ---
export const N8N_AGENT_API_URL = 
  // @ts-ignore
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_N8N_AGENT_API_URL) ||
  // @ts-ignore
  (typeof process !== 'undefined' && process.env && process.env.N8N_AGENT_API_URL) ||
  "";

// Validation check to help debugging in the browser console
if (!AIRTABLE_PERSONAL_ACCESS_TOKEN || !AIRTABLE_BASE_ID || !N8N_AGENT_API_URL) {
  console.error(
    "Configuration missing! If you are on Vercel/Vite, ensure your Environment Variables start with 'VITE_'.\n" +
    "Example: VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN instead of AIRTABLE_PERSONAL_ACCESS_TOKEN"
  );
}
