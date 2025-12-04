
// Represents the structure of a single record from the Airtable API
export interface AirtableRecord {
  id: string;
  createdTime: string;
  fields: {
    Recording_id?: string | number; // Can be string or number coming from API
    Title?: string; // Changed from Client to Title
    [key: string]: any; // Allow other fields
  };
}

// Represents the top-level response from the Airtable API list records endpoint
export interface AirtableResponse {
  records: AirtableRecord[];
}

export interface MeetingInfo {
  recordingId: string;
  title: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
}
