import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import caseSummaryReducer from './slices/caseSummarySlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    caseSummary: caseSummaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 