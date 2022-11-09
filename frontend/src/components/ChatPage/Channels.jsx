import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import { Button } from 'react-bootstrap';

import Channel from './Channel.jsx';
import { openModal } from '../../store/slices/modalSlice.js';
import { setCurrentChannel } from '../../store/slices/channelsSlice.js';
import { selectChannelsState } from '../../store/slices/selectors.js';
import { ReactComponent as GearIcon } from '../../assets/GearIcon.svg';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { channels, currentChannelId } = useSelector(selectChannelsState);

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'channels-box',
      delay: 0,
      duration: 0,
    });
  }, [channels.length]);

  const handleChooseChannel = (channelId) => () => {
    dispatch(setCurrentChannel({ channelId }));
  };

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  const handleRenameChannel = (channelId) => () => {
    dispatch(openModal({ type: 'renameChannel', channelId: { channelId } }));
  };

  const handleRemoveChannel = (channelId) => () => {
    dispatch(openModal({ type: 'removeChannel', channelId: { channelId } }));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <Button
          type="button"
          variant="group-vertical"
          onClick={handleAddChannel}
          className="p-0 text-primary"
        >
          <GearIcon />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <div id="channels-box" className="overflow-auto" style={{ height: '95%' }}>
        <ul className="nav flex-column nav-pills nav-fill px-2">
          {channels.map((channel) => (
            <Channel
              key={channel.id}
              channel={channel}
              isCurrent={channel.id === currentChannelId}
              handleChoose={handleChooseChannel(channel.id)}
              handleRename={handleRenameChannel}
              handleRemove={handleRemoveChannel}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Channels;
