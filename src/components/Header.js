import React from 'react';
import headerLogo from '../images/header-logo.svg';
import { Link, Routes, Route } from 'react-router-dom';

function Header() {
  return (
    <header  className="header">
      <img  className="header__logo" src={headerLogo} alt="Логотип-Место Россия"/>
      <Routes>
        <Route path='/'
          element={
            <Link className="header__link" to="/sign-in">Выйти</Link>
          }
        />

        <Route path='/sign-up'
          element={
            <Link className="header__link" to="/sign-in">Войти</Link>
          }
        />

        <Route path='/sign-in'
          element={
            <Link className="header__link" to="/sign-up">Регистрация</Link>
          }
        />
      </Routes>




    </header>
  );
}

export default Header;
