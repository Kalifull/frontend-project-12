import * as yup from 'yup';
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

import getLogger from '../../lib/logger.js';
import { useApi } from '../../hooks/index.js';
import {
  selectChannelsName,
  selectModalState,
  selectChannelById,
} from '../../store/slices/selectors.js';

const RenameChannelForm = ({ handleClose }) => {
  const api = useApi();
  const inputRef = useRef();
  const logClient = getLogger('client');
  const { t } = useTranslation();

  const channels = useSelector(selectChannelsName);
  const { channelId } = useSelector(selectModalState).channelId;
  const channel = useSelector(selectChannelById(channelId));

  useEffect(() => {
    setTimeout(() => inputRef.current.focus());
  }, []);

  const validationSchema = yup.object().shape({
    channelsName: yup
      .string()
      .trim()
      .required('modals.required')
      .min(3, 'modals.min')
      .max(20, 'modals.max')
      .notOneOf(channels, 'modals.uniq'),
  });

  const formik = useFormik({
    initialValues: {
      channelsName: channel.name,
    },
    validationSchema,
    onSubmit: async ({ channelsName }, actions) => {
      leoProfanity.getDictionary('ru');
      const filteredName = leoProfanity.clean(channelsName);

      try {
        api.renameChannel({ id: channelId, name: filteredName });
        toast.success(t('channels.renamed'));
        handleClose();
      } catch (error) {
        logClient('channel.rename.error', error);
        actions.setSubmitting(false);
        inputRef.current.focus();
        if (!error.isAxiosError) {
          throw error;
        }
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.rename')}</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-3"
              disabled={formik.isSubmitting}
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channelsName}
              isInvalid={formik.errors.channelsName && formik.touched.channelsName}
              name="channelsName"
              id="channelsName"
            />
            <label className="visually-hidden" htmlFor="name">
              {t('modals.channelName')}
            </label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.channelsName)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="danger" type="button" onClick={handleClose}>
                {t('modals.cancel')}
              </Button>
              <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

export default RenameChannelForm;
