
// --- REQUIRED AIRTABLE CONFIGURATION ---
// These values are now loaded from the .env file for security.
// Ensure your build environment supports process.env (e.g., via dotenv, Vite, or Webpack).

export const AIRTABLE_PERSONAL_ACCESS_TOKEN = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || "";
export const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || "";
export const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Summaries";

// --- REQUIRED N8N WEBHOOK CONFIGURATION ---
export const N8N_AGENT_API_URL = process.env.N8N_AGENT_API_URL || "";

// Validation check to help debugging
if (!AIRTABLE_PERSONAL_ACCESS_TOKEN || !AIRTABLE_BASE_ID || !N8N_AGENT_API_URL) {
  console.warn("Critical configuration missing. Please ensure your .env file is created and populated with AIRTABLE_PERSONAL_ACCESS_TOKEN, AIRTABLE_BASE_ID, and N8N_AGENT_API_URL.");
}
