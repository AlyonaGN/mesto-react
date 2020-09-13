import React from 'react';

function Main() {
  return (
      <main className="content-container page__content-conteiner">
        
        <section className="profile content-container__profile">
          
          <div className="profile__avatar-overlay">
            <img className="profile__avatar" alt="здесь должно быть фото профиля, но что-то пошло не так" />
            <button type="button" className="profile__avatar-change-button"></button>
          </div>
          
          <div className="profile__info">
            <div className="profile__name-and-button-container">
              <h1 className="profile__name"></h1>
              <button type="button" className="profile__edit-button"></button>
            </div>
            <p className="profile__description"></p>
          </div>
          
          <button type="button" className="profile__add-button"></button>
        
        </section>

        <section className="photo-cards">
          
          <ul className="photo-cards__list">
          
          </ul>
          
        </section>

      </main>
  );
}

export default Main;
