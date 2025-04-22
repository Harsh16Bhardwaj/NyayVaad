'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download, 
  FileText, 
  ListTodo, 
  Loader2, 
  Plus, 
  Trash2,
  BookOpen,


  Sparkles,
  MessageSquare,
  FileText as FileTextIcon,
  Briefcase,
  Gavel
} from 'lucide-react';
import TodoItem from '@/components/TodoItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ProtectedPage from "@/components/ProtectedPage";

interface Todo {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  status: 'pending' | 'in-progress' | 'done';
  subtasks?: Subtask[];
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface CaseSummary {
  id: string;
  title: string;
  date: Date;
  summary: string;
  legalPoints: string[];
  fields: string[];
  advice: string[];
  nextSteps: string[];
}

export default function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      title: 'Hire a Property Lawyer',
      description: 'Find and consult with a property dispute specialist',
      deadline: new Date('2024-03-15'),
      status: 'pending',
      subtasks: [
        { id: '1-1', title: 'Research local property lawyers', completed: false },
        { id: '1-2', title: 'Schedule initial consultations', completed: false },
      ]
    },
    {
      id: '2',
      title: 'Gather Property Documents',
      description: 'Collect all relevant property ownership papers',
      deadline: new Date('2024-03-20'),
      status: 'in-progress',
    }
  ]);

  const [summaries, setSummaries] = useState<CaseSummary[]>([
    {
      id: '1',
      title: 'Initial Property Dispute Consultation',
      date: new Date('2024-03-10'),
      summary: 'Initial consultation regarding property boundary dispute',
      legalPoints: ['Property Rights', 'Boundary Laws'],
      fields: ['Property Details', 'Dispute Nature'],
      advice: ['Document all communications', 'Maintain property records'],
      nextSteps: ['Hire lawyer', 'Gather documents']
    }
  ]);

  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);
  const [isBulkSelecting, setIsBulkSelecting] = useState(false);

  const handleTodoStatusChange = (id: string, status: Todo['status']) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, status } : todo
    ));
  };

  const handleBulkDelete = () => {
    setTodos(prev => prev.filter(todo => !selectedTodos.includes(todo.id)));
    setSelectedTodos([]);
    setIsBulkSelecting(false);
  };

  const handleDateChange = (id: string, date: Date) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, deadline: date } : todo
    ));
  };

  const handleTitleChange = (id: string, title: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, title } : todo
    ));
  };

  const handleSubtaskToggle = (todoId: string, subtaskId: string) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === todoId && todo.subtasks) {
        return {
          ...todo,
          subtasks: todo.subtasks.map(subtask =>
            subtask.id === subtaskId
              ? { ...subtask, completed: !subtask.completed }
              : subtask
          )
        };
      }
      return todo;
    }));
  };

  const handleSubtaskAdd = (todoId: string, title: string) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === todoId) {
        const newSubtask = {
          id: `${todoId}-${Date.now()}`,
          title,
          completed: false
        };
        return {
          ...todo,
          subtasks: [...(todo.subtasks || []), newSubtask]
        };
      }
      return todo;
    }));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now().toString(),
      title: 'New Task',
      description: 'Click to edit description',
      deadline: new Date(),
      status: 'pending' as const,
      subtasks: []
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const handleLawyerSearch = () => {
    const searchQuery = encodeURIComponent('Indian Lawyer');
    window.open(`https://www.linkedin.com/search/results/people/?keywords=${searchQuery}`, '_blank');
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen  bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 pt-24">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          {/* Add your dashboard content here */}
          <div className="min-h-screen mt-10 rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white font-[var(--font-playfair)]">Case Dashboard</h1>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Calendar View
                  </Button>
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Todos */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Todo List Section */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-white font-[var(--font-playfair)]">Case Tasks</h2>
                      <div className="flex items-center space-x-4">
                        {isBulkSelecting && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleBulkDelete}
                            className="bg-red-600/20 hover:bg-red-600/30 text-red-400"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Selected
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsBulkSelecting(!isBulkSelecting)}
                          className="bg-transparent border-white/10 hover:bg-white/5"
                        >
                          {isBulkSelecting ? 'Cancel' : 'Bulk Select'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleAddTodo}
                          className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Task
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {todos.map((todo) => (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          onStatusChange={handleTodoStatusChange}
                          onDateChange={handleDateChange}
                          onTitleChange={handleTitleChange}
                          onSubtaskToggle={handleSubtaskToggle}
                          onSubtaskAdd={handleSubtaskAdd}
                          onDelete={handleDeleteTodo}
                          isSelected={selectedTodos.includes(todo.id)}
                          onSelect={(id) => {
                            if (selectedTodos.includes(id)) {
                              setSelectedTodos(selectedTodos.filter(todoId => todoId !== id));
                            } else {
                              setSelectedTodos([...selectedTodos, id]);
                            }
                          }}
                          isBulkSelecting={isBulkSelecting}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Case Summary Section */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-white font-[var(--font-playfair)]">Case Summary</h2>
                      <Button
                        variant="outline"
                        className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Summary
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-purple-400 font-[var(--font-space)] mb-2">Case Overview</h3>
                          <p className="text-sm text-gray-300 font-[var(--font-inter)]">
                            Property dispute case involving boundary issues and ownership claims.
                          </p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-purple-400 font-[var(--font-space)] mb-2">Key Legal Points</h3>
                          <ul className="space-y-1">
                            <li className="text-sm text-gray-300 font-[var(--font-inter)]">• Property Rights</li>
                            <li className="text-sm text-gray-300 font-[var(--font-inter)]">• Boundary Laws</li>
                            <li className="text-sm text-gray-300 font-[var(--font-inter)]">• Ownership Documentation</li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-purple-400 font-[var(--font-space)] mb-2">Next Steps</h3>
                          <ul className="space-y-1">
                            <li className="text-sm text-gray-300 font-[var(--font-inter)]">• Hire property lawyer</li>
                            <li className="text-sm text-gray-300 font-[var(--font-inter)]">• Gather property documents</li>
                            <li className="text-sm text-gray-300 font-[var(--font-inter)]">• Schedule mediation</li>
                          </ul>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-purple-400 font-[var(--font-space)] mb-2">Timeline</h3>
                          <p className="text-sm text-gray-300 font-[var(--font-inter)]">
                            Initial consultation completed. Next hearing scheduled for April 15, 2024.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Case Progress and Legal Word */}
                <div className="space-y-8">
                  {/* Case Progress */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <h2 className="text-xl font-semibold text-white font-[var(--font-playfair)] mb-4">Case Progress</h2>
                    <div className="space-y-4">
                      {[
                        {
                          step: 'Intake',
                          icon: MessageSquare,
                          action: () => window.location.href = '/chat',
                          color: 'bg-purple-500'
                        },
                        {
                          step: 'Document Prep',
                          icon: FileTextIcon,
                          action: () => window.open('https://www.canva.com/templates/search/legal-documents/', '_blank'),
                          color: 'bg-gray-700'
                        },
                        {
                          step: 'Lawyer Hired',
                          icon: Briefcase,
                          action: handleLawyerSearch,
                          color: 'bg-gray-700'
                        },
                        {
                          step: 'Court Process',
                          icon: Gavel,
                          action: () => window.open('https://ecourts.gov.in/ecourts_home/', '_blank'),
                          color: 'bg-gray-700'
                        }
                      ].map(({ step, icon: Icon, action, color }, index) => (
                        <div key={step} className="flex items-center space-x-4">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            color
                          )}>
                            <span className="text-white font-medium">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="text-white font-[var(--font-inter)]">{step}</span>
                              {index === 0 && (
                                <span className="text-xs text-green-400 font-[var(--font-space)]">Completed</span>
                              )}
                            </div>
                            {index < 3 && (
                              <div className="h-1 bg-gray-700 rounded-full mt-2">
                                <div className={cn(
                                  "h-full rounded-full transition-all duration-500",
                                  index === 0 ? "bg-purple-500 w-full" : "bg-gray-700 w-0"
                                )} />
                              </div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={action}
                            className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-700/50"
                          >
                            <Icon className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legal Word of the Day */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center space-x-3 mb-4">
                      <BookOpen className="w-6 h-6 text-purple-400" />
                      <h2 className="text-xl font-semibold text-white font-[var(--font-playfair)]">Legal Word of the Day</h2>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg text-purple-400 font-[var(--font-space)]">Estoppel</h3>
                      <p className="text-sm text-gray-300 font-[var(--font-inter)]">
                        A legal rule that stops someone from changing their story later in court.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
} 