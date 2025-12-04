
// --- REQUIRED AIRTABLE CONFIGURATION ---
// These values are loaded from the .env file.
// We check both import.meta.env (Vite) and process.env (Standard Node/CRA) to ensure compatibility.

// Helper to safely access env variables in different environments
const getEnv = (key: string): string => {
  // @ts-ignore - import.meta is a Vite/ESM feature
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    // @ts-ignore
    return import.meta.env[key];
  }
  // @ts-ignore - import.meta.env with VITE_ prefix fallback
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[`VITE_${key}`]) {
    // @ts-ignore
    return import.meta.env[`VITE_${key}`];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] || "";
  }
  return "";
};

export const AIRTABLE_PERSONAL_ACCESS_TOKEN = getEnv("AIRTABLE_PERSONAL_ACCESS_TOKEN");
export const AIRTABLE_BASE_ID = getEnv("AIRTABLE_BASE_ID");
export const AIRTABLE_TABLE_NAME = getEnv("AIRTABLE_TABLE_NAME") || "Summaries";

// --- REQUIRED N8N WEBHOOK CONFIGURATION ---
export const N8N_AGENT_API_URL = getEnv("N8N_AGENT_API_URL");

// Validation check to help debugging
if (!AIRTABLE_PERSONAL_ACCESS_TOKEN || !AIRTABLE_BASE_ID || !N8N_AGENT_API_URL) {
  console.warn("Configuration missing. Please ensure your .env file is populated. If using Vite, ensure variables are prefixed with VITE_ if required by your setup, or accessed correctly.");
}
