'use client';

import { useEffect, useState } from 'react';
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
import CalendarView from '@/components/CalendarView';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '@/app/store/slices/todoSlice';
import { fetchCaseSummary } from '@/app/store/slices/caseSummarySlice';
import { Todo } from '@/app/store/slices/todoSlice';
import { CaseSummary } from '@/app/store/slices/caseSummarySlice';

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading: todosLoading, error: todosError } = useSelector((state: RootState) => state.todos);
  const { summary, loading: summaryLoading, error: summaryError } = useSelector((state: RootState) => state.caseSummary);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchCaseSummary());
  }, [dispatch]);

  const handleTodoStatusChange = (id: string, status: 'pending' | 'ongoing' | 'done') => {
    const todo = todos.find((t: Todo) => t.id === id);
    if (todo) {
      dispatch(updateTodo({ ...todo, status }));
    }
  };

  const handleDateChange = (id: string, date: Date) => {
    const todo = todos.find((t: Todo) => t.id === id);
    if (todo) {
      dispatch(updateTodo({ ...todo, deadline: date }));
    }
  };

  const handleTitleChange = (id: string, title: string) => {
    const todo = todos.find((t: Todo) => t.id === id);
    if (todo) {
      dispatch(updateTodo({ ...todo, title }));
    }
  };

  const handleSubtaskToggle = (todoId: string, subtaskId: string) => {
    const todo = todos.find((t: Todo) => t.id === todoId);
    if (todo && todo.subtasks) {
      const updatedSubtasks = todo.subtasks.map((subtask: { id: string; completed: boolean }) =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      );
      dispatch(updateTodo({ ...todo, subtasks: updatedSubtasks }));
    }
  };

  const handleSubtaskAdd = (todoId: string, title: string) => {
    const todo = todos.find((t: Todo) => t.id === todoId);
    if (todo) {
      const newSubtask = {
        id: `${todoId}-${Date.now()}`,
        title,
        description: '',
        completed: false
      };
      const updatedSubtasks = [...(todo.subtasks || []), newSubtask];
      dispatch(updateTodo({ ...todo, subtasks: updatedSubtasks }));
    }
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleAddTodo = () => {
    const newTodo = {
      title: 'New Task',
      description: 'Click to edit description',
      deadline: new Date(),
      status: 'pending' as const,
      subtasks: []
    };
    dispatch(addTodo(newTodo));
  };

  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);
  const [isBulkSelecting, setIsBulkSelecting] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleBulkDelete = () => {
    selectedTodos.forEach((id: string) => dispatch(deleteTodo(id)));
    setSelectedTodos([]);
    setIsBulkSelecting(false);
  };

  const handleTodoSelect = (id: string) => {
    if (isBulkSelecting) {
      setSelectedTodos(prev =>
        prev.includes(id)
          ? prev.filter(todoId => todoId !== id)
          : [...prev, id]
      );
    }
  };

  const handleLawyerSearch = () => {
    const searchQuery = encodeURIComponent('Indian Lawyer');
    window.open(`https://www.linkedin.com/search/results/people/?keywords=${searchQuery}`, '_blank');
  };

  // Add calendar events from todos and summaries
  const calendarEvents = [
    ...todos.map((todo: Todo) => ({
      id: todo.id,
      title: todo.title,
      date: todo.deadline,
      type: 'deadline' as const
    })),
    ...(summary ? [
      {
        id: `summary-${summary.id}`,
        title: summary.title,
        date: summary.date,
        type: 'hearing' as const
      }
    ] : []),
  ];

  return (
    <ProtectedPage>
      <div className="min-h-screen h-auto pb-10  bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 pt-24">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          {/* Add your dashboard content here */}
          <div className="min-h-screen h-auto mt-10  rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            <div className="max-w-7xl h-auto mx-auto px-8 py-8 space-y-8">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white font-[var(--font-josefin-sans)]">Case Dashboard</h1>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCalendarOpen(true)}
                    className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Calendar View
                  </Button>
                </div>
              </div>

              {/* Calendar Modal */}
              <CalendarView
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                events={calendarEvents}
              />

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Todos */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Todo List Section */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-white font-[var(--font-josefin-sans)]">Case Tasks</h2>
                      <div className="flex items-center space-x-4">
                        {isBulkSelecting && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleBulkDelete}
                            className="bg-red-600/20 hover:bg-red-600/30 cursor-pointer text-red-400"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Selected
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsBulkSelecting(!isBulkSelecting)}
                          className="bg-transparent text-gray-300 border-white/60 hover:border-white duration-150 ease-in-out cursor-pointer hover:bg-white/5"
                        >
                          {isBulkSelecting ? 'Cancel' : 'Bulk Select'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleAddTodo}
                          className="bg-transparent border-purple-500/30 cursor-pointer text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Task
                        </Button>
                      </div>
                    </div>

                    {todosLoading ? (
                      <div className="flex justify-center items-center h-32">
                        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                      </div>
                    ) : todosError ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/5 min-h-[250px] flex flex-col items-center justify-center text-center relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                        <div className="relative z-10">
                          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MessageSquare className="w-5 h-5 text-purple-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-100 mb-2 font-[var(--font-josefin-sans)]">No Tasks Yet</h3>
                          <p className="text-gray-400 text-md mb-6 max-w-md mx-auto">Start a conversation to get your case tasks and stay organized!</p>
                          <Button
                            variant="outline"
                            className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 group"
                            onClick={() => window.location.href = '/chat'}
                          >
                            <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                            Start Conversation
                          </Button>
                        </div>
                      </motion.div>
                    ) : todos.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/5 min-h-[250px] flex flex-col items-center justify-center text-center relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                        <div className="relative z-10">
                          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MessageSquare className="w-8 h-8 text-purple-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3 font-[var(--font-josefin-sans)]">No Tasks Yet</h3>
                          <p className="text-gray-400 mb-6 max-w-md mx-auto">Start a conversation to get your case tasks and stay organized!</p>
                          <Button
                            variant="outline"
                            className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 group"
                            onClick={() => window.location.href = '/chat'}
                          >
                            <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                            Start Conversation
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="space-y-4">
                        {todos.map((todo: Todo) => (
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
                            onSelect={handleTodoSelect}
                            isBulkSelecting={isBulkSelecting}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Case Summary Section */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-white font-[var(--font-josefin-sans)]">Case Summary</h2>
                      <Button
                        variant="outline"
                        className="bg-gradient-to-r from-[#610010] to-[#6d0113] via-[#b9132f] border-gray-500/30 cursor-pointer text-gray-300 hover:bg-purple-500/10 hover:text-white hover:scale-102 hover:shadow-lg hover:shadow-gray-500/20 hover:shadow-inner hover:duration-200  duration-150 ease-in-out"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Summary
                      </Button>
                    </div>

                    {summaryLoading ? (
                      <div className="flex justify-center items-center h-32">
                        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                      </div>
                    ) : summaryError ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/5 min-h-[350px] flex flex-col items-center justify-center text-center relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                        <div className="relative z-10">
                          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Sparkles className="w-8 h-8 text-purple-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3 font-[var(--font-josefin-sans)]">No Case Summary Yet</h3>
                          <p className="text-gray-400 mb-6 max-w-md mx-auto">Start a conversation to get your case analyzed and receive a detailed summary!</p>
                          <Button
                            variant="outline"
                            className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 group"
                            onClick={() => window.location.href = '/chat'}
                          >
                            <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                            Start Conversation
                          </Button>
                        </div>
                      </motion.div>
                    ) : !summary ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/5 min-h-[350px] flex flex-col items-center justify-center text-center relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                        <div className="relative z-10">
                          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-white   font-[var(--font-josefin-sans)]">No Case Summary Yet</h3>
                          <p className="text-gray-400 mb-6 max-w-md mx-auto">Start a conversation to get your case analyzed and receive a detailed summary!</p>
                          <Button
                            variant="outline"
                            className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 group"
                            onClick={() => window.location.href = '/chat'}
                          >
                            <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                            Start Conversation
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-purple-400 font-[var(--font-space)] mb-2">Case Overview</h3>
                            <p className="text-sm text-gray-300 font-[var(--font-inter)]">
                              {summary.summary}
                            </p>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-purple-400 font-[var(--font-space)] mb-2">Key Legal Points</h3>
                            <ul className="space-y-1">
                              {summary.legalPoints.map((point: string, index: number) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="mt-1.5">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                  </div>
                                  <p className="text-sm text-muted-foreground">{point}</p>
                                </motion.div>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-purple-400 font-[var(--font-space)] mb-2">Next Steps</h3>
                            <ul className="space-y-1">
                              {summary.nextSteps.map((step: string, index: number) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="mt-1.5">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                  </div>
                                  <p className="text-sm text-muted-foreground">{step}</p>
                                </motion.div>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-purple-400 font-[var(--font-space)] mb-2">Timeline</h3>
                            <p className="text-sm text-gray-300 font-[var(--font-inter)]">
                              {new Date(summary.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Case Progress and Legal Word */}
                <div className="space-y-8">
                  {/* CTA*/}
                  <div className="bg-gradient-to-tr from-[#0F2027] to-[##2C5364] via-[#203A43] backdrop-blur-sm flex flex-col items-center justify-center rounded-xl p-6 border border-white/5">
                    <h2 className="text-xl text-left font-semibold text-white font-[var(--font-josefin-sans)] mb-1">Start A Conversation Now</h2>
                    <p className="text-sm text-center text-neutral-400 font-[var(--font-inter)] mb-2">
                      Get Solution to your legal problems within minutes.
                    </p>
                    <Button
                      variant="outline"
                      className="bg-transparent mt-2 bg-gradient-to-r border-0 from-[#610010] to-[#6d0113] via-[#b9132f]  text-gray-200 hover:bg-purple-500/10 hover:text-white cursor-pointer hover:scale-102 hover:shadow-lg hover:shadow-gray-500/20 hover:shadow-inner hover:duration-200  duration-150 ease-in-out"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Start Conversation
                    </Button>
                  </div>


                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <h2 className="text-xl font-semibold text-white font-[var(--font-josefin-sans)] mb-4">Case Progress</h2>
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
                  <Link href="/fun">
                  <div className="bg-gradient-to-r from-[#0F2027] to-[##2C5364] via-[#203A43] backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center space-x-3 mb-4">
                      <BookOpen className="w-6 h-6 text-gray-400" />
                      <h2 className="text-xl font-semibold font-semibold text-white font-[var(--font-josefin-sans)]">Legal Word of the Day</h2>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg text-purple-400 font-[var(--font-space)]">Estoppel</h3>
                      <p className="text-sm text-gray-300 font-[var(--font-inter)]">
                        A legal rule that stops someone from changing their story later in court.
                      </p>
                    </div>
                  </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
} 