import { createSlice } from '@reduxjs/toolkit';

import { fetchData } from './channelsSlice.js';

export const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, { payload: { message } }) {
      state.messages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, { payload: { messages } }) => {
        state.messages = messages;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
