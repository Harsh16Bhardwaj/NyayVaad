import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CaseData } from '@/types/case';

interface CaseState {
  cases: CaseData[];
  currentCase: CaseData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CaseState = {
  cases: [],
  currentCase: null,
  loading: false,
  error: null,
};

export const fetchCases = createAsyncThunk(
  'cases/fetchCases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/cases');
      if (!response.ok) {
        throw new Error('Failed to fetch cases');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch cases');
    }
  }
);

export const fetchCaseById = createAsyncThunk(
  'cases/fetchCaseById',
  async (caseId: string) => {
    const response = await fetch(`/api/cases/${caseId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch case');
    }
    return response.json();
  }
);

const caseSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cases
      .addCase(fetchCases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.loading = false;
        state.cases = action.payload;
      })
      .addCase(fetchCases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Case by ID
      .addCase(fetchCaseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCase = action.payload;
      })
      .addCase(fetchCaseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch case';
      });
  },
});

export default caseSlice.reducer; 