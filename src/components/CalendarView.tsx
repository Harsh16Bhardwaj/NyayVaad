'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

interface CalendarViewProps {
  isOpen: boolean;
  onClose: () => void;
  events: Array<{
    id: string;
    title: string;
    date: Date;
    type: 'task' | 'hearing' | 'deadline';
  }>;
}

const CalendarView = ({ isOpen, onClose, events }: CalendarViewProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Get events for the selected date
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const selectedDateEvents = getEventsForDate(date);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#1b0020] rounded-2xl shadow-2xl border border-purple-500/20 p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white font-[var(--font-playfair)]">
                Case Calendar
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Calendar */}
              <div className="bg-white/5 rounded-xl p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="text-white"
                  modifiers={{
                    event: (date) => getEventsForDate(date).length > 0,
                  }}
                  modifiersStyles={{
                    event: {
                      fontWeight: 'bold',
                      color: 'rgb(168, 85, 247)', // Purple
                      textDecoration: 'underline',
                    },
                  }}
                />
              </div>

              {/* Events List */}
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-4 font-[var(--font-playfair)]">
                  Events for {date?.toLocaleDateString()}
                </h3>
                <div className="space-y-3">
                  {selectedDateEvents.length > 0 ? (
                    selectedDateEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-white/10 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{event.title}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            event.type === 'hearing' ? 'bg-purple-500/20 text-purple-300' :
                            event.type === 'deadline' ? 'bg-red-500/20 text-red-300' :
                            'bg-blue-500/20 text-blue-300'
                          }`}>
                            {event.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">No events for this date</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalendarView; 