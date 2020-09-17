import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import '../index.css';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setisDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function closeAllPopups(event){
    if (event.target === event.currentTarget) {
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setEditAvatarPopupOpen(false);
      setisDeleteCardPopupOpen(false);
      setSelectedCard(null);
    }
  }

  return (
    <>
      <Header />
      <Main onEditProfile={() => setEditProfilePopupOpen(true)} 
        onAddPlace={() => setAddPlacePopupOpen(true)} 
        onEditAvatar={() => setEditAvatarPopupOpen(true)}
        onCardClick={function handleCardClick(card){
          setSelectedCard(card);
        }}
      />
      <Footer />

      <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} >
        <label className="popup__input">
          <input className="popup__field popup__field_name" type="text" name="user-name" minLength="2" maxLength="40" required />
          <span className="popup__field-error"></span>
        </label>

        <label className="popup__input">
          <input className="popup__field popup__field_description" type="text" name="profile-description" minLength="2" maxLength="200" required />
          <span className="popup__field-error"></span>
        </label>

        <button type="submit" className="popup__submit-button" name="Сохранить">Сохранить</button>
      </PopupWithForm>

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
  </>
  );
}

export default App;
