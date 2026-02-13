"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Scale,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  X,
  Download,
  Copy,
  RotateCcw,
  AlertCircle,
  MessageSquare,
  ArrowDown,
} from "lucide-react";
import { ChatMessage } from "@/types/case";
import ProtectedPage from "@/components/ProtectedPage";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "@/app/store/slices/todoSlice";
import { addChatSession, updateChatSession } from "@/app/store/slices/chatSessionsSlice";
import { addMessage, updateMessages, loadMessagesFromStorage } from "@/app/store/slices/chatMessagesSlice";
import { AppDispatch, RootState } from "@/app/store";
import jsPDF from "jspdf";
import toast, { Toaster } from "react-hot-toast";
import CaseContextForm from "@/components/CaseContextForm";

type CaseData = {
  description: string | null;
  opponent: string | null;
  timeline: string[] | null;
  evidence: boolean | null;
  agreement: boolean | null;
};

type ConclusionData = {
  caseFinalAnalysis: {
    userCaseSummary: string;
    lawsInvolved: string[];
    relevantCaseDetails: Array<{
      title: string;
      caseBrief: string;
      lawsAssessed: string[];
      courtReasoning: string[];
      conclusion: string;
    }>;
    learnings: string[];
    utilization: string[];
    actionPlan: Array<{
      step: string;
      priority: string;
      resource?: string;
    }>;
    primaryRecommendation: string;
    longTermStrategy: string[];
  };
  todos: Array<{
    title: string;
    description: string;
  }>;
};

const initialCaseData: CaseData = {
  description: null,
  opponent: null,
  timeline: null,
  evidence: null,
  agreement: null,
};

