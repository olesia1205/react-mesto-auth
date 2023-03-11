import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function Login({...props}) {
  const [userData, setUserData] = useState({
    password: '',
    email: ''
  });

  function handleChange (evt) {
    const {name, value} = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    })
  };

  function handleSubmit (evt) {
    evt.preventDefault();
    props.onLoginUserData({
      password: userData.password,
      email: userData.email
    })
  };

  return (
    <div  className="signup" >
      <div  className="signup__container">
        <h2  className="signup__title">Вход</h2>
        <form  className="signup__form" onSubmit={handleSubmit}>
          <>
            <input
              className="signup__input signup__input_info_email"
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email || ''}
              onChange={handleChange}
              required
              minLength="3"
              maxLength="40"
            />
            <span className="signup__input-error" id="email-error"/>
            <input
              className="signup__input signup__input_info_password"
              type="password"
              name="password"
              placeholder="Пароль"
              value={userData.password || ''}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="200"
            />
            <span className="signup__input-error" id="password-error"/>
            <button  className="signup__submit-button" type="submit" name="submit-button" >Войти</button>
          </>
        </form>
      </div>
    </div>
  );
}

export default Login;
