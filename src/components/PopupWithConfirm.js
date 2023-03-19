import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithConfirm({ isOpen, onClose, onOverlayClick, onSubmit, card }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(card);
    onClose();
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      buttonText='Да'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      buttonClassName='popup__button-confirm'
    />
  );
}

export default PopupWithConfirm;
