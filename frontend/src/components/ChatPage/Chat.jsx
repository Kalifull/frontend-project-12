/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

import { useAuth } from '../../hooks/index.js';
import fetchData from '../../services/fetchData.js';
import { selectChannelsState } from '../../store/slices/selectors.js';
import Modal from './Modal.jsx';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import routes from '../../utils/routes.js';

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { loadingStatus } = useSelector(selectChannelsState);
  const loading = loadingStatus === 'loading';

  useEffect(() => {
    try {
      dispatch(fetchData(auth.getAuthHeader()));
    } catch (error) {
      if (!error.isAxiosError) {
        toast.error(t('errors.unknown'));
        return;
      }

      if (error.response?.status === 401) {
        navigate(routes.loginPagePath());
      } else {
        toast.error(t('errors.network'));
      }
    }
  }, [auth, dispatch, navigate]);

  return loading ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{t('loading')}</span>
      </Spinner>
    </div>
  ) : (
    <>
      <Modal />
      <div className="container h-100 my-4 overflow-hidden rounded-4 shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <Channels />
          </div>
          <div className="col p-0 h-100">
            <Messages />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
