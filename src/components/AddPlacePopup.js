import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useValidation from '../utils/Validation';

function AddPlacePopup({ isOpen, onClose, onOverlayClick, ...props }) {
  const { values, errors, handleChange, resetValidation, isValid } = useValidation();

  useEffect(() => {
    resetValidation();
  }, [isOpen, resetValidation]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: values.heading,
      link: values.link
    });
  }

  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      buttonText='Создать'
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
            className="popup__input popup__input_info_place-name"
            value={values.heading || ''}
            onChange={handleChange}
            type="text"
            name="heading"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span
            className={`popup__input-error ${!isValid && errors.heading ? 'popup__input-error_active' : ''}`}
            id="heading-error"
          >
            {errors.heading || ''}
          </span>
        </div>
        <div className="popup__input-container">
          <input
            className="popup__input popup__input_info_place-link"
            value={values.link || ''}
            onChange={handleChange}
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
          />
          <span
            className={`popup__input-error ${!isValid && errors.link ? 'popup__input-error_active' : ''}`}
            id="link-error"
          >
            {errors.link || ''}
          </span>
        </div>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
