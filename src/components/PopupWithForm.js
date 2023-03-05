import React from 'react';

function PopupWithForm({name, title, children, isOpen, onClose, buttonText, onSubmit}) {
  return (
    <div  className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''}`}>
    <div  className="popup__container">
      <h2  className="popup__title">{title}</h2>
      <form  className={`popup__form popup__form_type_${name}`} name={`popup-form-${name}`} id={`popup-form-${name}`} onSubmit={onSubmit} noValidate>
        <>
        {children}
        <button  className="popup__submit-button" type="submit" name="submit-button" value={buttonText}>{buttonText}</button>
        <button  className="popup__close-button" type="button" name="close-button" onClick={onClose}/>
        </>
      </form>
    </div>
  </div>
  );
}

export default PopupWithForm;
