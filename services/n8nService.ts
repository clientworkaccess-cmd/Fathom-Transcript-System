
import { N8N_AGENT_API_URL } from '../constants';

/**
 * Sends a message to the n8n agent webhook.
 *
 * @param message The user's message text.
 * @param recordingId The selected Fathom recording ID.
 * @returns A promise that resolves to the agent's response text.
 */
export async function sendMessageToAgent(message: string, recordingId: string): Promise<string> {
  if (!N8N_AGENT_API_URL || N8N_AGENT_API_URL.includes("YOUR_N8N_WEBHOOK_URL_HERE")) {
    return "Error: Please set your N8N_AGENT_API_URL in the constants.ts file.";
  }

  console.log('Sending to n8n webhook:', { message, recording_id: recordingId });

  try {
    // We use URLSearchParams to send data as 'application/x-www-form-urlencoded'.
    // Benefits:
    // 1. n8n AUTOMATICALLY parses these into separate body parameters (message, recording_id).
    // 2. It is a "Simple Request" in CORS terms, so it avoids the preflight (OPTIONS) error.
    const payload = new URLSearchParams();
    payload.append('message', message);
    payload.append('recording_id', recordingId);

    const response = await fetch(N8N_AGENT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    if (!response.ok) {
       const errorText = await response.text();
       throw new Error(`n8n webhook call failed with status ${response.status}: ${errorText}`);
    }
    
    // Parse the response
    const textResponse = await response.text();
    let data;
    try {
        data = JSON.parse(textResponse);
    } catch (e) {
        // If not JSON, return the raw text (often useful for simple text responses)
        return textResponse;
    }

    // Robustly find the reply in common n8n return formats
    let reply = "";

    // 1. Check for direct fields in the object
    if (data) {
        if (typeof data.reply === 'string') reply = data.reply;
        else if (typeof data.output === 'string') reply = data.output;
        else if (typeof data.text === 'string') reply = data.text;
        else if (typeof data.message === 'string') reply = data.message;
    }

    // 2. Check for n8n's array wrapper format: [ { "json": { ... } } ]
    if (!reply && Array.isArray(data) && data.length > 0) {
        const item = data[0];
        // Check inside "json" property
        if (item.json) {
             if (typeof item.json.reply === 'string') reply = item.json.reply;
             else if (typeof item.json.output === 'string') reply = item.json.output;
             else if (typeof item.json.text === 'string') reply = item.json.text;
             else if (typeof item.json.message === 'string') reply = item.json.message;
        } 
        // Check direct properties on the array item
        else {
             if (typeof item.reply === 'string') reply = item.reply;
             else if (typeof item.output === 'string') reply = item.output;
             else if (typeof item.text === 'string') reply = item.text;
             else if (typeof item.message === 'string') reply = item.message;
        }
    }
    
    if (reply) {
        return reply;
    } else {
        // If we have a JSON object but no clear message field, verify if it is empty
        if (Object.keys(data).length === 0) {
             return "Received empty response from agent.";
        }
        console.warn("Unexpected response format from n8n agent", data);
        return typeof data === 'object' ? JSON.stringify(data) : String(data);
    }
    
  } catch (error) {
    console.error('Error sending message to n8n agent:', error);
    if (error instanceof Error) {
        return `Error: ${error.message}`;
    }
    return 'An unknown error occurred while contacting the agent.';
  }
}
