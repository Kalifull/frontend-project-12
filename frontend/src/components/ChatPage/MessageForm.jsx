import * as yup from 'yup';
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form, Button, InputGroup } from 'react-bootstrap';

import getLogger from '../../lib/logger.js';
import { useApi, useAuth } from '../../hooks/index.js';
import { ReactComponent as ArrowRigthSquare } from '../../assets/ArrowRigthSquare.svg';

const MessageForm = ({ channel }) => {
  const api = useApi();
  const { user: { username } } = useAuth();
  const inputRef = useRef();
  const logClient = getLogger('client');
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, [channel]);

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required('Required'),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema,
    onSubmit: async ({ body }) => {
      const message = {
        body,
        channelId: channel.id,
        username,
      };

      try {
        logClient('message.send');
        await api.sendMessage(message);
        formik.resetForm();
      } catch (error) {
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
          className="p-0 ps-2 text-secondary shadow-none border-0 rounded-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          value={formik.values.body}
          aria-label={t('chat.newMessage')}
          name="body"
          autoComplete="off"
          ref={inputRef}
          style={{ background: '#000000' }}
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