export default function ChatPage() {
  const params = useParams();
  const session = params.sessionId as string; 
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Get messages from Redux if available
  const messagesFromRedux = useSelector((state: RootState) => 
    state.chatMessages.messagesBySession[session]?.messages || []
  );
  
  const [messages, setMessages] = useState<ChatMessage[]>(messagesFromRedux);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [caseData, setCaseData] = useState<CaseData>({ ...initialCaseData });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAnalysisEnabled, setIsAnalysisEnabled] = useState(false);
  const [isConcluding, setIsConcluding] = useState(false);
  const [conclusionData, setConclusionData] = useState<ConclusionData | null>(
    null
  );
  const [isNewSession, setIsNewSession] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [failedMessageId, setFailedMessageId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messageIdCounter = useRef(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [hasShownFormReminder, setHasShownFormReminder] = useState(false);

  // Detect when user scrolls up to disable auto-scroll
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setAutoScroll(isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Load messages from Redux on mount
  useEffect(() => {
    if (messagesFromRedux.length > 0) {
      setMessages(messagesFromRedux);
      setIsNewSession(false);
    }
  }, [session]);

  // Show form reminder toast after first message exchange
  useEffect(() => {
    if (!hasShownFormReminder && messages.length >= 2 && messages.some(m => m.sender === 'ai')) {
      setTimeout(() => {
        toast(
          "💡 Fill out the case context form below for a more accurate analysis!",
          {
            duration: 6000,
            position: "bottom-left",
            style: {
              background: "#1f2937",
              color: "#fff",
              border: "1px solid rgba(168, 85, 247, 0.3)",
            },
            icon: "📋",
          }
        );
        setHasShownFormReminder(true);
      }, 2000);
    }
  }, [messages, hasShownFormReminder]);

  // Sync messages to Redux whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      dispatch(updateMessages({ sessionId: session, messages }));
    }
  }, [messages, session, dispatch]);

  // UseEffects
  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messages, autoScroll]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Escape to clear input
      if (e.key === 'Escape' && input) {
        setInput('');
      }
      // Ctrl/Cmd + K to focus input
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [input]);

  // Show toast reminder to fill case context form after 2 messages
  useEffect(() => {
    if (messages.length >= 4 && !hasShownFormReminder) {
      toast(
        "💡 Fill out the case context form below for a better experience!",
        {
          duration: 6000,
          position: "bottom-left",
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid rgba(168, 85, 247, 0.3)',
          },
          icon: '📋',
        }
      );
      setHasShownFormReminder(true);
    }
  }, [messages.length, hasShownFormReminder]);
  useEffect(() => {
    const allFieldsFilled = Object.values(caseData).every(
      (value) =>
        value !== null && (Array.isArray(value) ? value.length > 0 : true)
    );
    setIsAnalysisEnabled(allFieldsFilled);
  }, [caseData]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateMessageId = () => {
    messageIdCounter.current += 1;
    return `msg-${Date.now()}-${messageIdCounter.current}`;
  };

  const handleCopyMessage = async (content: string, messageId: string) => {
    try {
      // Strip HTML tags for plain text copy
      const plainText = content.replace(/<[^>]*>/g, '');
      await navigator.clipboard.writeText(plainText);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleRetryMessage = async (messageContent: string) => {
    setInput(messageContent);
    setFailedMessageId(null);
    inputRef.current?.focus();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    // Validation
    if (!trimmedInput || isLoading) return;
    if (trimmedInput.length > 4000) {
      alert('Message is too long. Please keep it under 4000 characters.');
      return;
    }

    // If this is the first message in a new session, add it to the store
    if (isNewSession && messages.length === 0) {
      const newSession = {
        sessionId: session,
        title: trimmedInput.slice(0, 50) + (trimmedInput.length > 50 ? '...' : ''),
        description: 'New legal consultation',
        createdAt: new Date().toISOString(),
      };
      dispatch(addChatSession(newSession));
      setIsNewSession(false);
    }

    const userMessage: ChatMessage = {
      id: generateMessageId(),
      content: trimmedInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setFailedMessageId(null);
    setIsLoading(true);
    setAutoScroll(true);

    try {
      console.log("sessionId", session);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedInput,
          sessionId: session,
        }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      
      // Update case data using state setter, not mutation
      setCaseData(prev => ({
        description: data.description || prev.description,
        opponent: data.opponent || prev.opponent,
        timeline: data.timeline || prev.timeline,
        evidence: data.evidence !== null ? data.evidence : prev.evidence,
        agreement: data.agreement !== null ? data.agreement : prev.agreement,
      }));
      
      const chatResponse = data.ai_next_response;
      console.log("Frontend - Case data after chat request:", {
        caseData,
        chatResponse,
      });

      const aiMessage: ChatMessage = {
        id: generateMessageId(),
        content:
          chatResponse ||
          "Sorry, there was an error processing your request. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Update session with meaningful title after first AI response
      if (messages.length === 1 && data.description) {
        dispatch(updateChatSession({
          sessionId: session,
          updates: {
            title: data.description.slice(0, 50) + (data.description.length > 50 ? '...' : ''),
            description: 'Legal case consultation',
          }
        }));
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: generateMessageId(),
        content: "I'm having trouble connecting right now. Please check your connection and try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setFailedMessageId(userMessage.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuperAnalysis = async () => {
    if (!isAnalysisEnabled) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseData, sessionId: session as string }),
      });

      if (!response.ok) throw new Error("Analysis request failed");

      const data = await response.json();
      console.log("Frontend - Case data after analysis request:", {
        caseData,
        analysisData: {
          caseSummary: data.caseSummary,
          lawsInvolved: data.lawsInvolved,
          todos: data.todos,
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          content: `**Case Summary**: ${
            data.caseSummary || "No summary provided"
          }`,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);

      if (data.laws_related?.length) {
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            content: `
              <div class="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
                <h3 class="text-purple-400 font-semibold mb-2">📚 Relevant Laws</h3>
                <div class="space-y-2">
                  ${data.laws_related
                    .map(
                      (law: any) => `
                    <div class="bg-white/5 p-3 rounded-lg">
                      <h4 class="text-white font-medium">${law.name}</h4>
                      <p class="text-gray-300 text-sm mt-1">${law.description}</p>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
            `,
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
      }

      if (data.todos?.length) {
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            content: `
              <div class="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
                <h3 class="text-purple-400 font-semibold mb-2">📋 Action Plan</h3>
                <div class="space-y-2">
                  ${data.todos
                    .map(
                      (todo: any) => `
                    <div class="bg-white/5 p-3 rounded-lg">
                      <h4 class="text-white font-medium">${todo.title}</h4>
                      <p className="text-gray-300 text-sm mt-1">${todo.description}</p>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
            `,
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          content: "Error analyzing case. Please try again.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (!confirm('Are you sure you want to reset this chat? This cannot be undone.')) {
      return;
    }
    setCaseData({ ...initialCaseData });
    setMessages([]);
    setConclusionData(null);
    setInput('');
    setFailedMessageId(null);
    setIsNewSession(true);
  };

  const handleConclude = async () => {
    if (!isAnalysisEnabled) return;
    setIsConcluding(true);
    try {
      const response = await fetch("/api/chat/conclude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseData, sessionId: session as string }),
      });

      if (!response.ok) throw new Error("Conclusion request failed");

      const data = await response.json();
      setConclusionData(data);
    } catch (error) {
      console.error("Error getting conclusion:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          content: "Error getting conclusion. Please try again.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsConcluding(false);
    }
  };

  const handleCloseModal = () => {
    setConclusionData(null);
  };

  const handleDownloadPDF = () => {
    if (!conclusionData) return;
    
    const doc = new jsPDF();
    let yPosition = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 7;
    
    const checkPageBreak = (neededSpace: number) => {
      if (yPosition + neededSpace > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
    };
    
    // Title
    doc.setFontSize(20);
    doc.text("Case Analysis Report", margin, yPosition);
    yPosition += 15;
    
    // Date
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 15;
    
    // Case Summary
    checkPageBreak(30);
    doc.setFontSize(16);
    doc.text("Case Summary", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    const summaryLines = doc.splitTextToSize(conclusionData.caseFinalAnalysis.userCaseSummary, 170);
    summaryLines.forEach((line: string) => {
      checkPageBreak(lineHeight);
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    yPosition += 10;
    
    // Laws Involved
    checkPageBreak(30);
    doc.setFontSize(16);
    doc.text("Laws Involved", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    conclusionData.caseFinalAnalysis.lawsInvolved.forEach((law) => {
      checkPageBreak(lineHeight * 2);
      const lawLines = doc.splitTextToSize(`• ${law}`, 170);
      lawLines.forEach((line: string) => {
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    });
    
    // Save the PDF
    doc.save(`legal-analysis-${Date.now()}.pdf`);
  };

  return (
    <ProtectedPage>
      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      />
      <div className="min-h-screen bg-neutral-900 pt-14 ">
        <div className="mx-auto ">
          <h1 className="text-2xl font-bold text-white flex items-center justify-between px-4 lg:px-0">
            <div className="flex items-center gap-3">
              <span>Chat</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Case</span>
            </motion.button>
          </h1>
          <div className="flex h-[calc(100vh-5rem)] rounded-xl bg-gradient-to-br from-gray-950 to-gray-950 relative">
            <div className="flex-1 flex flex-col w-full">
              <div className="bg-black/60 border-b border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      Legal Assistant
                    </h1>
                    <p className="text-gray-400 text-xs mt-1">
                      {isAnalysisEnabled
                        ? "Case ready!"
                        : "Gathering case info"}
                    </p>
                  </div>
                  <div className="flex justify-end space-x-4 mb-4">
                    <Button
                      variant="outline"
                      className="bg-transparent cursor-pointer border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 group"
                      onClick={handleSuperAnalysis}
                      disabled={isLoading}
                    >
                      <Sparkles className="w-4 h-4 mr-2 cursor-pointer group-hover:scale-110 transition-transform duration-300" />
                      {isLoading ? "Processing..." : "Start Processing"}
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent cursor-pointer border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300 transition-all duration-300 group"
                      onClick={handleConclude}
                      disabled={isConcluding}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2 group-hover:scale-110 cursor-pointer transition-transform duration-300" />
                      {isConcluding ? "Analyzing..." : "Super Analyze"}
                    </Button>
                  </div>
                </div>
              </div>

              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth relative">
                {/* Case Context Form - Always visible at top */}
                <div className="mb-6">
                  <CaseContextForm 
                    sessionId={session}
                    onSave={() => {
                      toast.success("Case context saved! This will improve analysis accuracy.", {
                        position: "bottom-left",
                        duration: 4000,
                      });
                    }}
                  />
                </div>

                {messages.length === 0 && !isLoading && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <MessageSquare className="w-16 h-16 text-purple-400/50 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Start Your Legal Consultation</h3>
                    <p className="text-gray-400 text-sm max-w-md mb-6">
                      Describe your legal situation and I'll help analyze your case, identify relevant laws, and provide guidance.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => setInput('I need help with a contract dispute')}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors"
                      >
                        Contract Dispute
                      </button>
                      <button
                        onClick={() => setInput('I have a property issue')}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors"
                      >
                        Property Issue
                      </button>
                      <button
                        onClick={() => setInput('I need legal advice on employment matters')}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors"
                      >
                        Employment Matter
                      </button>
                    </div>
                  </div>
                )}
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex group ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="flex items-start gap-2 max-w-[85%] md:max-w-[70%]">
                        {message.sender === "ai" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-teal-400 flex-shrink-0 flex items-center justify-center mt-1">
                            <Scale className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div
                            className={`rounded-xl p-3 ${
                              message.sender === "user"
                                ? "bg-purple-600/80"
                                : "bg-white/10"
                            } ${failedMessageId === message.id ? 'border-2 border-red-500/50' : ''}`}
                          >
                            <div
                              className="text-sm text-white whitespace-pre-wrap break-words"
                              dangerouslySetInnerHTML={{ __html: message.content }}
                            />
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs text-gray-300">
                                {format(message.timestamp, "h:mm a")}
                              </p>
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {message.sender === "ai" && (
                                  <button
                                    onClick={() => handleCopyMessage(message.content, message.id)}
                                    className="text-gray-400 hover:text-white transition-colors p-1"
                                    title="Copy message"
                                  >
                                    {copiedMessageId === message.id ? (
                                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          {failedMessageId === message.id && message.sender === "user" && (
                            <button
                              onClick={() => handleRetryMessage(message.content)}
                              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 mt-1 transition-colors"
                            >
                              <RotateCcw className="w-3 h-3" />
                              Retry message
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isLoading && (
                  <motion.div className="flex justify-start">
                    <div className="bg-white/10 rounded-xl p-4 flex items-center gap-4 min-w-[180px]">
                      {/* Animated AI avatar */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-teal-400 animate-pulse shadow-lg flex items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="#a78bfa"
                            opacity="0.2"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="6"
                            fill="#a78bfa"
                            opacity="0.5"
                          />
                          <circle cx="12" cy="12" r="3" fill="#a78bfa" />
                        </svg>
                      </div>
                      {/* Typewriter dots */}
                      <div className="flex flex-col">
                        <div className="flex gap-1 mb-1">
                          <span
                            className="block w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="block w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="block w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                        <span className="text-purple-300 text-xs font-mono animate-pulse">
                          AI is thinking
                          <span className="animate-pulse">...</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
                
                {/* Floating scroll to bottom button */}
                {!autoScroll && messages.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => {
                      setAutoScroll(true);
                      scrollToBottom();
                    }}
                    className="fixed bottom-24 right-8 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg z-10 transition-colors"
                    title="Scroll to bottom"
                  >
                    <ArrowDown className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              <div className="bg-black/60 border-t border-white/10 p-4">
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="flex items-end space-x-2">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                          }
                        }}
                        placeholder="Type your message... (Shift+Enter for new line)"
                        rows={1}
                        maxLength={4000}
                        className="w-full bg-white/10 rounded-xl px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:border-purple-500 resize-none min-h-[48px] max-h-32 overflow-y-auto"
                        style={{
                          height: 'auto',
                          minHeight: '48px',
                        }}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = 'auto';
                          target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                        }}
                      />
                      {input.length > 3800 && (
                        <div className="absolute -top-6 right-0 text-xs text-gray-400">
                          {input.length}/4000
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className={`px-6 py-3 rounded-xl text-sm text-white font-medium transition-all ${
                        isLoading || !input.trim()
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700"
                      }`}
                    >
                      {isLoading ? "..." : "Send"}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Press Enter to send • Shift+Enter for new line • Esc to clear</span>
                    {!autoScroll && (
                      <button
                        onClick={() => {
                          setAutoScroll(true);
                          scrollToBottom();
                        }}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Resume auto-scroll
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notifications */}
        <Toaster 
          position="bottom-left"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid rgba(168, 85, 247, 0.3)',
            },
          }}
        />

        {/* Modal for Conclusion Data */}
        <AnimatePresence>
          {conclusionData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70  flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-gray-900/90 mt-28 to-gray-800/90 backdrop-blur-md rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
              >
                <div className="flex justify-between items-center mb-6 ">
                  <h2 className="text-2xl text-white font-[var(--font-josefin-sans)]">
                    Case Analysis Report
                  </h2>
                  <div className="flex space-x-4">
                    <Button
                      onClick={handleDownloadPDF}
                      className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer hover:scale-105 hover:bg-gray-800/90 rounded-full p-2"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="space-y-8">
                  {/* Case Summary */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl text-white mb-4 font-[var(--font-josefin-sans)]">
                      Case Summary
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {conclusionData.caseFinalAnalysis.userCaseSummary}
                    </p>
                  </div>

                  {/* Laws Involved */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl text-white mb-4 font-[var(--font-josefin-sans)]">
                      Laws Involved
                    </h3>
                    <ul className="space-y-3">
                      {conclusionData.caseFinalAnalysis.lawsInvolved.map(
                        (law, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-1.5">
                              <div className="w-2 h-2 rounded-full bg-purple-500" />
                            </div>
                            <p className="text-gray-300 text-sm">{law}</p>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Relevant Case Details */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl text-white mb-4 font-[var(--font-josefin-sans)]">
                      Relevant Case Details
                    </h3>
                    {conclusionData.caseFinalAnalysis.relevantCaseDetails.map(
                      (caseDetail, index) => (
                        <div key={index} className="mb-6 last:mb-0">
                          <h4 className="text-lg font-semibold text-purple-400 mb-2">
                            {caseDetail.title}
                          </h4>
                          <p className="text-gray-300 text-sm mb-4">
                            {caseDetail.caseBrief}
                          </p>
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-sm font-medium text-purple-400 mb-2">
                                Laws Assessed
                              </h5>
                              <ul className="space-y-2">
                                {caseDetail.lawsAssessed.map((law, idx) => (
                                  <li
                                    key={idx}
                                    className="text-gray-300 text-sm"
                                  >
                                    {law}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-purple-400 mb-2">
                                Court Reasoning
                              </h5>
                              <ul className="space-y-2">
                                {caseDetail.courtReasoning.map(
                                  (reason, idx) => (
                                    <li
                                      key={idx}
                                      className="text-gray-300 text-sm"
                                    >
                                      {reason}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-purple-400 mb-2">
                                Conclusion
                              </h5>
                              <p className="text-gray-300 text-sm">
                                {caseDetail.conclusion}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Learnings */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl text-white mb-4 font-[var(--font-josefin-sans)]">
                      Learnings
                    </h3>
                    <ul className="space-y-3">
                      {conclusionData.caseFinalAnalysis.learnings.map(
                        (learning, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-1.5">
                              <div className="w-2 h-2 rounded-full bg-purple-500" />
                            </div>
                            <p className="text-gray-300 text-sm">{learning}</p>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Utilization */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl text-white mb-4 font-[var(--font-josefin-sans)]">
                      Utilization
                    </h3>
                    <ul className="space-y-3">
                      {conclusionData.caseFinalAnalysis.utilization.map(
                        (util, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-1.5">
                              <div className="w-2 h-2 rounded-full bg-purple-500" />
                            </div>
                            <p className="text-gray-300 text-sm">{util}</p>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Action Plan */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl text-white mb-4 font-[var(--font-josefin-sans)]">
                      Action Plan
                    </h3>
                    <ul className="space-y-4">
                      {conclusionData.caseFinalAnalysis.actionPlan.map(
                        (step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-1.5">
                              <div className="w-2 h-2 rounded-full bg-purple-500" />
                            </div>
                            <div>
                              <p className="text-gray-300 text-sm">
                                {step.step}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                Priority: {step.priority}
                              </p>
                              {step.resource && (
                                <p className="text-xs text-purple-400 mt-1">
                                  {step.resource}
                                </p>
                              )}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Primary Recommendation */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl text-white mb-4 font-[var(--font-josefin-sans)]">
                      Primary Recommendation
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {conclusionData.caseFinalAnalysis.primaryRecommendation}
                    </p>
                  </div>

                  {/* Long Term Strategy */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl text-white mb-4 font-[var(--font-josefin-sans)]">
                      Long Term Strategy
                    </h3>
                    <ul className="space-y-3">
                      {conclusionData.caseFinalAnalysis.longTermStrategy.map(
                        (strategy: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-1.5">
                              <div className="w-2 h-2 rounded-full bg-purple-500" />
                            </div>
                            <p className="text-gray-300 text-sm">{strategy}</p>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Todos */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl text-white mb-4 font-[var(--font-josefin-sans)]">
                      Todos
                    </h3>
                    <ul className="space-y-4">
                      {conclusionData.todos.map((todo, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                          </div>
                          <div>
                            <p className="text-gray-300 text-sm font-medium">
                              {todo.title}
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                              {todo.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ProtectedPage>
  );
}
