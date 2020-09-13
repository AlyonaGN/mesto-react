import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import '../index.css';


function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />

      <div className="popup popup_type_profile">
        
        <form className ="popup__form" name="popup-form" noValidate>

          <button type="button" className="popup__close-button"></button>

          <h2 className="popup__header">Редактировать профиль</h2>
          
          <label className="popup__input">
            <input className="popup__field popup__field_name" type="text" name="user-name" minLength="2" maxLength="40" required />
            <span className="popup__field-error"></span>
          </label>

          <label className="popup__input">
            <input className="popup__field popup__field_description" type="text" name="profile-description" minLength="2" maxLength="200" required />
            <span className="popup__field-error"></span>
          </label>

          <button type="submit" className="popup__submit-button" name="Сохранить">Сохранить</button>

        </form>

      </div>

      <div className="popup popup_type_add-photo">
        
        <form className ="popup__form" name="popup-form" noValidate>

          <button type="button" className="popup__close-button"></button>

          <h2 className="popup__header">Новое место</h2>

          <label className="popup__input">
            <input className="popup__field popup__field_photo-description" type="text" placeholder="Название" name="photo-description" minLength="1" maxLength="30" required />
            <span className="popup__field-error"></span>
          </label>

          <label className="popup__input">
            <input className="popup__field popup__field_photo-link" type="url" placeholder="Ссылка на картинку" name="photo-link" required />
            <span className="popup__field-error"></span>
          </label>

          <button type="submit" className="popup__submit-button" name="Создать">Создать</button>

        </form>

      </div>

      <div className="popup popup_type_delete-card">
        
        <form className ="popup__form" name="popup-form">

          <button type="button" className="popup__close-button"></button>

          <h2 className="popup__header">Вы уверены?</h2>

          <button type="submit" className="popup__submit-button">Да</button>

        </form>

      </div>

      <div className="popup popup_type_change-avatar">
        
        <form className ="popup__form" name="popup-form" noValidate>

          <button type="button" className="popup__close-button"></button>

          <h2 className="popup__header">Обновить аватар</h2>

          <label className="popup__input">
            <input className="popup__field popup__field popup__field_photo-link" type="url" placeholder="Ссылка на новый аватар" name="avatar-link" required />
            <span className="popup__field-error"></span>
          </label>

          <button type="submit" className="popup__submit-button" name="Сохранить">Сохранить</button>

        </form>

      </div>

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
