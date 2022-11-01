import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

import { fetchData } from '../../store/slices/channelsSlice.js';
import { getChannelsState } from '../../store/slices/selectors.js';
import useAuth from '../../hooks/useAuth.jsx';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import routes from '../../utils/routes.js';

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { loadingStatus } = useSelector(getChannelsState);

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
  }, [auth, dispatch, navigate, t]);

  return loadingStatus === 'loading' ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{t('loading')}</span>
      </Spinner>
    </div>
  ) : (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <Channels />
        </div>
        <div className="col p-0 h-100">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;