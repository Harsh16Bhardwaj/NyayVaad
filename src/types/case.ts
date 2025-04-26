export interface CaseData {
  description: string | null;
  opponent: string | null;
  timeline: string | null;
  evidence: boolean | null;
  agreement: boolean | null;
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