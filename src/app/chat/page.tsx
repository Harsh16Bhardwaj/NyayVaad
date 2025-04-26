'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Scale, Sparkles, RefreshCw } from 'lucide-react';
import { ChatMessage, CaseData } from '@/types/case';
import EditFieldModal from '@/components/EditFieldModal';
import ProtectedPage from '@/components/ProtectedPage';

const initialCaseData: CaseData = {
  description: null,
  opponent: null,
  timeline: null,
  evidence: null,
  agreement: null,
  output: false,
};

const fieldOrder = [
  'description',
  'opponent',
  'timeline',
  'evidence',
  'agreement',
  'output',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('Hey I need help for my legal case.');
  const [isLoading, setIsLoading] = useState(false);
  const [caseData, setCaseData] = useState<CaseData>(initialCaseData);
  const [sessionId] = useState<string>(`user_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [editingField, setEditingField] = useState<{ name: string; value: string | null } | null>(null);
  const [isAnalysisEnabled, setIsAnalysisEnabled] = useState(false);
  const [showDescriptionConfirm, setShowDescriptionConfirm] = useState(false);
  const [isStoringCase, setIsStoringCase] = useState(false);
  const [caseStored, setCaseStored] = useState(false);
  const [descriptionUpdated, setDescriptionUpdated] = useState(false);
  const [pendingAiResponse, setPendingAiResponse] = useState<string | null>(null);
  const [isFinalAnalysis, setIsFinalAnalysis] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const allFieldsFilled = Object.entries(caseData).every(([key, value]) => {
      if (key === 'output') return true;
      if (key === 'timeline') return Array.isArray(value) && value.length > 0;
      if (typeof value === 'boolean') return value === true || value === false;
      return value !== null && value !== '';
    });
    console.log('Frontend - Checking all fields filled:', {
      caseData,
      allFieldsFilled,
      unfilled: Object.entries(caseData).filter(([k, v]) => k !== 'output' && (v === null || v === '' || (Array.isArray(v) && v.length === 0))),
    });
    setIsAnalysisEnabled(allFieldsFilled);
  }, [caseData]);

  const calculateProgress = () => {
    const fields = fieldOrder.slice(0, -1);
    const filledFields = fields.filter((key) => {
      const value = caseData[key as keyof CaseData];
      if (key === 'timeline') return Array.isArray(value) && value.length > 0;
      if (typeof value === 'boolean') return value === true || value === false;
      return value !== null && value !== '';
    }).length;
    const progress = (filledFields / fields.length) * 100;
    console.log('Frontend - Calculating progress:', { filledFields, totalFields: fields.length, progress });
    return progress;
  };

  const getNextField = () => {
    if (isAnalysisEnabled) {
      console.log('Frontend - All fields filled, nextField is output');
      return 'output';
    }
    const nextField = fieldOrder.find((field) => {
      if (field === 'output') return false;
      const value = caseData[field as keyof CaseData];
      if (field === 'timeline') return !Array.isArray(value) || value.length === 0;
      if (typeof value === 'boolean') return value === false;
      return value === null || value === '';
    });
    console.log('Frontend - Finding next field:', {
      caseData,
      nextField: nextField || null,
      fieldStatuses: fieldOrder.map((f) => ({
        field: f,
        filled: f === 'timeline' ? Array.isArray(caseData[f]) && caseData[f].length > 0 : caseData[f as keyof CaseData] !== null && caseData[f as keyof CaseData] !== '',
      })),
    });
    return nextField || null;
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

    console.log('Frontend - Submitting user message:', { userMessage, caseData });

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const nextField = getNextField();

    try {
      const requestPayload = {
        message: input,
        sessionId,
        nextField,
        caseData: nextField === 'output' ? caseData : undefined,
      };

      console.log('Frontend - Sending API request:', requestPayload);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Frontend - API request failed:', { errorData, status: response.status });
        throw new Error(errorData.response || `HTTP error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Frontend - Received API response:', {
        response: data,
        updatedField: data.updatedField,
        updatedValue: data.updatedValue,
        nextField: data.nextField,
      });

      if (data.descriptionLocked) {
        console.log('Frontend - Description locked, setting descriptionUpdated');
        setDescriptionUpdated(true);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: 'The case description is locked and cannot be changed.',
            sender: 'ai',
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
        return;
      }

      if (nextField === 'output') {
        console.log('Frontend - Processing output response');
        setIsStoringCase(true);
        setCaseStored(true);
        setIsFinalAnalysis(true);
        setCaseData((prev) => {
          const newCaseData = { ...prev, output: true };
          console.log('Frontend - Updated caseData for output:', { old: prev, new: newCaseData });
          return newCaseData;
        });
      }

      const validFields = fieldOrder;
      if (data.updatedField && !validFields.includes(data.updatedField)) {
        console.error('Frontend - Invalid updatedField received:', { updatedField: data.updatedField, validFields });
        throw new Error('Invalid field received from backend');
      }

      if (data.updatedField && data.updatedValue !== undefined) {
        if (data.updatedField === 'description') {
          console.log('Frontend - Received description update, opening confirmation modal:', {
            value: data.updatedValue,
            response: data.response,
          });
          setEditingField({ name: 'description', value: data.updatedValue });
          setPendingAiResponse(data.response || 'Please confirm the case description.');
          setShowDescriptionConfirm(true);
          setIsLoading(false);
          return;
        }

        setCaseData((prev) => {
          const newCaseData = {
            ...prev,
            [data.updatedField]:
              data.updatedField === 'timeline'
                ? [data.updatedValue]
                : data.updatedField === 'evidence' || data.updatedField === 'agreement'
                ? data.updatedValue.toLowerCase() === 'true' || data.updatedValue.toLowerCase() === 'yes'
                  ? true
                  : false
                : data.updatedValue,
          };
          console.log('Frontend - Updated caseData:', {
            updatedField: data.updatedField,
            updatedValue: data.updatedValue,
            old: prev,
            new: newCaseData,
          });
          return newCaseData;
        });
      }

      let aiMessageContent: string;
      if (data.outputData) {
        const { case_summary = 'No summary provided', laws_involved = [], todos = [] } = data.outputData;
        aiMessageContent = `
          **Case Summary**: ${case_summary}
          **Relevant Laws**:
          ${laws_involved.length > 0
            ? laws_involved.map((law: any) => `- **${law.name}**: ${law.description}`).join('\n')
            : 'No laws identified.'}
          **Action Plan (TODOs)**:
          ${todos.length > 0
            ? todos.map((todo: any) => `- **${todo.title}**: ${todo.description}`).join('\n')
            : 'No action items provided.'}
        `;
      } else {
        aiMessageContent = data.response || 'No response provided.';
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiMessageContent,
        sender: 'ai',
        timestamp: new Date(),
      };

      console.log('Frontend - Adding AI message to chat:', { aiMessage });
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Frontend - Error in handleSubmit:', { error, stack: error instanceof Error ? error.stack : null });
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : 'Sorry, there was an error processing your request. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStoringCase(false);
    }
  };

  const handleEditField = (fieldName: string, currentValue: string | boolean | string[] | null) => {
    if (fieldName === 'description' && descriptionUpdated) {
      console.log('Frontend - Blocked edit attempt for locked description');
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: 'The case description is locked and cannot be changed.',
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
      return;
    }
    if (fieldName === 'output') return;
    const value = Array.isArray(currentValue) ? currentValue[0] || null : currentValue?.toString() || null;
    console.log('Frontend - Opening edit modal for field:', { fieldName, currentValue, modalValue: value });
    setEditingField({ name: fieldName, value });
  };

  const handleSaveField = (fieldName: string, newValue: string) => {
    console.log('Frontend - Saving field:', { fieldName, newValue });
    if (fieldName === 'description') {
      setShowDescriptionConfirm(true);
    } else {
      setCaseData((prev) => {
        const newCaseData = {
          ...prev,
          [fieldName]:
            fieldName === 'timeline'
              ? [newValue]
              : fieldName === 'evidence' || fieldName === 'agreement'
              ? newValue.toLowerCase() === 'true' || newValue.toLowerCase() === 'yes'
                ? true
                : false
              : newValue,
        };
        console.log('Frontend - Updated caseData after save:', { old: prev, new: newCaseData });
        return newCaseData;
      });
    }
  };

  const handleConfirmDescription = (confirmed: boolean) => {
    console.log('Frontend - Confirming description:', { confirmed, editingField });
    if (confirmed && editingField?.value) {
      setCaseData((prev) => {
        const newCaseData = { ...prev, description: editingField.value };
        console.log('Frontend - Confirmed description, updated caseData:', { old: prev, new: newCaseData });
        return newCaseData;
      });
      setDescriptionUpdated(true);
    }

    if (pendingAiResponse) {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: pendingAiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      console.log('Frontend - Adding pending AI response to chat:', { aiMessage });
      setMessages((prev) => [...prev, aiMessage]);
      setPendingAiResponse(null);
    }

    setEditingField(null);
    setShowDescriptionConfirm(false);
  };

  const handleReset = () => {
    console.log('Frontend - Resetting case data and state');
    setCaseData(initialCaseData);
    setMessages([]);
    setDescriptionUpdated(false);
    setCaseStored(false);
    setPendingAiResponse(null);
    setIsFinalAnalysis(false);
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-neutral-900 pt-10">
        <div className="mx-auto px-2 sm:px-2">
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
          <div className="flex h-[calc(100vh-6rem)] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            <div className="w-80 bg-black/60 backdrop-blur-lg border-r border-white/10 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">
              <div className="flex items-center space-x-3 mb-6">
                <Scale className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white font-[var(--font-playfair)]">Case Details</h2>
              </div>
              <div className="space-y-3">
                {Object.entries(caseData).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 hover:border-purple-500/20 transition-all duration-300 cursor-pointer"
                    onClick={() => handleEditField(key, value)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xs text-purple-400 font-[var(--font-space)] uppercase tracking-wider">
                        {key.replace(/_/g, ' ')}
                      </h3>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          (typeof value === 'boolean' && (value === true || value === false)) ||
                          (typeof value === 'string' && value) ||
                          (Array.isArray(value) && value.length > 0)
                            ? 'bg-green-500'
                            : 'bg-gray-500'
                        }`}
                      />
                    </div>
                    <p className="text-sm text-gray-300 mt-1 font-[var(--font-inter)] line-clamp-2">
                      {Array.isArray(value) ? value.join(', ') || 'Not provided yet' : value?.toString() || 'Not provided yet'}
                    </p>
                    <div className="mt-1 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity font-[var(--font-space)]">
                      Click to edit
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="bg-black/60 backdrop-blur-lg border-b border-white/10 p-4">
                <div className="relative mb-2">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-purple-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${calculateProgress()}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1 font-[var(--font-inter)]">
                    Case Completion: {Math.round(calculateProgress())}% (
                    {fieldOrder
                      .slice(0, -1)
                      .filter((key) => {
                        const value = caseData[key as keyof CaseData];
                        return key === 'timeline'
                          ? Array.isArray(value) && value.length > 0
                          : typeof value === 'boolean'
                          ? value === true || value === false
                          : value !== null && value !== '';
                      })
                      .join(', ')}
                    )
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white font-[var(--font-playfair)]">Legal Assistant</h1>
                    <p className="text-gray-400 text-xs mt-1 font-[var(--font-inter)]">
                      {isFinalAnalysis ? 'Your case is ready! Ask me anything.' : "Let's gather information about your case"}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!isAnalysisEnabled}
                    className={`px-4 py-2 rounded-xl font-medium flex items-center space-x-2 transition-all duration-300 ${
                      isAnalysisEnabled
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (isAnalysisEnabled) {
                        console.log('Frontend - Triggering Super Analysis');
                        handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                      }
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="font-[var(--font-space)] text-sm">Super Analysis</span>
                    {isAnalysisEnabled && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-yellow-400"
                      >
                        ✨
                      </motion.span>
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-xl p-3 ${
                          message.sender === 'user'
                            ? 'bg-purple-600/80 rounded-br-none'
                            : 'bg-white/10 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm text-white whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs text-gray-300 mt-1">{format(message.timestamp, 'h:mm a')}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isLoading && (
                  <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                    className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={`px-6 py-3 rounded-xl text-sm text-white font-medium ${
                      isLoading || !input.trim()
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>

            <EditFieldModal
              isOpen={!!editingField}
              onClose={() => {
                console.log('Frontend - Closing edit modal');
                setEditingField(null);
              }}
              fieldName={editingField?.name || ''}
              currentValue={editingField?.value || null}
              onSave={(value) => {
                if (editingField) {
                  handleSaveField(editingField.name, value);
                }
              }}
              disabled={editingField?.name === 'description' && descriptionUpdated}
            />

            <AnimatePresence>
              {showDescriptionConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gray-900 rounded-xl p-4 w-full max-w-md border border-purple-500/20"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-white">Confirm Case Description</h3>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-300 mb-3">
                        This will lock the case description.{' '}
                        <span className="text-red-400 font-bold">It cannot be changed later.</span> Are you sure?
                      </p>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <p className="text-sm text-white whitespace-pre-wrap">{editingField?.value}</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleConfirmDescription(false)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white transition-colors font-[var(--font-space)]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleConfirmDescription(true)}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-[var(--font-space)]"
                      >
                        Confirm & Update
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {isStoringCase && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-4 right-4 bg-purple-600 text-white px-3 py-1.5 rounded-lg shadow-lg text-sm"
              >
                Storing case data...
              </motion.div>
            )}

            {caseStored && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-4 right-4 bg-green-600 text-white px-3 py-1.5 rounded-lg shadow-lg text-sm"
              >
                Case stored successfully!
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}