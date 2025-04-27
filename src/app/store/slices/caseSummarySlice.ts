import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface CaseSummary {
  id: string;
  title: string;
  date: Date;
  summary: string;
  legalPoints: string[];
  fields: string[];
  advice: string[];
  nextSteps: string[];
}

interface CaseSummaryState {
  summary: CaseSummary | null;
  loading: boolean;
  error: string | null;
}

const initialState: CaseSummaryState = {
  summary: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchCaseSummary = createAsyncThunk(
  'caseSummary/fetchCaseSummary',
  async () => {
    const response = await fetch('/api/case-summary');
    if (!response.ok) throw new Error('Failed to fetch case summary');
    return response.json();
  }
);

export const updateCaseSummary = createAsyncThunk(
  'caseSummary/updateCaseSummary',
  async (summary: CaseSummary) => {
    const response = await fetch('/api/case-summary', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(summary),
    });
    if (!response.ok) throw new Error('Failed to update case summary');
    return response.json();
  }
);

const caseSummarySlice = createSlice({
  name: 'caseSummary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Case Summary
      .addCase(fetchCaseSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCaseSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchCaseSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch case summary';
      })
      // Update Case Summary
      .addCase(updateCaseSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      });
  },
});

export default caseSummarySlice.reducer; 