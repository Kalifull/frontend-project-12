import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import Channel from './Channel.jsx';
import { setCurrentChannel } from '../../store/slices/channelsSlice.js';
import { selectChannelsState } from '../../store/slices/selectors.js';
import { ReactComponent as GearIcon } from '../../assets/GearIcon.svg';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { channels, currentChannelId } = useSelector(selectChannelsState);

  const handleChooseChannel = (channelId) => () => {
    dispatch(setCurrentChannel({ channelId }));
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <Button type="button" variant="group-vertical" className="p-0 text-primary">
          <GearIcon />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelId}
            handleChoose={handleChooseChannel(channel.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default Channels;
