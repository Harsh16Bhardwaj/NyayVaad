import { configureStore } from '@reduxjs/toolkit';
import caseReducer from './slices/caseSlice';
import todoReducer from './slices/todoSlice';
import caseSummaryReducer from './slices/caseSummarySlice';
import chatSessionsReducer from './slices/chatSessionsSlice';
import chatMessagesReducer from './slices/chatMessagesSlice';

export const store = configureStore({
  reducer: {
    cases: caseReducer,
    todos: todoReducer,
    caseSummary: caseSummaryReducer,
    chatSessions: chatSessionsReducer,
    chatMessages: chatMessagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 