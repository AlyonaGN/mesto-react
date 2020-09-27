import React, { useCallback } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import { api } from '../utils/Api.js';
import '../index.css';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setUser] = React.useState(null);

  React.useEffect(() => {
    api.getUserData()
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const closeAllPopups = useCallback((event, syntheticEventTarget, syntheticEventCurrentTarget) => {
    if (event.target === event.currentTarget || 
      syntheticEventTarget === syntheticEventCurrentTarget) {
      console.log(event);
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setEditAvatarPopupOpen(false);
      setIsDeleteCardPopupOpen(false);
      setSelectedCard(null);
    }
  }, [setEditProfilePopupOpen, setAddPlacePopupOpen, setEditAvatarPopupOpen, setIsDeleteCardPopupOpen, setSelectedCard]);

  const handleUpdateUser = useCallback((e, submitEventTarget, submitEventCurTarget, formValues) => {
    api.editProfile(formValues)
      .then((res) => {
        setUser(res);
        console.log(e);
        closeAllPopups(e, submitEventTarget, submitEventCurTarget);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [closeAllPopups]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main onEditProfile={() => setEditProfilePopupOpen(true)} 
        onAddPlace={() => setAddPlacePopupOpen(true)} 
        onEditAvatar={() => setEditAvatarPopupOpen(true)}
        onCardClick={function handleCardClick(card){
          setSelectedCard(card);
        }}
      />
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 

      <PopupWithForm title="Новое место" name="add-photo" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >
        <label className="popup__input">
          <input className="popup__field popup__field_photo-description" type="text" placeholder="Название" name="photo-description" minLength="1" maxLength="30" required />
          <span className="popup__field-error"></span>
        </label>

        <label className="popup__input">
          <input className="popup__field popup__field_photo-link" type="url" placeholder="Ссылка на картинку" name="photo-link" required />
          <span className="popup__field-error"></span>
        </label>

        <button type="submit" className="popup__submit-button" name="Создать">Создать</button>
      </PopupWithForm>
      
      <PopupWithForm title="Вы уверены?" name="delete-card" isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} >
        <button type="submit" className="popup__submit-button">Да</button>
      </PopupWithForm>

      <PopupWithForm title="Обновить аватар" name="change-avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>

        <label className="popup__input">
          <input className="popup__field popup__field popup__field_photo-link" type="url" placeholder="Ссылка на новый аватар" name="avatar-link" required />
          <span className="popup__field-error"></span>
        </label>

        <button type="submit" className="popup__submit-button" name="Сохранить">Сохранить</button>
      </PopupWithForm>

      <ImagePopup name="change-avatar" card={selectedCard} onClose={closeAllPopups} />
  </CurrentUserContext.Provider>
  );
}

export default App;
