import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';

import { ReactComponent as GearIcon } from '../../assets/images/GearIcon.svg';
import { setCurrentChannel } from '../../store/slices/channelsSlice.js';
import { getChannelsState } from '../../store/slices/selectors.js';

const Channel = ({ channel, isCurrent, handleChoose }) => {
  const variant = isCurrent ? 'secondary' : null;
  const { t } = useTranslation();

  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            type="button"
            key={channel.id}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={handleChoose}
            variant={variant}
          >
            <span className="me-1">{`# ${channel.name}`}</span>
          </Button>
          <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
            <span className="visually-hidden">{t('channels.menu')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>{t('channels.remove')}</Dropdown.Item>
            <Dropdown.Item>{t('channels.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          type="button"
          variant={variant}
          key={channel.id}
          className="w-100 rounded-0 text-start"
          onClick={handleChoose}
        >
          <span className="me-1">{`# ${channel.name}`}</span>
        </Button>
      )}
    </li>
  );
};

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { channels, currentChannelId } = useSelector(getChannelsState);

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
