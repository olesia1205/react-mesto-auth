import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, ...props}) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(`${avatarRef.current.value}`);
  }

  return(
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input className="popup__input popup__input_avatar-link" ref={avatarRef} type="url" name="avatar-link" placeholder="Ссылка на фото" defaultValue="" required/>
        <span className="popup__input-error" id="avatar-link-error"/>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
