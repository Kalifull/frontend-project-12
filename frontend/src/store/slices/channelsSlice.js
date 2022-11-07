import { createSlice } from '@reduxjs/toolkit';

import fetchData from '../../services/fetchData.js';

const defaultChannelId = 1;

const initialState = {
  channels: [],
  currentChannelId: defaultChannelId,
};

export const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    addChannel(state, { payload: { channel } }) {
      state.channels.push(channel);
    },
    removeChannel(state, { payload: { channelId } }) {
      state.channels = state.channels.filter(({ id }) => id !== channelId);
      if (state.currentChannelId === channelId) {
        state.currentChannelId = defaultChannelId;
      }
    },
    renameChannel(state, { payload: { channelId, channelName } }) {
      const channel = state.channels.find(({ id }) => id === channelId);
      channel.name = channelName;
    },
    setCurrentChannel(state, { payload: { channelId } }) {
      state.currentChannelId = channelId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, { payload: { channels, currentChannelId } }) => {
        state.channels = channels;
        state.currentChannelId = currentChannelId;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const {
  addChannel, removeChannel, renameChannel, setCurrentChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
