const LANGFLOW_API_URL = process.env.LANGFLOW_API_URL || 'https://api.langflow.astra.datastax.com/lf/043396b0-e82a-4e0f-aca3-ad6828b04b34/api/v1/run/c9b26fed-99bd-4301-969f-3ff28a0a606e';
const LANGFLOW_TOKEN = process.env.LANGFLOW_TOKEN;

interface LangflowChatRequest {
  input_value: string;
  output_type: string;
  input_type: string;
  session_id: string;
}

const MAX_RETRIES = 3;
const INITIAL_TIMEOUT = 30000; // 30 seconds

export class LangflowAPI {
  static async chat(request: LangflowChatRequest): Promise<any> {
    if (!LANGFLOW_TOKEN) {
      console.error('[Langflow] Token not configured');
      throw new Error('Server configuration error');
    }

    console.log('[Langflow] Sending request:', {
      url: LANGFLOW_API_URL,
      input: request.input_value,
      sessionId: request.session_id
    });

    try {
      const response = await fetch(LANGFLOW_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LANGFLOW_TOKEN}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        console.error('[Langflow] API error:', {
          status: response.status,
          statusText: response.statusText,
          url: LANGFLOW_API_URL
        });
        throw new Error(`Langflow API call failed: ${response.statusText}`);
      }

      const data = await response.json();
      const result = data.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
      
      console.log('[Langflow] Received response:', {
        status: response.status,
        hasResult: !!result
      });

      return result;
    } catch (error) {
      console.error('[Langflow] Error:', error);
      throw error;
    }
  }
} 