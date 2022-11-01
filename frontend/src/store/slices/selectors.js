export const getChannelsState = (state) => state.channelsInfo;

export const getCurrentChannel = (state) => {
  const { channels, currentChannelId } = state.channelsInfo;
  return channels.find(({ id }) => id === currentChannelId);
};

export const getMessagesForCurrentChannel = (state) => {
  const { currentChannelId } = state.channelsInfo;
  const { messages } = state.messagesInfo;
  return messages.filter(({ channelId }) => channelId === currentChannelId);
};
