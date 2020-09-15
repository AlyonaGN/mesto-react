import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import '../index.css';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';


function App() {

  let isEditProfilePopupOpen = false;
  let isAddPlacePopupOpen = false;
  let isEditAvatarPopupOpen = false;
  
  function handleEditAvatarClick(){
    isEditAvatarPopupOpen = true;
    console.log(isEditAvatarPopupOpen);
  }

  function handleEditProfileClick(){
    isEditProfilePopupOpen = true;
    
  }

  function handleAddPlaceClick(){
    isAddPlacePopupOpen = true;
    
  }

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>
      <Footer />

      <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isEditProfilePopupOpen} >
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

      <PopupWithForm title="Новое место" name="add-photo" isOpen={isAddPlacePopupOpen} >
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
      
      <PopupWithForm title="Вы уверены?" name="delete-card" >
        <button type="submit" className="popup__submit-button">Да</button>
      </PopupWithForm>

      <PopupWithForm title="Обновить аватар" name="change-avatar" isOpen={isEditAvatarPopupOpen}>

        <label className="popup__input">
          <input className="popup__field popup__field popup__field_photo-link" type="url" placeholder="Ссылка на новый аватар" name="avatar-link" required />
          <span className="popup__field-error"></span>
        </label>

        <button type="submit" className="popup__submit-button" name="Сохранить">Сохранить</button>
      </PopupWithForm>

      <div className="popup popup_type_photo-view">

        <figure className="popup__photo-card-fullscreen">

          <button type="button" className="popup__close-button popup__close-button_small"></button>
          <img className="popup__photo-fullscreen" alt="здесь должно быть фото, но что-то пошло не так" />
          <figcaption className="popup__photo-caption"></figcaption>

        </figure>
    
      </div>

  </div>
  );
}

export default App;
