import React from 'react';
import headerLogo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header({headerText, linkTo}) {
  return (
    <header  className="header">
      <img  className="header__logo" src={headerLogo} alt="Логотип-Место Россия"/>
      <Link className="header__link" to={linkTo} >{headerText}</Link>
    </header>
  );
}

export default Header;
