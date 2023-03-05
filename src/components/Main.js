import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onImagePopup, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return(
    <main  className="content">
      {/* секция с профилем */}
      <section  className="profile" aria-label="Профиль">
        <div  className="profile__card">
          <a className="profile__avatar-cover" onClick={onEditAvatar}>
            <img  className="profile__avatar" src={currentUser.avatar} alt="Аватарка"/>
          </a>
          <div  className="profile__info">
            <div  className="profile__info-edit">
              <h1  className="profile__info-title">{currentUser.name}</h1>
              <button  className="profile__info-edit-button" name="info-edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile} />
            </div>
            <p  className="profile__info-subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button  className="profile__add-button" name="add-button" type="button" aria-label="Добавить" onClick={onAddPlace} />
      </section>

      {/* секция с карточками */}
      <section  className="places" aria-label="Карточки о местах">
        {
          cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onImagePopup={onImagePopup}
              handleLikeClick={onCardLike}
              handleDeleteClick={onCardDelete}
            />
          )
        )}
      </section>
    </main>
  );
}

  export default Main;
