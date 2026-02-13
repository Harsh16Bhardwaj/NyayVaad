import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from '@/types/case';

interface ChatMessagesState {
  // Messages grouped by sessionId
  messagesBySession: Record<string, {
    messages: ChatMessage[];
    lastSynced: number | null; // timestamp
    hasUnsyncedChanges: boolean;
  }>;
  loading: boolean;
  error: string | null;
}

const initialState: ChatMessagesState = {
  messagesBySession: {},
  loading: false,
  error: null,
};

// localStorage key
const MESSAGES_STORAGE_KEY = 'nyaayvaad_chat_messages';

// Helper functions for localStorage
const loadMessagesFromLocalStorage = (): Record<string, { messages: ChatMessage[]; lastSynced: number | null; hasUnsyncedChanges: boolean }> | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading messages from localStorage:', error);
    return null;
  }
};

const saveMessagesToLocalStorage = (messagesBySession: Record<string, { messages: ChatMessage[]; lastSynced: number | null; hasUnsyncedChanges: boolean }>) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messagesBySession));
  } catch (error) {
    console.error('Error saving messages to localStorage:', error);
  }
};

const clearMessagesFromLocalStorage = () => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(MESSAGES_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing messages from localStorage:', error);
  }
};

const chatMessagesSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    // Load messages from localStorage on app start
    loadMessagesFromStorage: (state) => {
      const stored = loadMessagesFromLocalStorage();
      if (stored) {
        state.messagesBySession = stored;
      }
    },

    // Set messages for a specific session
    setSessionMessages: (state, action: PayloadAction<{ sessionId: string; messages: ChatMessage[] }>) => {
      const { sessionId, messages } = action.payload;
      state.messagesBySession[sessionId] = {
        messages,
        lastSynced: null,
        hasUnsyncedChanges: false,
      };
      saveMessagesToLocalStorage(state.messagesBySession);
    },

    // Add a message to a session
    addMessage: (state, action: PayloadAction<{ sessionId: string; message: ChatMessage }>) => {
      const { sessionId, message } = action.payload;
      
      if (!state.messagesBySession[sessionId]) {
        state.messagesBySession[sessionId] = {
          messages: [],
          lastSynced: null,
          hasUnsyncedChanges: true,
        };
      }
      
      state.messagesBySession[sessionId].messages.push(message);
      state.messagesBySession[sessionId].hasUnsyncedChanges = true;
      
      saveMessagesToLocalStorage(state.messagesBySession);
    },

    // Update multiple messages at once
    updateMessages: (state, action: PayloadAction<{ sessionId: string; messages: ChatMessage[] }>) => {
      const { sessionId, messages } = action.payload;
      
      if (!state.messagesBySession[sessionId]) {
        state.messagesBySession[sessionId] = {
          messages: [],
          lastSynced: null,
          hasUnsyncedChanges: true,
        };
      }
      
      state.messagesBySession[sessionId].messages = messages;
      state.messagesBySession[sessionId].hasUnsyncedChanges = true;
      
      saveMessagesToLocalStorage(state.messagesBySession);
    },

    // Mark session as synced
    markSessionSynced: (state, action: PayloadAction<string>) => {
      const sessionId = action.payload;
      if (state.messagesBySession[sessionId]) {
        state.messagesBySession[sessionId].lastSynced = Date.now();
        state.messagesBySession[sessionId].hasUnsyncedChanges = false;
      }
    },

    // Clear synced data from localStorage but keep in Redux
    clearSyncedFromStorage: (state) => {
      // Only clear messages that have been synced
      const hasUnsyncedData = Object.values(state.messagesBySession).some(
        session => session.hasUnsyncedChanges
      );
      
      if (!hasUnsyncedData) {
        clearMessagesFromLocalStorage();
      }
    },

    // Clear all messages
    clearAllMessages: (state) => {
      state.messagesBySession = {};
      clearMessagesFromLocalStorage();
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  loadMessagesFromStorage,
  setSessionMessages,
  addMessage,
  updateMessages,
  markSessionSynced,
  clearSyncedFromStorage,
  clearAllMessages,
  setLoading,
  setError,
} = chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;
