import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useAuth from '../../hooks/useAuth.jsx';
import { getCurrentChannel, getMessagesForCurrentChannel } from '../../store/slices/selectors.js';
import MessageForm from './MessageForm.jsx';

const Message = ({ user, body }) => {
  const { user: { username } } = useAuth();

  return (
    <div
      className="text-break text-light mb-2"
      style={{
        marginLeft: username === user ? 'auto' : null,
        backgroundColor: username === user ? '#9932cc' : '#2d102c',
      }}
    >
      <b>{user}</b>
      {': '}
      <br />
      {body}
    </div>
  );
};

const Messages = () => {
  const channel = useSelector(getCurrentChannel);
  const messages = useSelector(getMessagesForCurrentChannel);
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
        <div id="messages-box" className="chat-messages overflow-hidden px-5">
          {messages.map(({ id, username, body }) => (
            <Message key={id} user={username} body={body} />
          ))}
        </div>
      ) : (
        <div className="d-flex h-100 d-flex align-items-center justify-content-center text-light">
          {t('chat.notFoundMessage')}
        </div>
      )}
      <div className="mt-auto px-5 py-3">
        <MessageForm />
      </div>
    </div>
  );
};

export default Messages;
