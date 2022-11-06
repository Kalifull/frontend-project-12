import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';

import AddChannelForm from '../ModalForm/AddChannelForm.jsx';
import { closeModal } from '../../store/slices/modalSlice.js';
import { selectModalState } from '../../store/slices/selectors.js';

const mapping = {
  addChannel: AddChannelForm,
};

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpened, type } = useSelector(selectModalState);

  const Component = mapping[type];

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <BootstrapModal show={isOpened} onHide={handleClose} centered>
      {Component && <Component handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;
