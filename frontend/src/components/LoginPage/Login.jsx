import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/index.js';
import routes from '../../utils/routes.js';

import avatarImages from '../../assets/images/avatarImages.jpg';

const Login = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (initialValues) => {
      setAuthFailed(false);

      try {
        const { data } = await axios.post(routes.loginPath(), initialValues);
        auth.logIn(data);
        const { from } = location.state || { from: { pathname: routes.chatPagePath() } };
        navigate(from);
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        if (error.response?.status === 401) {
          setAuthFailed(true);
          inputRef.current.focus();
        } else {
          toast.error(t('errors.network'));
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={avatarImages}
                  width="350"
                  height="300"
                  className="rounded-circle"
                  alt={t('login.header')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.header')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                      placeholder={t('login.username')}
                    />
                    <label htmlFor="username">{t('login.username')}</label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      isInvalid={authFailed}
                      required
                      placeholder={t('login.password')}
                    />
                    <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                    {authFailed && (
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t('login.authFailed')}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Button type="submit" variant="dark" className="w-100 mb-3">
                    {t('login.submit')}
                  </Button>
                </fieldset>
              </Form>
            </div>
            <div className="card-footer p-4 bg-dark">
              <div className="text-center text-white">
                <span>{t('login.newToChat')}</span>
                <Link to={routes.signupPagePath()} className="text-white">
                  {t('login.signup')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
