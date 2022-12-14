import * as yup from 'yup';
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useRollbar } from '@rollbar/react';
import leoProfanity from 'leo-profanity';

import getLogger from '../../lib/logger.js';
import { useApi, useAuth } from '../../hooks/index.js';
import { ReactComponent as ArrowRigthSquare } from '../../assets/ArrowRigthSquare.svg';

const MessageForm = ({ channel, messages }) => {
  const api = useApi();
  const { user: { username } } = useAuth();
  const inputRef = useRef(null);
  const logClient = getLogger('client');
  const { t } = useTranslation();
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current.focus();
  }, [channel, messages.length]);

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required('Required'),
  });

  const currentTime = new Date().toLocaleTimeString().slice(0, -3);

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema,
    onSubmit: async ({ body }) => {
      leoProfanity.getDictionary('ru');
      const filteredBody = leoProfanity.clean(body);
      const message = {
        body: filteredBody,
        channelId: channel.id,
        username,
        currentTime,
      };

      try {
        logClient('message.send');
        await api.sendMessage(message);
        formik.resetForm();
      } catch (error) {
        rollbar.error(error);
        logClient('message.send.error', error);
      }
      formik.setSubmitting(false);
      inputRef.current.focus();
    },
    validateOnBlur: false,
  });

  const isInvalid = !formik.dirty || !formik.isValid;

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="py-1">
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          className="input-text-color p-0 ps-2 border-0 rounded-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          value={formik.values.body}
          aria-label={t('chat.newMessage')}
          name="body"
          autoComplete="off"
          ref={inputRef}
          style={{ background: '#DCCAE9' }}
          placeholder={t('chat.placeholder')}
        />
        <Button
          className="ms-2 btn-dark rounded-2"
          variant="group-vertical"
          type="submit"
          disabled={isInvalid}
          size="lg"
          style={{ background: '#9932cc' }}
        >
          <ArrowRigthSquare />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
