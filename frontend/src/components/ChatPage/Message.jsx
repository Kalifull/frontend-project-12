import cn from 'classnames';

import { useAuth } from '../../hooks/index.js';

const Message = ({ user, body, currentTime }) => {
  const { user: { username } } = useAuth();

  const classes = cn({
    'ms-auto': username === user,
    'bg-user': username === user,
    'bg-username': username !== user,
  });

  return (
    <div className={`text-break text-light mb-2 ${classes}`}>
      <p className="h6">{`${user}`}</p>
      <span>{body}</span>
      <span className="time ms-2">
        <small className="opacity-75">{currentTime}</small>
      </span>
    </div>
  );
};

export default Message;
