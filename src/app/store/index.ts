import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import caseSummaryReducer from './slices/caseSummarySlice';
import chatSessionsReducer from './slices/chatSessionsSlice';

const rootReducer = combineReducers({
  todos: todoReducer,
  caseSummary: caseSummaryReducer,
  chatSessions: chatSessionsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default rootReducer; 