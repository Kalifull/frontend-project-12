import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getCurrentChannel, getMessagesForCurrentChannel } from '../../store/slices/selectors.js';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

const Messages = () => {
  const channel = useSelector(getCurrentChannel);
  const messages = useSelector(getMessagesForCurrentChannel);
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${channel?.name}`}</b>
        </p>
        <span className="text-muted">
          {`${t('chat.messageCount', { count: messages.length })}`}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messages.map(({ id, username, body }) => (
          <Message key={id} username={username} body={body} />
        ))}
      </div>
      <div className="mt-auto px-5 py-3" />
    </div>
  );
};

export default Messages;