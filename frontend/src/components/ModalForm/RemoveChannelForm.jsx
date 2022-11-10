import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';

import getLogger from '../../lib/logger.js';
import { useApi } from '../../hooks/index.js';
import { selectModalState } from '../../store/slices/selectors.js';

const RemoveChannelForm = ({ handleClose }) => {
  const api = useApi();
  const logClient = getLogger('client');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const { channelId } = useSelector(selectModalState).channelId;

  const handleRemove = async () => {
    setLoadingStatus(true);
    try {
      logClient('channel.delete');
      await api.removeChannel({ id: channelId });
      toast.success(t('channels.removed'));
      handleClose();
    } catch (error) {
      rollbar.error(error);
      logClient('channel.remove.error', error);
      setLoadingStatus(false);
    }
  };

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.remove')}</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="primary"
            type="button"
            onClick={handleClose}
            disabled={loadingStatus}
          >
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" onClick={handleRemove} type="button" disabled={loadingStatus}>
            {t('modals.confirm')}
          </Button>
        </div>
      </BootstrapModal.Body>
    </>
  );
};
export default RemoveChannelForm;
