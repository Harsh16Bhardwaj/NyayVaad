import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface EditFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldName: string;
  currentValue: string | null;
  onSave: (value: string) => void;
}

export default function EditFieldModal({ isOpen, onClose, fieldName, currentValue, onSave }: EditFieldModalProps) {
  const [value, setValue] = useState(currentValue || '');

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-purple-500/20"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white ">
                Edit {fieldName.replace(/_/g, ' '.toLocaleUpperCase())}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 cursor-pointer hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 ">
                  Content
                </label>
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none font-[var(--font-inter)]"
                  rows={5}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-300 hover:text-white transition-colors font-[var(--font-space)]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-[var(--font-space)]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 