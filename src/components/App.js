import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/Api';
import UserAuth from '../utils/UserAuth';
import { CurrentUserContext} from '../contexts/CurrentUserContext';
import userAuth from '../utils/UserAuth';
import successImage from '../images/Success.svg';
import failImage from '../images/Fail.svg';

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] =useState({
    password: '',
    email: ''
  })

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipPopupOpen(false);
  }

  useEffect(() => {
    api.getAllNeededData()
      .then((result) => {
        const [dataForUserInfo, dataForInitialCards] = result;
        // console.log(result);
        setCurrentUser(dataForUserInfo);
        setCards(dataForInitialCards);
      })
      .catch(err => alert(err))
  }, []);

  useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        // console.log(userInfo);
        setCurrentUser(userInfo);
      })
      .catch(err => alert(err))
  }, []);

  useEffect(() => {
    tockenCheck();
  }, []);

  function tockenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      userAuth.getContent(jwt)
      .then((res) => {
        setLoggedIn(true);
        setUserData({
          username: res.username,
          email: res.email
        });
        navigate ('/');
      })
    }
  }

  function handleLogin({email, password}) {
    return userAuth.authorize(email, password)
    .then((data) => {
      // console.log(data);
      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
        setLoggedIn(true);
        setUserData({
          password: data.password,
          email: data.email
        });
        navigate('/');
      }
    })
  }

  function handleRegister({password, email}) {
    userAuth.register({password, email})
    .then((data) => {
      // console.log(data);
      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
        setLoggedIn(true);
        setUserData({
          username: data.user.username,
          email: data.user.email
        });
        navigate('/sign-in');
      }
    })
  }

  function handleCardClick (selectedCard) {
    setSelectedCard(selectedCard);
  };

  function handleOverlayClick (evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(state => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => alert(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id));
      })
      .catch(err => alert(err))
  }

  function handleUpdateUser(newUserInfo) {
    api.patchUserInfo(newUserInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(err => alert(err))
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch(err => alert(err))
  }

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => alert(err))
  }

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleImagePopupClick = () => setIsImagePopupOpen(true);

  return (
    <div  className="container">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route exact path='/'
            element={
              <>
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Header}
                    headerText='Выйти'
                    linkTo={'/sign-in'}
                    email='email@mail.com'
                />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Main}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onImagePopup={handleImagePopupClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Footer}
                />
              </>
            }
          />

          <Route path='/sign-up'
            element={
              <>
                <Header
                  headerText={'Войти'}
                  linkTo={'/sign-in'}
                  email=''
                />
                <Register
                  onRegisterUserData={handleRegister}
                />
              </>
            }
          />

          <Route path='/sign-in'
            element={
            <>
              <Header
                headerText={'Регистрация'}
                linkTo={'/sign-up'}
                email=''
              />
              <Login handleLogin={handleLogin} />
            </>

            }
          />
          <Route
            path='*'
            element={loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />}
          />
        </Routes>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          onOverlayClick={handleOverlayClick}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onOverlayClick={handleOverlayClick}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlayClick={handleOverlayClick}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onOverlayClick={handleOverlayClick}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          title={loggedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          image={loggedIn ? successImage : failImage}
        />

        {/* Попап удаления карточки */}
        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
          buttonText='Да'
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
