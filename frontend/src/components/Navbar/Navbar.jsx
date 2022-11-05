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
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand as={Link} to={routes.chatPagePath()}>
          {t('animeChat')}
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BootstrapNavbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {user && (
            <Button onClick={logOut} variant="outline-light">
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
