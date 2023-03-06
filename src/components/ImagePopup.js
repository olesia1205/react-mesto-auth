import React from 'react';

function ImagePopup({card, onClose, isOpen, onOverlayClick}) {
  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_is-opened' : ''}`} onClick={onOverlayClick} >
      <div className="popup__container-image">
        <figure className="popup__image-figure">
          <img className="popup__image" alt={card.name} src={card.link}/>
          <figcaption className="popup__image-subtitle">{card.name}</figcaption>
        </figure>
        <button className="popup__close-button" type="button" name="close-button" onClick={onClose}/>
      </div>
    </div>
  );
}

export default ImagePopup;
