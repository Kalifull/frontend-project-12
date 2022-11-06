export const selectChannelsState = (state) => state.channelsInfo;

export const selectModalState = (state) => state.modalInfo;

export const selectCurrentChannel = (state) => {
  const { channels, currentChannelId } = state.channelsInfo;
  return channels.find(({ id }) => id === currentChannelId);
};

export const selectMessagesForCurrentChannel = (state) => {
  const { currentChannelId } = state.channelsInfo;
  const { messages } = state.messagesInfo;
  return messages.filter(({ channelId }) => channelId === currentChannelId);
};

export const selectChannelsName = (state) => {
  const { channels } = state.channelsInfo;
  return channels.map(({ name }) => name);
};
