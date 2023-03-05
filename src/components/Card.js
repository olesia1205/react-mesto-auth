import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onImagePopup, handleLikeClick, handleDeleteClick}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`place__like-button ${isLiked && 'place__like-button_status_active'}`);

  return(
    <article className="place">
      <img className="place__image" src={card.link} alt={card.name}
        onClick={() => {
          onCardClick(card)
          onImagePopup()
        }}
      />
      <div className="place__info">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-unit">
          <button className={cardLikeButtonClassName} name="like-button" type="button"
            onClick={() => {
              handleLikeClick(card)
            }}
          />
          <h3 className="place__like-number">{card.likes.length}</h3>
        </div>
      </div>
      {isOwn && <button className="place__delete-button" name="delete-button" type="button"
        onClick={() => {
          handleDeleteClick(card)
        }}
      />}
    </article>
  );
}

export default Card;
