import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { ReactComponent as GlobalIcon } from '../../assets/images/GlobalIcon.svg';

const languages = [
  {
    code: 'en',
    language: 'English',
    country: 'gb',
  },
  {
    code: 'ru',
    language: 'Русский',
    country: 'ru',
  },
];

const NavbarDropdown = () => {
  const { i18n } = useTranslation();

  const handleSwitchLanguage = (code) => () => {
    i18n.changeLanguage(code);
  };

  return (
    <NavDropdown title={<GlobalIcon />} id="basic-nav-dropdown">
      {languages.map(({ code, language, country }) => (
        <NavDropdown.Item onClick={handleSwitchLanguage(code)} key={country}>
          <span className={`flag-icon flag-icon-${country} mx-2`} />
          {language}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default NavbarDropdown;
