import { useTranslation } from 'react-i18next';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';

const Channel = ({
  channel, isCurrent, handleChoose, handleRename, handleRemove,
}) => {
  const variant = isCurrent ? 'dark' : null;
  const { t } = useTranslation();

  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className="d-flex mb-1">
          <Button
            type="button"
            key={channel.id}
            className="w-100 text-start text-truncate"
            onClick={handleChoose}
            variant={variant}
          >
            <span className="me-1">{`# ${channel.name}`}</span>
          </Button>
          <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
            <span className="visually-hidden">{t('channels.menu')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRename(channel.id)}>{t('channels.rename')}</Dropdown.Item>
            <Dropdown.Item onClick={handleRemove(channel.id)}>{t('channels.remove')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          type="button"
          variant={variant}
          key={channel.id}
          className="w-100 mb-1 text-start"
          onClick={handleChoose}
        >
          <span className="me-1">{`# ${channel.name}`}</span>
        </Button>
      )}
    </li>
  );
};

export default Channel;
