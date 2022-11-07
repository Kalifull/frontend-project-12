import React, { createContext, useMemo } from 'react';

export const ApiContext = createContext(null);

const ApiProvider = ({ children, socket }) => {
  const memoizedValue = useMemo(
    () => ({
      sendMessage: (message) => {
        socket.volatile.emit('newMessage', message, ({ status }) => {
          if (status !== 'ok') {
            throw new Error('Socket Error', status);
          }
        });
      },
      createChannel: (channel) => {
        socket.volatile.emit('newChannel', channel, ({ status }) => {
          if (status !== 'ok') {
            throw new Error('Socket Error', channel);
          }
        });
      },
      renameChannel: (channel) => {
        socket.volatile.emit('renameChannel', channel, ({ status }) => {
          if (status !== 'ok') {
            throw new Error('Socket Error', channel);
          }
        });
      },
      removeChannel: (channel) => {
        socket.volatile.emit('removeChannel', channel, ({ status }) => {
          if (status !== 'ok') {
            throw new Error('Socket Error', channel);
          }
        });
      },
    }),
    [socket.volatile],
  );

  return <ApiContext.Provider value={memoizedValue}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
