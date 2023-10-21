import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import React from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/Api';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUsercontext';
import InfoTooltip from "./InfoToolTip";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth";
import success from "../images/success.svg";
import fail from "../images/fail.svg";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailName, setEmailName] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);

  function register(email, password) {
    auth.registerUser(email, password).then(() => {
      setPopupImage(success);
      setPopupTitle("Вы успешно зарегистрировались!");
      navigate("/sign-in");
    }).catch(() => {
      setPopupImage(fail);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
    }).finally(handleInfoTooltip);
  }

  function login(email, password) {

    auth.loginUser(email, password).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setEmailName(email);
      navigate("/");
    }).catch(() => {
      setPopupImage(fail);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      handleInfoTooltip();
    });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmailName(res.data.email);
        }
      }).catch((err) => {
        console.error(err);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()]).then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }

  function handleUpdateAvatar(avatar) {
    api
      .sendAvatarData(avatar)
      .then((res) => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Функции с изменением/обновлением данных на странице
  function handleUpdateUser(userInfo) {
    api
      .sendUserData(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }




  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        const newCard = cards.filter((item) => item._id !== card._id);
        setCards(newCard);
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({
        name: name,
        link: link
      })
      .then((data) => {
        const newCard = data;
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">

          <Routes>
            <Route path="/sign-in" element={
              <>
                <Header title="Регистрация" route="/sign-up" />
                <Login onLogin={login} />
              </>
            } />

            <Route path="/sign-up" element={
              <>
                <Header title="Войти" route="/sign-in" />
                <Register onRegister={register} />
              </>
            } />

            <Route exact path="/" element={
              <>
                <Header title="Выйти" mail={emailName} onClick={onSignOut} route="" />
                <ProtectedRoute
                  component={Main}
                  isLogged={isLoggedIn}
                  onEditAvatarClick={handleEditAvatarClick}
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            } />

            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />} />
          </Routes>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            image={popupImage}
            title={popupTitle}
            isOpen={infoTooltip}
            onCloseClick={handlePopupCloseClick}
            onClose={closeAllPopups}
          />

          <div className="popup popup_type_delete">
            <div className="popup__content">
              <button className="popup__close-button" type="button"></button>
              <h2 className="popup__title">Вы уверены?</h2>
              <form className="popup__container popup_type_delete__container" name="deletecard" noValidate>
                <button className="popup__save-button" type="submit">
                  Да
                </button>
              </form>
            </div>
          </div>




        </div>
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
