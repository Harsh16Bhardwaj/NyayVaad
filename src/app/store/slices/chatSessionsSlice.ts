import { createSlice } from '@reduxjs/toolkit';

const chatSessionsSlice = createSlice({
  name: 'chatSessions',
  initialState: {
    sessions: null, // null means not loaded yet
  },
  reducers: {
    setChatSessions: (state, action) => {
      state.sessions = action.payload;
    },
  },
});

export const { setChatSessions } = chatSessionsSlice.actions;
export default chatSessionsSlice.reducer;
