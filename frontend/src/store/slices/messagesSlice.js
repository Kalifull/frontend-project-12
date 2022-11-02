import { createSlice } from '@reduxjs/toolkit';

import { fetchData } from './channelsSlice.js';

export const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [
      // Для тестирования - раскомментировать
      // {
      //   body: 'Привет, как дела? Я вот заебок)',
      //   channelId: 1,
      //   username: 'admin',
      //   id: 3,
      // },
      // {
      //   body: 'привет. да нормально!',
      //   channelId: 1,
      //   username: 'дима',
      //   id: 4,
      // },
      // {
      //   body: 'пойдем пить пиво, черти',
      //   channelId: 1,
      //   username: 'Андрей',
      //   id: 5,
      // },
    ],
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
        state.messages = [...state.messages, messages];
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
