import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Calendar as CalendarIcon,
  Plus,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    status: "pending" | "ongoing" | "done";
    subtasks?: {
      id: string;
      title: string;
      description: string;
      completed: boolean;
    }[];
  };
  onStatusChange: (id: string, status: "pending" | "ongoing" | "done") => void;
  onDateChange: (id: string, date: Date) => void;
  onTitleChange: (id: string, title: string) => void;
  onSubtaskToggle: (todoId: string, subtaskId: string) => void;
  onSubtaskAdd: (todoId: string, title: string) => void;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  isBulkSelecting?: boolean;
}

// Extract SubtaskList component
const SubtaskList = memo(({ 
  subtasks, 
  onToggle, 
  todoId 
}: { 
  subtasks: { id: string; title: string; completed: boolean }[]; 
  onToggle: (subtaskId: string) => void;
  todoId: string;
}) => {
  return (
    <div className="mt-2 space-y-1">
      {subtasks?.map((subtask) => (
        <div
          key={subtask.id}
          className="flex items-center gap-2 text-sm text-gray-600"
        >
          <input
            type="checkbox"
            checked={subtask.completed}
            onChange={() => onToggle(subtask.id)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className={cn(subtask.completed && "line-through")}>
            {subtask.title}
          </span>
        </div>
      ))}
    </div>
  );
});

SubtaskList.displayName = 'SubtaskList';

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
  isBulkSelecting,
}: TodoItemProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-400",
    ongoing: "bg-blue-500/20 text-blue-400",
    done: "bg-green-500/20 text-green-400",
  };

  // Memoize handlers
  const handleSubtaskAdd = useCallback(() => {
    if (newSubtaskTitle.trim()) {
      onSubtaskAdd(todo.id, newSubtaskTitle);
      setNewSubtaskTitle("");
    }
  }, [newSubtaskTitle, todo.id, onSubtaskAdd]);

  const handleItemClick = useCallback((e: React.MouseEvent) => {
    if (isBulkSelecting && onSelect) {
      e.stopPropagation();
      onSelect(todo.id);
    }
  }, [isBulkSelecting, onSelect, todo.id]);

  const handleTitleClick = useCallback((e: React.MouseEvent) => {
    if (!isBulkSelecting) {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    }
  }, [isBulkSelecting, isExpanded]);

  const handleSubtaskToggle = useCallback((subtaskId: string) => {
    onSubtaskToggle(todo.id, subtaskId);
  }, [todo.id, onSubtaskToggle]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={handleItemClick}
      className={cn(
        "bg-white/5 backdrop-blur-sm rounded-xl p-4 border transition-all duration-300",
        isSelected
          ? "border-purple-500/50"
          : "border-white/5 hover:border-purple-500/20",
        isBulkSelecting ? "cursor-pointer" : "cursor-default"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {isBulkSelecting ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(todo.id);
              }}
              className={cn(
                "mt-1 w-5 h-5 rounded border-2 transition-colors",
                isSelected
                  ? "bg-purple-500 border-purple-500"
                  : "border-gray-600 border-2 hover:border-purple-600"
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
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(todo.id, "done");
              }}
              className="mt-1"
            >
              <CheckCircle2
                className={`
                  w-5 h-5 transition-colors
                  ${todo.status === "done" ? "text-green-500" : ""}
                  ${todo.status === "ongoing" ? "text-blue-500" : ""}
                  ${todo.status === "pending" ? "text-yellow-500" : ""}
                `}
              />
            </button>
          )}

          <div className="flex-1" onClick={handleTitleClick}>
            {isEditing && !isBulkSelecting ? (
              <Input
                value={todo.title}
                onChange={(e) => onTitleChange(todo.id, e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
                className="bg-transparent border-0 p-0 text-lg font-medium text-white focus-visible:ring-0"
                autoFocus
              />
            ) : (
              <h3 className="text-lg font-medium text-white font-[var(--font-inter)]">
                {todo.title}
              </h3>
            )}
            <p className="text-sm text-gray-400 mt-1 font-[var(--font-inter)]">
              {todo.description}
            </p>

            {todo.subtasks && isExpanded && (
              <SubtaskList
                subtasks={todo.subtasks}
                onToggle={handleSubtaskToggle}
                todoId={todo.id}
              />
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {!isBulkSelecting && (
            <>
              <Select
                value={todo.status}
                onValueChange={(value: "pending" | "ongoing" | "done") =>
                  onStatusChange(todo.id, value)
                }
              >
                <SelectTrigger className="h-8 w-[120px] cursor-pointer bg-gray-800/50 border-gray-700 text-xs text-gray-300 hover:bg-gray-700/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem
                    value="pending"
                    className="text-yellow-400 hover:bg-gray-800"
                  >
                    Pending
                  </SelectItem>
                  <SelectItem
                    value="ongoing"
                    className="text-blue-400 hover:bg-gray-800"
                  >
                    Ongoing
                  </SelectItem>
                  <SelectItem
                    value="done"
                    className="text-green-400 hover:bg-gray-800"
                  >
                    Done
                  </SelectItem>
                </SelectContent>
              </Select>

              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 px-2 border border-gray-700 cursor-pointer text-xs text-gray-300 hover:text-white hover:bg-gray-700/50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {format(todo.deadline, "MMM dd")}
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
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-700/50"
              >
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isExpanded ? "rotate-180" : ""
                  )}
                />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(todo.id);
                }}
                className="h-8 w-8 cursor-pointer text-gray-300 hover:text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}