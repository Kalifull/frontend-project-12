import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import 'flag-icon-css/css/flag-icons.min.css';
import logo from '../../assets/images/logo.png';
import routes from '../../utils/routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="text-center">
      <Image className="img-fluid" src={logo} alt={t('notFoundPage.header')} />
      <h1 className="h4 text-muted">{t('notFoundPage.header')}</h1>
      <p className="text-muted">
        {t('notFoundPage.message')}
        <Link to={routes.chatPagePath()} className="text-muted">
          {t('notFoundPage.linkText')}
        </Link>
      </p>
    </Container>
  );
};

export default NotFoundPage;
