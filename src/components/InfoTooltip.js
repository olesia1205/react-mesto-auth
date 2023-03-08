import React from 'react';
import successImage from '../images/Success.svg';
import failImage from '../images/Fail.svg';

function InfoTooltip({ isOpen, title, onClose, onOverlayClick }) {
  return(
    <div  className={`popup ${isOpen ? 'popup_is-opened' : ''}`} onClick={onOverlayClick} >
      <div  className="popup__container">
        <>
          <img className="tooltip__image" src={successImage} />
          <h2  className="tooltip__title">{title}</h2>
          <button  className="popup__close-button" type="button" name="close-button" onClick={onClose} />
        </>
      </div>
    </div>
  );
}

export default InfoTooltip;
