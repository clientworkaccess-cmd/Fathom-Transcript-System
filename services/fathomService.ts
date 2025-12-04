import {
  AIRTABLE_PERSONAL_ACCESS_TOKEN,
  AIRTABLE_BASE_ID,
  AIRTABLE_TABLE_NAME,
} from '../constants';
import type { AirtableResponse, AirtableRecord, MeetingInfo } from '../types';

/**
 * Fetches a list of meeting records from your Airtable base.
 */
async function fetchAirtableRecords(): Promise<AirtableRecord[]> {
  if (!AIRTABLE_PERSONAL_ACCESS_TOKEN.startsWith('pat')) {
      throw new Error("Invalid Airtable Personal Access Token format. It must start with 'pat'. Please check your constants.ts file.");
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
  
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`);
  
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Gracefully handle non-json error responses
        const errorMessage = errorData?.error?.message || `Airtable API request failed with status ${response.status}`;
        throw new Error(errorMessage);
    }
    const data: AirtableResponse = await response.json();
    return data.records || [];
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error(`Failed to fetch from Airtable. Please check your Airtable constants in constants.ts and your network connection.`);
    }
    throw error;
  }
}

/**
 * Fetches records from Airtable and maps them to the MeetingInfo interface.
 * Now gets Title directly from Airtable 'Title' column.
 */
export async function getProcessedMeetings(): Promise<MeetingInfo[]> {
  if (!AIRTABLE_PERSONAL_ACCESS_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    throw new Error("Please set your Airtable credentials (Token, Base ID, Table Name) in the constants.ts file.");
  }

  const airtableRecords = await fetchAirtableRecords();

  const processedMeetings = airtableRecords
    .filter(record => record.fields.Recording_id) // Only process records with a recording_id
    .map((record): MeetingInfo => {
        const recordingId = String(record.fields.Recording_id); // Ensure it is a string
        // Fetch Title directly from Airtable 'Title' field
        const title = record.fields.Title || 'Untitled Meeting';

        return {
            recordingId: recordingId,
            title: title,
            date: record.createdTime,
        };
    });

  return processedMeetings;
}
