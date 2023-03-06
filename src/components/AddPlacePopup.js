import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onOverlayClick, ...props}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name,
      link: link
    });
  }

  return(
    <PopupWithForm
      name='card'
      title='Новое место'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
    >
      <>
        <input className="popup__input popup__input_info_place-name"
          value={name || ''} onChange={evt => setName(evt.target.value)} type="text" name="place-name" placeholder="Название" required minLength="2" maxLength="30"/>
        <span className="popup__input-error" id="place-name-error"/>
        <input className="popup__input popup__input_info_place-link"
          value={link || ''} onChange={evt => setLink(evt.target.value)} type="url" name="place-link" placeholder="Ссылка на картинку" required/>
        <span className="popup__input-error" id="place-link-error"/>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
