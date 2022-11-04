import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Message from './Message.jsx';
import MessageForm from './MessageForm.jsx';
import { selectCurrentChannel, selectMessagesForCurrentChannel } from '../../store/slices/selectors.js';

const Messages = () => {
  const channel = useSelector(selectCurrentChannel);
  const messages = useSelector(selectMessagesForCurrentChannel);
  const { t } = useTranslation();

  return (
    <div className="chat-theme d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${channel?.name}`}</b>
        </p>
        <span className="text-muted">
          {`${t('chat.messageCount', { count: messages.length })}`}
        </span>
      </div>
      {messages.length ? (
        <div id="messages-box" className="messages-box overflow-hidden px-5">
          {messages.map(({ id, username, body }) => (
            <Message key={id} user={username} body={body} />
          ))}
        </div>
      ) : (
        <div className="d-flex h-100 d-flex align-items-center justify-content-center text-light">
          {t('chat.notFoundMessage')}
        </div>
      )}
      <div className="message-form mt-auto px-5 py-3">
        <MessageForm channel={channel} />
      </div>
    </div>
  );
};

export default Messages;
