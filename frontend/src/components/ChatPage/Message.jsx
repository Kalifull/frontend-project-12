import cn from 'classnames';

import { useAuth } from '../../hooks/index.js';

const Message = ({ user, body }) => {
  const { user: { username } } = useAuth();

  const classes = cn({
    'ms-auto': username === user,
    'bg-user': username === user,
    'bg-username': username !== user,
  });

  return (
    <div className={`text-break text-light mb-2 ${classes}`}>
      <b>{user}</b>
      {': '}
      <br />
      {body}
    </div>
  );
};

export default Message;
