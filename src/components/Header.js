import React from 'react';
import headerLogo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header({headerText, linkTo, email, signOut}) {
  return (
    <div  className="header">
      <img  className="header__logo" src={headerLogo} alt="Логотип-Место Россия"/>
      <div className="header__infoblock">
        <p className="header__email">{email}</p>
        <button className="header__button" onClick={signOut}>
          <Link className="header__link" to={linkTo} >{headerText}</Link>
        </button>
      </div>
    </div>
  );
}

export default Header;
