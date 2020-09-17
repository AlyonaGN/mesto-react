import React from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserData().
      then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      }).
      catch((error) => {
        console.log(error);
    })
  }, []);
  
  React.useEffect(() => {
    api.getInitialCards().
      then((initialCards) => {
        const cardsFromServer = initialCards.map(card => ({
          src: card.link,
          alt: card.name,
          description: card.name,
          likesAmount: card.likes.length,
          id: card._id,
        }))
        setCards(cardsFromServer);
      }).
      catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <main className="content-container page__content-container">
        <section className="profile content-container__profile">
          
          <div className="profile__avatar-overlay">
            <img className="profile__avatar" alt="здесь должно быть фото профиля, но что-то пошло не так" src={userAvatar}/>
            <button type="button" className="profile__avatar-change-button" onClick={props.onEditAvatar}></button>
          </div>
          
          <div className="profile__info">
            <div className="profile__name-and-button-container">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__description">{userDescription}</p>
          </div>
          
          <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
        
        </section>

        <section className="photo-cards">
          
          <ul className="photo-cards__list">
            {cards.map(card => <Card key={card.id} card={card} onCardClick={props.onCardClick} />)}
          </ul>
          
        </section>
      </main>
  );
}

export default Main;
