import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatSession {
  sessionId: string;
  title: string; // Derived from case or first message, not stored in Session table
  description: string; // Derived from case or message count, not stored in Session table
  createdAt?: string;
}

interface ChatSessionsState {
  sessions: ChatSession[] | null;
  loading: boolean;
  error: string | null;
  lastSynced: number | null; // timestamp of last successful sync with DB
  hasUnsyncedChanges: boolean; // flag to track if there are changes that need syncing
}

const initialState: ChatSessionsState = {
  sessions: null, // null means not loaded yet
  loading: false,
  error: null,
  lastSynced: null,
  hasUnsyncedChanges: false,
};

// localStorage key
const STORAGE_KEY = 'nyaayvaad_chat_sessions';

// Helper functions for localStorage
const loadFromLocalStorage = (): ChatSession[] | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading sessions from localStorage:', error);
    return null;
  }
};

const saveToLocalStorage = (sessions: ChatSession[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('Error saving sessions to localStorage:', error);
  }
};

const clearSessionsFromLocalStorage = () => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing sessions from localStorage:', error);
  }
};

const chatSessionsSlice = createSlice({
  name: 'chatSessions',
  initialState,
  reducers: {
    // Load sessions from localStorage or API
    setChatSessions: (state, action: PayloadAction<ChatSession[]>) => {
      state.sessions = action.payload;
      state.loading = false;
      state.error = null;
      state.hasUnsyncedChanges = false;
      // Sync to localStorage
      saveToLocalStorage(action.payload);
    },
    
    // Add a new session (when user starts a new chat)
    addChatSession: (state, action: PayloadAction<ChatSession>) => {
      const newSession = {
        ...action.payload,
        createdAt: action.payload.createdAt || new Date().toISOString(),
      };
      
      if (!state.sessions) {
        state.sessions = [newSession];
      } else {
        // Check if session already exists
        const exists = state.sessions.some(s => s.sessionId === newSession.sessionId);
        if (!exists) {
          state.sessions = [newSession, ...state.sessions];
        }
      }
      
      state.hasUnsyncedChanges = true;
      
      // Sync to localStorage
      if (state.sessions) {
        saveToLocalStorage(state.sessions);
      }
    },
    
    // Update existing session (e.g., update title/description after first message)
    updateChatSession: (state, action: PayloadAction<{ sessionId: string; updates: Partial<ChatSession> }>) => {
      const { sessionId, updates } = action.payload;
      
      if (state.sessions) {
        const index = state.sessions.findIndex(s => s.sessionId === sessionId);
        if (index !== -1) {
          state.sessions[index] = {
            ...state.sessions[index],
            ...updates,
          };
          state.hasUnsyncedChanges = true;
          // Sync to localStorage
          saveToLocalStorage(state.sessions);
        }
      }
    },
    
    // Load sessions from localStorage on app start
    loadSessionsFromStorage: (state) => {
      const stored = loadFromLocalStorage();
      if (stored && stored.length > 0) {
        state.sessions = stored;
      }
    },
    
    // Clear all sessions
    clearSessions: (state) => {
      state.sessions = null;
      state.error = null;
      state.hasUnsyncedChanges = false;
      state.lastSynced = null;
      // Clear localStorage
      clearSessionsFromLocalStorage();
    },

    // Mark sessions as synced with DB
    markSessionsSynced: (state) => {
      state.lastSynced = Date.now();
      state.hasUnsyncedChanges = false;
    },

    // Clear synced data from localStorage but keep in Redux
    clearSyncedSessionsFromStorage: (state) => {
      if (!state.hasUnsyncedChanges) {
        clearSessionsFromLocalStorage();
      }
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
  setChatSessions, 
  addChatSession, 
  updateChatSession,
  loadSessionsFromStorage,
  clearSessions,
  markSessionsSynced,
  clearSyncedSessionsFromStorage,
  setLoading,
  setError,
} = chatSessionsSlice.actions;

export default chatSessionsSlice.reducer;
