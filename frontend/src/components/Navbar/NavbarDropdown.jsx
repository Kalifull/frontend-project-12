import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavDropdown } from 'react-bootstrap';

import { ReactComponent as GlobalIcon } from '../../assets/GlobalIcon.svg';

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
    <NavDropdown className="mx-2" title={<GlobalIcon />} id="basic-nav-dropdown">
      {languages.map(({ code, language, country }) => (
        <NavDropdown.Item as="button" onClick={handleSwitchLanguage(code)} key={country}>
          <span className={`flag-icon flag-icon-${country} mx-2`} />
          {language}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default NavbarDropdown;
