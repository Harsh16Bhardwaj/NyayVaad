'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Scale, Sparkles, RefreshCw } from 'lucide-react';
import { ChatMessage } from '@/types/case';
import ProtectedPage from '@/components/ProtectedPage';

type CaseData = {
  description: string | null;
  opponent: string | null;
  timeline: string[] | null;
  evidence: boolean | null;
  agreement: boolean | null;
};

const initialCaseData: CaseData = {
  description: null,
  opponent: null,
  timeline: null,
  evidence: null,
  agreement: null,
};

const fieldOrder = ['description', 'opponent', 'timeline', 'evidence', 'agreement'];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('Hey I need help for my legal case.');
  const [isLoading, setIsLoading] = useState(false);
  const [caseData, setCaseData] = useState<CaseData>(initialCaseData);
  const [sessionId] = useState<string>(`user_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAnalysisEnabled, setIsAnalysisEnabled] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const allFieldsFilled = Object.values(caseData).every(
      (value) => value !== null && (Array.isArray(value) ? value.length > 0 : true)
    );
    setIsAnalysisEnabled(allFieldsFilled);
  }, [caseData]);

  const calculateProgress = () => {
    const filledFields = fieldOrder.filter((key) => {
      const value = caseData[key as keyof CaseData];
      return Array.isArray(value) ? value.length > 0 : value !== null;
    }).length;
    return (filledFields / fieldOrder.length) * 100;
  };

  const getNextField = () => {
    return fieldOrder.find((field) => {
      const value = caseData[field as keyof CaseData];
      return value === null || (Array.isArray(value) && value.length === 0);
    }) || null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          sessionId,
          nextField: getNextField(),
        }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      console.log('Frontend - Case data after chat request:', {
        caseData,
        updatedField: data.updatedField,
        updatedValue: data.updatedValue,
      });

      if (data.updatedField && data.updatedValue !== undefined) {
        setCaseData((prev) => ({
          ...prev,
          [data.updatedField]:
            data.updatedField === 'timeline'
              ? [data.updatedValue]
              : data.updatedField === 'evidence' || data.updatedField === 'agreement'
              ? data.updatedValue.toLowerCase() === 'true'
              : data.updatedValue,
        }));
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response || 'No response provided.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: 'Error processing request. Please try again.',
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuperAnalysis = async () => {
    if (!isAnalysisEnabled) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/chat/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseData, sessionId }),
      });

      if (!response.ok) throw new Error('Analysis request failed');

      const data = await response.json();
      console.log('Frontend - Case data after analysis request:', {
        caseData,
        analysisData: {
          caseSummary: data.caseSummary,
          lawsInvolved: data.lawsInvolved,
          todos: data.todos,
        },
      });

      // Case Summary
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: `**Case Summary**: ${data.caseSummary || 'No summary provided'}`,
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);

      // Relevant Laws
      if (data.lawsInvolved?.length) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 2).toString(),
            content: `
              <div class="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
                <h3 class="text-purple-400 font-semibold mb-2">📚 Relevant Laws</h3>
                <div class="space-y-2">
                  ${data.lawsInvolved
                    .map(
                      (law: any) => `
                    <div class="bg-white/5 p-3 rounded-lg">
                      <h4 class="text-white font-medium">${law.name}</h4>
                      <p class="text-gray-300 text-sm mt-1">${law.description}</p>
                    </div>
                  `
                    )
                    .join('')}
                </div>
              </div>
            `,
            sender: 'ai',
            timestamp: new Date(),
          },
        ]);
      }

      // Action Plan
      if (data.todos?.length) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 3).toString(),
            content: `
              <div class="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
                <h3 class="text-purple-400 font-semibold mb-2">📋 Action Plan</h3>
                <div class="space-y-2">
                  ${data.todos
                    .map(
                      (todo: any) => `
                    <div class="bg-white/5 p-3 rounded-lg">
                      <h4 class="text-white font-medium">${todo.title}</h4>
                      <p class="text-gray-300 text-sm mt-1">${todo.description}</p>
                    </div>
                  `
                    )
                    .join('')}
                </div>
              </div>
            `,
            sender: 'ai',
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: 'Error analyzing case. Please try again.',
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCaseData(initialCaseData);
    setMessages([]);
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-neutral-900 pt-10">
        <div className="mx-auto px-2">
          <h1 className="text-2xl font-bold text-white flex items-center justify-between">
            Chat
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Case</span>
            </motion.button>
          </h1>
          <div className="flex h-[calc(100vh-6rem)] bg-gradient-to-br from-gray-950 to-gray-950">
            <div className="w-80 bg-black/60 border-r border-white/10 p-4 overflow-y-auto">
              <div className="flex items-center space-x-3 mb-6">
                <Scale className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">Case Details</h2>
              </div>
              <div className="space-y-3">
                {Object.entries(caseData).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 rounded-xl p-3 border border-white/5"
                  >
                    <h3 className="text-xs text-purple-400 uppercase">{key.replace(/_/g, ' ')}</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {Array.isArray(value) ? value.join(', ') || 'Not provided' : value?.toString() || 'Not provided'}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="bg-black/60 border-b border-white/10 p-4">
                <div className="relative mb-2">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-purple-600"
                      animate={{ width: `${calculateProgress()}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Case Completion: {Math.round(calculateProgress())}%
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white">Legal Assistant</h1>
                    <p className="text-gray-400 text-xs mt-1">
                      {isAnalysisEnabled ? 'Case ready!' : 'Gathering case info'}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!isAnalysisEnabled}
                    className={`px-4 py-2 rounded-xl font-medium flex items-center space-x-2 ${
                      isAnalysisEnabled ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'
                    }`}
                    onClick={handleSuperAnalysis}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Super Analysis</span>
                  </motion.button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-xl p-3 ${
                          message.sender === 'user' ? 'bg-purple-600/80' : 'bg-white/10'
                        }`}
                      >
                        <div className="text-sm text-white" dangerouslySetInnerHTML={{ __html: message.content }} />
                        <p className="text-xs text-gray-300 mt-1">{format(message.timestamp, 'h:mm a')}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isLoading && (
                  <motion.div className="flex justify-start">
                    <div className="bg-white/10 rounded-xl p-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="bg-black/60 border-t border-white/10 p-4">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={`px-6 py-3 rounded-xl text-sm text-white font-medium ${
                      isLoading || !input.trim() ? 'bg-gray-600' : 'bg-purple-600'
                    }`}
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}