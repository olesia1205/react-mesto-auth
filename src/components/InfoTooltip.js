import React from 'react';

function InfoTooltip({ isOpen, title, onClose, onOverlayClick, image }) {
  return(
    <div  className={`popup ${isOpen ? 'popup_is-opened' : ''}`} onClick={onOverlayClick} >
      <div  className="popup__container">
        <>
          <img className="tooltip__image" src={image} />
          <h2  className="tooltip__title">{title}</h2>
          <button  className="popup__close-button" type="button" name="close-button" onClick={onClose} />
        </>
      </div>
    </div>
  );
}

export default InfoTooltip;
