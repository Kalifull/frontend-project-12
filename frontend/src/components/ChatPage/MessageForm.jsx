import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ArrowRigthSquare } from '../../assets/images/ArrowRigthSquare.svg';

const MessageForm = ({ channel }) => {
  const { t } = useTranslation();
  console.log(channel);

  return (
    <Form noValidate className="py-1">
      <InputGroup>
        <Form.Control
          className="border-0 p-0 ps-2 text-secondary shadow-none"
          type="text"
          name="body"
          aria-label="Новое сообщение"
          placeholder={t('chat.placeholder')}
          autoComplete="off"
          style={{ background: '#000000' }}
        />
        <Button
          size="lg"
          variant="group-vertical"
          type="submit"
          className="btn-dark"
          style={{ background: '#9932cc' }}
        >
          <ArrowRigthSquare />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
