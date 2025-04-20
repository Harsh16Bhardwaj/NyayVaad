import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  Calendar as CalendarIcon, 
  MoreVertical,
  Pencil,
  Trash2,
  Plus,
  ChevronDown
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    status: 'pending' | 'in-progress' | 'done';
    subtasks?: {
      id: string;
      title: string;
      completed: boolean;
    }[];
  };
  onStatusChange: (id: string, status: 'pending' | 'in-progress' | 'done') => void;
  onDateChange: (id: string, date: Date) => void;
  onTitleChange: (id: string, title: string) => void;
  onSubtaskToggle: (todoId: string, subtaskId: string) => void;
  onSubtaskAdd: (todoId: string, title: string) => void;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  isBulkSelecting?: boolean;
}

export default function TodoItem({
  todo,
  onStatusChange,
  onDateChange,
  onTitleChange,
  onSubtaskToggle,
  onSubtaskAdd,
  onDelete,
  isSelected,
  onSelect,
  isBulkSelecting
}: TodoItemProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    'in-progress': 'bg-blue-500/20 text-blue-400',
    done: 'bg-green-500/20 text-green-400'
  };

  const handleSubtaskAdd = () => {
    if (newSubtask.trim()) {
      onSubtaskAdd(todo.id, newSubtask.trim());
      setNewSubtask('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white/5 backdrop-blur-sm rounded-xl p-4 border transition-all duration-300",
        isSelected ? "border-purple-500/50" : "border-white/5 hover:border-purple-500/20"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {isBulkSelecting ? (
            <button
              onClick={() => onSelect?.(todo.id)}
              className={cn(
                "mt-1 w-5 h-5 rounded border transition-colors",
                isSelected
                  ? "bg-purple-500 border-purple-500"
                  : "border-gray-600 hover:border-purple-500"
              )}
            >
              {isSelected && (
                <svg className="w-4 h-4 mx-auto text-white" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                  />
                </svg>
              )}
            </button>
          ) : (
            <button
              onClick={() => onStatusChange(todo.id, 'done')}
              className="mt-1"
            >
              <CheckCircle2 className={cn(
                "w-5 h-5 transition-colors",
                todo.status === 'done' ? "text-green-500" : "text-gray-500 hover:text-gray-400"
              )} />
            </button>
          )}
          
          <div 
            className="flex-1 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {isEditing ? (
              <Input
                value={todo.title}
                onChange={(e) => onTitleChange(todo.id, e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                className="bg-transparent border-0 p-0 text-lg font-medium text-white focus-visible:ring-0"
                autoFocus
              />
            ) : (
              <h3 className="text-lg font-medium text-white font-[var(--font-inter)]">
                {todo.title}
              </h3>
            )}
            <p className="text-sm text-gray-400 mt-1 font-[var(--font-inter)]">{todo.description}</p>
            
            {todo.subtasks && isExpanded && (
              <div className="mt-2 space-y-1">
                {todo.subtasks.map(subtask => (
                  <div key={subtask.id} className="flex items-center space-x-2">
                    <button
                      onClick={() => onSubtaskToggle(todo.id, subtask.id)}
                      className={cn(
                        "w-4 h-4 rounded border transition-colors",
                        subtask.completed
                          ? "bg-purple-500 border-purple-500"
                          : "border-gray-600 hover:border-purple-500"
                      )}
                    >
                      {subtask.completed && (
                        <svg className="w-3 h-3 mx-auto text-white" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                          />
                        </svg>
                      )}
                    </button>
                    <span className="text-sm text-gray-300 font-[var(--font-inter)]">{subtask.title}</span>
                  </div>
                ))}
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubtaskAdd()}
                    placeholder="Add subtask..."
                    className="h-8 bg-gray-800/50 border-gray-700 text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSubtaskAdd}
                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Select
            value={todo.status}
            onValueChange={(value: 'pending' | 'in-progress' | 'done') => onStatusChange(todo.id, value)}
          >
            <SelectTrigger className="h-8 w-[120px] bg-gray-800/50 border-gray-700 text-xs text-gray-300 hover:bg-gray-700/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="pending" className="text-yellow-400 hover:bg-gray-800">Pending</SelectItem>
              <SelectItem value="in-progress" className="text-blue-400 hover:bg-gray-800">In Progress</SelectItem>
              <SelectItem value="done" className="text-green-400 hover:bg-gray-800">Done</SelectItem>
            </SelectContent>
          </Select>

          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 px-2 text-xs text-gray-300 hover:text-white hover:bg-gray-700/50"
              >
                <CalendarIcon className="w-4 h-4 mr-1" />
                {format(todo.deadline, 'MMM dd')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-900 border border-gray-700">
              <Calendar
                mode="single"
                selected={todo.deadline}
                onSelect={(date) => {
                  if (date) {
                    onDateChange(todo.id, date);
                    setIsCalendarOpen(false);
                  }
                }}
                className="rounded-md"
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-700/50"
          >
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform duration-200",
              isExpanded ? "rotate-180" : ""
            )} />
          </Button>

          {!isBulkSelecting && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(todo.id)}
              className="h-8 w-8 text-gray-300 hover:text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
} 