import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useValidation from '../utils/Validation';

function EditProfilePopup({ isOpen, onClose, onOverlayClick, ...props }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, handleChange, resetValidation, isValid } = useValidation();

  useEffect(() => {
    if (currentUser) {
      resetValidation(currentUser, {}, false);
    }
  }, [currentUser, isOpen, resetValidation]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: values.name,
      about: values.about
    });
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      isDisabled={!isValid}
      buttonClassName=''
    >
      <>
        <div className="popup__input-container">
          <input
            className="popup__input popup__input_info_name"
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={values.name || ''}
            onChange={handleChange}
            required
            minLength="2"
            maxLength="40"
          />
          <span className={`popup__input-error ${!isValid && errors.name ? 'popup__input-error_active' : ''}`} id="name-error">{errors.name || ''}</span>
        </div>
        <div className="popup__input-container">
          <input
            className="popup__input popup__input_info_about"
            type="text"
            name="about"
            placeholder="Ваш род деятельности"
            value={values.about || ''}
            onChange={handleChange}
            required
            minLength="2"
            maxLength="200"
          />
          <span className={`popup__input-error ${!isValid && errors.about ? 'popup__input-error_active' : ''}`} id="about-error">{errors.about || ''}</span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
