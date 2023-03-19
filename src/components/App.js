import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
// import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirm from './PopupWithConfirm';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/Api';
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
  const [isPopupWithConfirmOpen, setIsPopupWithConfirmOpen] = useState(false);
  const [infoTooltiptext, setInfoTooltiptext] = useState('');
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [deletedCard, setDeletedCard] = useState({});
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
    setIsPopupWithConfirmOpen(false);
  }

  useEffect(() => {
    if(loggedIn) {
      api.getAllNeededData()
      .then(([dataForUserInfo, dataForInitialCards]) => {
        // console.log([dataForUserInfo, dataForInitialCards]);
        setCurrentUser(dataForUserInfo);
        setCards(dataForInitialCards);
      })
      .catch(err => console.log(err))
    }
  }, [loggedIn]);

  useEffect(() => {
    tockenCheck();
  }, [navigate]);

  function tockenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      userAuth.getContent(jwt)
      .then((response) => {
        // console.log(response);
        setLoggedIn(true);
        setUserData({
          email: response.data.email
        });
        navigate ('/');
      })
      .catch(err => console.log(err))
    }
  }

  function handleRegister({password, email}) {
    userAuth.register({password, email})
    .then(() => {
      setRegistered(true);
      setInfoTooltiptext('Вы успешно зарегистрировались!');
      setInfoTooltipPopupOpen(true);
      navigate('/sign-in');
    })
    .catch((error) => {
      setRegistered(false);
      setInfoTooltiptext('Что-то пошло не так! Попробуйте ещё раз.');
      setInfoTooltipPopupOpen(true);
      console.log(error);
    })
  }

  function handleLogin({password, email}) {
    userAuth.authorize({password, email})
    .then((response) => {
      // console.log(response);
        localStorage.setItem('jwt', response.token);
        setLoggedIn(true);
        setUserData({
          password: password,
          email: email
        });
        navigate('/');
    })
    .catch((error) => {
      setRegistered(false);
      setInfoTooltiptext('Что-то пошло не так! Попробуйте ещё раз.');
      setInfoTooltipPopupOpen(true);
      console.log(error);
    })
  }

  function handleSignOut () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData({
      password: '',
      email: ''
    });
    navigate('/sign-in');
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
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err))
  }

  function handleUpdateUser(newUserInfo) {
    api.patchUserInfo(newUserInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleImagePopupClick = () => setIsImagePopupOpen(true);
  const handlePopupWithConfirm = (card) => {
    setIsPopupWithConfirmOpen(true);
    setDeletedCard(card);
  };

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
                    email={userData.email}
                    signOut={handleSignOut}
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
                    onCardDelete={handlePopupWithConfirm}
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
              <Login onLoginUserData={handleLogin} />
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
          title={infoTooltiptext}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          image={registered ? successImage : failImage}
        />

        <PopupWithConfirm
          isOpen={isPopupWithConfirmOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onSubmit={handleCardDelete}
          card={deletedCard}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
