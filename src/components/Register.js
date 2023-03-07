import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName('');
    setDescription('');
  }, []);

  return (
    <div  className="signup" >
      <div  className="signup__container">
        <h2  className="signup__title">Регистрация</h2>
        <form  className="signup__form" noValidate>
          <>
            <input className="signup__input signup__input_info_name" type="text" name="profileName" placeholder="Email"
              value={name || ''} onChange={evt => setName(evt.target.value)} required minLength="2" maxLength="40"/>
            <span className="signup__input-error" id="profileName-error"/>
            <input className="signup__input signup__input_info_about" type="text" name="profileAbout" placeholder="Пароль"
              value={description || ''} onChange={evt => setDescription(evt.target.value)} required minLength="2" maxLength="200"/>
            <span className="signup__input-error" id="profileAbout-error"/>
            <button  className="signup__submit-button" type="submit" name="submit-button" >Зарегистрироваться</button>
            <Link className="signup__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
          </>
        </form>
      </div>
    </div>
  );
}

export default Register;
