import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useValidation from '../utils/Validation';

function EditAvatarPopup({ isOpen, onClose, onOverlayClick, ...props }) {
  const { values, errors, handleChange, resetValidation, isValid } = useValidation();

  useEffect(() => {
    resetValidation();
  }, [isOpen, resetValidation]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(`${values.avatar}`);
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
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
            className="popup__input popup__input_avatar-link"
            type="url"
            name="avatar"
            value={values.avatar || ''}
            onChange={handleChange}
            placeholder="Ссылка на фото"
            required
          />
          <span className={`popup__input-error ${!isValid && errors.avatar ? 'popup__input-error_active' : ''}`} id="avatar-error">
            {errors.avatar || ''}
          </span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
