'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Scale, Sparkles } from 'lucide-react';
import { ChatMessage, CaseData } from '@/types/case';
import EditFieldModal from '@/components/EditFieldModal';
import ProtectedPage from '@/components/ProtectedPage';

const initialCaseData: CaseData = {
  description: null,
  opponent: null,
  timeline_location: null,
  evidence: null,
  agreements_pre_steps: null,
  impact_intent: null,
  output: false, // Added output field
};

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

  // useEffect(() => {
  //   const triggerPipeline = async () => {
  //     if (caseData.description) {
  //       try {
  //         console.log('Frontend - Triggering pipeline with description:', caseData.description);
  //         const response = await fetch('/api/fetch-docs', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ description: caseData.description }),
  //         });

  //         if (!response.ok) {
  //           throw new Error('Pipeline request failed');
  //         }
  //       } catch (error) {
  //         console.error('Frontend - Error in pipeline call:', error);
  //       }
  //     }
  //   };

  //   triggerPipeline();
  // }, [caseData.description]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const allFieldsFilled = Object.entries(caseData).every(([key, value]) => key === 'output' || value !== null);
    setIsAnalysisEnabled(allFieldsFilled);
  }, [caseData]);

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

    const nextField = Object.entries(caseData).find(
      ([key, value]) => key !== 'output' && value === null
    )?.[0] || (isAnalysisEnabled ? 'output' : null);
    console.log('Frontend - Next field to ask:', nextField);

    try {
      const requestPayload = {
        message: input,
        sessionId,
        nextField,
        caseData: nextField === 'output' ? caseData : undefined,
      };
      console.log('Frontend - Sending request:', requestPayload);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      const data = await response.json();
      console.log('Frontend - Received response:', data);

      if (nextField === 'output') {
        setIsStoringCase(true);
        setCaseStored(true);
      }

      // Update case data if we received an updated field
      if (data.updatedField && data.updatedValue !== undefined) {
        console.log('Frontend - Updating case data field:', data.updatedField, data.updatedValue);
        
        // If the updated field is description, show the confirmation modal
        if (data.updatedField === 'description') {
          setEditingField({
            name: 'description',
            value: data.updatedValue
          });
          setShowDescriptionConfirm(true);
          return; // Don't update the case data yet
        }

        setCaseData((prev) => ({
          ...prev,
          [data.updatedField]: data.updatedValue,
        }));
      }

      let aiMessageContent: string;
      if (data.outputData) {
        const { case_summary, laws_involved, todos } = data.outputData;
        aiMessageContent = `
          **Case Summary**: ${case_summary}

          **Relevant Laws**:
          ${laws_involved.map((law: any) => `- **${law.name}**: ${law.description}`).join('\n')}

          **Action Plan (TODOs)**:
          ${todos.map((todo: any) => `- **${todo.title}**: ${todo.description}`).join('\n')}
        `;
      } else {
        aiMessageContent = data.response;
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiMessageContent,
        sender: 'ai',
        timestamp: new Date(),
      };

      console.log('Frontend - Creating AI message:', aiMessage);
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Frontend - Error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error processing your request. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStoringCase(false);
    }
  };

  const handleEditField = (fieldName: string, currentValue: string | null) => {
    // If description is already updated, don't allow editing
    if (fieldName === 'description' && descriptionUpdated) {
      return;
    }
    setEditingField({ name: fieldName, value: currentValue });
  };

  const handleSaveField = (fieldName: string, newValue: string) => {
    if (fieldName === 'description') {
      setShowDescriptionConfirm(true);
    } else {
      setCaseData((prev) => ({
        ...prev,
        [fieldName]: newValue,
      }));
    }
  };

  const handleConfirmDescription = (confirmed: boolean) => {
    if (confirmed && editingField?.value) {
      setCaseData((prev) => ({
        ...prev,
        description: editingField.value,
      }));
      setDescriptionUpdated(true);
    }
    setEditingField(null);
    setShowDescriptionConfirm(false);
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-neutral-900 pt-10">
        <div className="mx-auto px-2 sm:px-2">
          <h1 className="text-2xl font-bold text-white">Chat</h1>
          <div className="flex h-[calc(100vh-6rem)] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Sidebar */}
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
                      <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-gray-500'}`} />
                    </div>
                    <p className="text-sm text-gray-300 mt-1 font-[var(--font-inter)] line-clamp-2">
                      {value || 'Not provided yet'}
                    </p>
                    <div className="mt-1 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity font-[var(--font-space)]">
                      Click to edit
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col">
              <div className="bg-black/60 backdrop-blur-lg border-b border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white font-[var(--font-playfair)]">Legal Assistant</h1>
                    <p className="text-gray-400 text-xs mt-1 font-[var(--font-inter)]">Let's gather information about your case</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!isAnalysisEnabled}
                    className={`px-4 py-2 rounded-xl font-medium flex items-center space-x-2 transition-all duration-300 ${
                      isAnalysisEnabled
                        ? 'button'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (isAnalysisEnabled) {
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
                    className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 border border-white/10"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-purple-600 hover:bg-purple-700 rounded-xl px-6 py-3 text-sm text-white font-medium"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>

            {/* Edit Modal */}
            <EditFieldModal
              isOpen={!!editingField}
              onClose={() => setEditingField(null)}
              fieldName={editingField?.name || ''}
              currentValue={editingField?.value || null}
              onSave={(value) => {
                if (editingField) {
                  handleSaveField(editingField.name, value);
                }
              }}
              disabled={editingField?.name === 'description' && descriptionUpdated}
            />

            {/* Description Confirmation Modal */}
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
                      <h3 className="text-lg font-semibold text-white">
                        Confirm Case Description
                      </h3>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-300 mb-3">
                        This will trigger the pipeline analysis. <span className="text-red-400 font-bold">This cannot be changed later.</span> Are you sure you want to update the case description?
                      </p>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <p className="text-sm text-white whitespace-pre-wrap">{editingField?.value}</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleConfirmDescription(false)}
                        className="px-3 py-1.5 cursor-pointer text-xs font-medium text-gray-300 hover:text-white transition-colors font-[var(--font-space)]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleConfirmDescription(true)}
                        className="px-3 py-1.5 cursor-pointer text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-[var(--font-space)]"
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