import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  return (
    <div  className="signup" >
      <div  className="signup__container">
        <h2  className="signup__title">Регистрация</h2>
        <form  className="signup__form" noValidate>
          <>
            <input className="signup__input signup__input_info_email" type="email" name="email" placeholder="Email"
              value={email || ''} onChange={evt => setEmail(evt.target.value)} required minLength="3" maxLength="40"/>
            <span className="signup__input-error" id="email-error"/>
            <input className="signup__input signup__input_info_password" type="password" name="password" placeholder="Пароль"
              value={password || ''} onChange={evt => setPassword(evt.target.value)} required minLength="2" maxLength="200"/>
            <span className="signup__input-error" id="password-error"/>
            <button  className="signup__submit-button" type="submit" name="submit-button" >Зарегистрироваться</button>
            <Link className="signup__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
          </>
        </form>
      </div>
    </div>
  );
}

export default Register;
