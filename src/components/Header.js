import React from 'react';
import logoPath from '../images/header-logo.png';

function Header() {
  return (
      <header className="header page__header">
        <img className="header__logo" src={logoPath} alt="здесь должен быть логотип, но что-то пошло не так" />
      </header>
  );
}

export default Header;
