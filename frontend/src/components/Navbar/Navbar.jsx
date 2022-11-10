import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button, Navbar as BootstrapNavbar, Container, Nav,
} from 'react-bootstrap';

import NavbarDropdown from './NavbarDropdown.jsx';
import { useAuth } from '../../hooks/index.js';
import routes from '../../utils/routes.js';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <BootstrapNavbar bg="light" variant="light" expand="lg" className="shadow-sm rounded-3">
      <Container>
        <BootstrapNavbar.Brand as={Link} to={routes.chatPagePath()}>
          {t('hexletChat')}
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BootstrapNavbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <BootstrapNavbar.Text className="mx-3">
            {user && `${t('navbar.currentUser')}: ${user.username}`}
          </BootstrapNavbar.Text>
          {user && (
            <Button onClick={logOut} variant="outline-dark">
              {t('logout')}
            </Button>
          )}
          <Nav>
            <NavbarDropdown />
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
