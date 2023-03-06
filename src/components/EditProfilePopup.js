import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onOverlayClick, ...props}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description
    });
  }

  return(
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
    >
      <>
        <input className="popup__input popup__input_info_name" type="text" name="profileName" placeholder="Ваше имя"
          value={name || ''} onChange={evt => setName(evt.target.value)} required minLength="2" maxLength="40"/>
        <span className="popup__input-error" id="profileName-error"/>
        <input className="popup__input popup__input_info_about" type="text" name="profileAbout" placeholder="Ваш род деятельности"
          value={description || ''} onChange={evt => setDescription(evt.target.value)} required minLength="2" maxLength="200"/>
        <span className="popup__input-error" id="profileAbout-error"/>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
