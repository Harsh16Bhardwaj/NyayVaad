import { CaseStatus } from '@/generated/prisma';

export interface CaseData {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: CaseStatus;
  opponent: string | null;
  timeline: string[];
  evidence: boolean;
  agreement: boolean;
  finalAnalysis: string | null;
  createdAt: Date;
  updatedAt: Date;
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