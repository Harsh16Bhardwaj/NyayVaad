'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Scale, Sparkles, RefreshCw, CheckCircle2, X, Download } from 'lucide-react';
import { ChatMessage } from '@/types/case';
import ProtectedPage from '@/components/ProtectedPage';
import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import { addTodo } from '@/app/store/slices/todoSlice';
import { AppDispatch } from '@/app/store';
import jsPDF from 'jspdf';

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
    risksAndMitigations: Array<{
      risk: string;
      mitigation: string;
    }>;
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

const fieldOrder = ['description', 'opponent', 'timeline', 'evidence', 'agreement'];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('Hey I need help for my legal case.');
  const [isLoading, setIsLoading] = useState(false);
  const [caseData, setCaseData] = useState<CaseData>(initialCaseData);
  const [sessionId] = useState<string>(`user_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAnalysisEnabled, setIsAnalysisEnabled] = useState(false);
  const [isConcluding, setIsConcluding] = useState(false);
  const [conclusionData, setConclusionData] = useState<ConclusionData | null>(null);
  const dispatch = useDispatch<AppDispatch>();

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

      for (const todo of data.todos) {
        const backendResponse = await fetch('/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: todo.title,
            description: todo.description,
            deadline: new Date(),
            status: 'pending',
          }),
        }); 

        if (backendResponse.ok) {
          const createdTodo = await backendResponse.json();
          dispatch(addTodo(createdTodo));
        }
      }
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

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: `**Case Summary**: ${data.caseSummary || 'No summary provided'}`,
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);

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
                  `,
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
                      <p className="text-gray-300 text-sm mt-1">${todo.description}</p>
                    </div>
                  `,
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
    setConclusionData(null);
  };

  const handleConclude = async () => {
    setIsConcluding(true);
    try {
      const response = await fetch('/api/chat/conclude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caseData: messages }),
      });
      const data = await response.json();
      setConclusionData(data);

      for (const todo of data.todos) {
        const backendResponse = await fetch('/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: todo.title,
            description: todo.description,
            deadline: new Date(),
            status: 'pending',
          }),
        });

        if (backendResponse.ok) {
          const createdTodo = await backendResponse.json();
          dispatch(addTodo(createdTodo));
        }
      }
    } catch (error) {
      console.error('Error concluding case:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: 'Error concluding case. Please try again.',
          sender: 'ai',
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
    let yOffset = 20;

    const addText = (text: string, x: number, y: number, size: number, isBold = false) => {
      doc.setFontSize(size);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.text(text, x, y);
      return y + size * 0.5;
    };

    const addSection = (title: string, items: string[], x: number, startY: number) => {
      yOffset = addText(title, x, startY, 14, true);
      items.forEach((item) => {
        const splitText = doc.splitTextToSize(item, 180);
        splitText.forEach((line: string) => {
          if (yOffset > 280) {
            doc.addPage();
            yOffset = 20;
          }
          yOffset = addText(line, x + 5, yOffset, 10);
        });
        yOffset += 2;
      });
      return yOffset;
    };

    doc.setFontSize(16);
    doc.text('Case Analysis Report', 20, yOffset);
    yOffset += 10;

    yOffset = addText('Case Summary', 20, yOffset, 14, true);
    const summaryLines = doc.splitTextToSize(conclusionData.caseFinalAnalysis.userCaseSummary, 170);
    summaryLines.forEach((line: string) => {
      if (yOffset > 280) {
        doc.addPage();
        yOffset = 20;
      }
      yOffset = addText(line, 25, yOffset, 10);
    });
    yOffset += 5;

    yOffset = addSection('Laws Involved', conclusionData.caseFinalAnalysis.lawsInvolved, 20, yOffset);

    conclusionData.caseFinalAnalysis.relevantCaseDetails.forEach((detail) => {
      yOffset = addText(detail.title, 20, yOffset, 12, true);
      yOffset = addText('Case Brief:', 25, yOffset, 10, true);
      const briefLines = doc.splitTextToSize(detail.caseBrief, 160);
      briefLines.forEach((line: string) => {
        if (yOffset > 280) {
          doc.addPage();
          yOffset = 20;
        }
        yOffset = addText(line, 30, yOffset, 10);
      });
      yOffset = addSection('Laws Assessed', detail.lawsAssessed, 25, yOffset);
      yOffset = addSection('Court Reasoning', detail.courtReasoning, 25, yOffset);
      yOffset = addText('Conclusion:', 25, yOffset, 10, true);
      const conclusionLines = doc.splitTextToSize(detail.conclusion, 160);
      conclusionLines.forEach((line: string) => {
        if (yOffset > 280) {
          doc.addPage();
          yOffset = 20;
        }
        yOffset = addText(line, 30, yOffset, 10);
      });
      yOffset += 5;
    });

    yOffset = addSection('Learnings', conclusionData.caseFinalAnalysis.learnings, 20, yOffset);
    yOffset = addSection('Utilization', conclusionData.caseFinalAnalysis.utilization, 20, yOffset);

    yOffset = addText('Action Plan', 20, yOffset, 14, true);
    conclusionData.caseFinalAnalysis.actionPlan.forEach((step) => {
      if (yOffset > 280) {
        doc.addPage();
        yOffset = 20;
      }
      yOffset = addText(step.step, 25, yOffset, 10);
      if (step.resource) {
        yOffset = addText(`Resource: ${step.resource}`, 30, yOffset, 10);
      }
      yOffset = addText(`Priority: ${step.priority}`, 30, yOffset, 10);
      yOffset += 2;
    });

    yOffset = addText('Primary Recommendation', 20, yOffset, 14, true);
    const recLines = doc.splitTextToSize(conclusionData.caseFinalAnalysis.primaryRecommendation, 170);
    recLines.forEach((line: string) => {
      if (yOffset > 280) {
        doc.addPage();
        yOffset = 20;
      }
      yOffset = addText(line, 25, yOffset, 10);
    });
    yOffset += 5;

    yOffset = addText('Risks and Mitigations', 20, yOffset, 14, true);
    conclusionData.caseFinalAnalysis.risksAndMitigations.forEach((item) => {
      if (yOffset > 280) {
        doc.addPage();
        yOffset = 20;
      }
      yOffset = addText(`Risk: ${item.risk}`, 25, yOffset, 10);
      yOffset = addText(`Mitigation: ${item.mitigation}`, 25, yOffset, 10);
      yOffset += 2;
    });

    yOffset = addSection('Long Term Strategy', conclusionData.caseFinalAnalysis.longTermStrategy, 20, yOffset);

    yOffset = addText('Todos', 20, yOffset, 14, true);
    conclusionData.todos.forEach((todo) => {
      if (yOffset > 280) {
        doc.addPage();
        yOffset = 20;
      }
      yOffset = addText(todo.title, 25, yOffset, 10, true);
      const todoLines = doc.splitTextToSize(todo.description, 160);
      todoLines.forEach((line: string) => {
        if (yOffset > 280) {
          doc.addPage();
          yOffset = 20;
        }
        yOffset = addText(line, 30, yOffset, 10);
      });
      yOffset += 2;
    });

    doc.save('case_analysis_report.pdf');
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-neutral-900 pt-10">
        <div className="mx-auto ">
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
          <div className="flex h-[calc(100vh-5rem)] rounded-xl bg-gradient-to-br  from-gray-950 to-gray-950">
            <div className="w

-80 bg-black/60 border-r border-white/10 p-4 overflow-y-auto">
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
                  <div className="flex justify-end space-x-4 mb-4">
                    <Button
                      variant="outline"
                      className="bg-transparent cursor-pointer border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 group"
                      onClick={handleSuperAnalysis}
                      disabled={isLoading}
                    >
                      <Sparkles className="w-4 h-4 mr-2 cursor-pointer group-hover:scale-110 transition-transform duration-300" />
                      {isLoading ? 'Processing...' : 'Start Processing'}
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent cursor-pointer border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300 transition-all duration-300 group"
                      onClick={handleConclude}
                      disabled={isConcluding}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2 group-hover:scale-110 cursor-pointer transition-transform duration-300" />
                      {isConcluding ? 'Analyzing...' : 'Super Analyze'}
                    </Button>
                  </div>
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
                  <h2 className="text-2xl font-bold text-white font-[var(--font-josefin-sans)]">Case Analysis Report</h2>
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
                    <h3 className="text-xl font-bold text-white mb-4 font-[var(--font-josefin-sans)]">Case Summary</h3>
                    <p className="text-gray-300 text-sm">{conclusionData.caseFinalAnalysis.userCaseSummary}</p>
                  </div>

                  {/* Laws Involved */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 font-[var(--font-josefin-sans)]">Laws Involved</h3>
                    <ul className="space-y-3">
                      {conclusionData.caseFinalAnalysis.lawsInvolved.map((law, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                          </div>
                          <p className="text-gray-300 text-sm">{law}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Relevant Case Details */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 font-[var(--font-josefin-sans)]">Relevant Case Details</h3>
                    {conclusionData.caseFinalAnalysis.relevantCaseDetails.map((caseDetail, index) => (
                      <div key={index} className="mb-6 last:mb-0">
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">{caseDetail.title}</h4>
                        <p className="text-gray-300 text-sm mb-4">{caseDetail.caseBrief}</p>
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-sm font-medium text-purple-400 mb-2">Laws Assessed</h5>
                            <ul className="space-y-2">
                              {caseDetail.lawsAssessed.map((law, idx) => (
                                <li key={idx} className="text-gray-300 text-sm">{law}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-purple-400 mb-2">Court Reasoning</h5>
                            <ul className="space-y-2">
                              {caseDetail.courtReasoning.map((reason, idx) => (
                                <li key={idx} className="text-gray-300 text-sm">{reason}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-purple-400 mb-2">Conclusion</h5>
                            <p className="text-gray-300 text-sm">{caseDetail.conclusion}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Learnings */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 font-[var(--font-josefin-sans)]">Learnings</h3>
                    <ul className="space-y-3">
                      {conclusionData.caseFinalAnalysis.learnings.map((learning, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                          </div>
                          <p className="text-gray-300 text-sm">{learning}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Utilization */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 font-[var(--font-josefin-sans)]">Utilization</h3>
                    <ul className="space-y-3">
                      {conclusionData.caseFinalAnalysis.utilization.map((util, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                          </div>
                          <p className="text-gray-300 text-sm">{util}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Plan */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 font-[var(--font-josefin-sans)]">Action Plan</h3>
                    <ul className="space-y-4">
                      {conclusionData.caseFinalAnalysis.actionPlan.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                          </div>
                          <div>
                            <p className="text-gray-300 text-sm">{step.step}</p>
                            <p className="text-xs text-gray-400 mt-1">Priority: {step.priority}</p>
                            {step.resource && (
                              <p className="text-xs text-purple-400 mt-1">{step.resource}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Primary Recommendation */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 font-[var(--font-josefin-sans)]">Primary Recommendation</h3>
                    <p className="text-gray-300 text-sm">{conclusionData.caseFinalAnalysis.primaryRecommendation}</p>
                  </div>

                  {/* Risks and Mitigations */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 font-[var(--font-josefin-sans)]">Risks and Mitigations</h3>
                    <ul className="space-y-4">
                      {conclusionData.caseFinalAnalysis.risksAndMitigations.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                          </div>
                          <div>
                            <p className="text-gray-300 text-sm font-medium">Risk: {item.risk}</p>
                            <p className="text-gray-400 text-sm mt-1">Mitigation: {item.mitigation}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Long Term Strategy */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 font-[var(--font-josefin-sans)]">Long Term Strategy</h3>
                    <ul className="space-y-3">
                      {conclusionData.caseFinalAnalysis.longTermStrategy.map((strategy, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                          </div>
                          <p className="text-gray-300 text-sm">{strategy}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Todos */}
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 font-[var(--font-josefin-sans)]">Todos</h3>
                    <ul className="space-y-4">
                      {conclusionData.todos.map((todo, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                          </div>
                          <div>
                            <p className="text-gray-300 text-sm font-medium">{todo.title}</p>
                            <p className="text-gray-400 text-sm mt-1">{todo.description}</p>
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