export interface CaseData {
  description: string | null;
  opponent: string | null;
  timeline_location: string | null;
  evidence: string | null;
  agreements_pre_steps: string | null;
  impact_intent: string | null;
  output: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface APIResponse {
  response: string;
  next_field?: keyof CaseData;
  case_data?: Partial<CaseData>;
} 