import React, { useCallback } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
  const [cards, setCards] = React.useState([]);
  const currentUserData = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    api.getInitialCards()
      .then((cardsFromServer) => {
        const initialCards = cardsFromServer.map((initialCard) => {
          return api.createCard(initialCard);
        })
        setCards(initialCards);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  
  const handleCardLike = useCallback((card) => {
    const isLiked = card.likes.some(i => i._id === currentUserData._id);
    
    api.changeLikeCardStatus(card.id, isLiked).then((newCard) => {
      newCard = api.createCard(newCard);
      const newCards = cards.map((c) => c.id === card.id ? newCard : c);
      setCards(newCards);
    });
  }, [setCards, cards, currentUserData]);

  const handleCardDelete = useCallback((card) => {
      api.deleteCard(card.id);
      const cardsWithoutDeletedCard = cards.filter((item) => {
        return item.id !== card.id;
      });
      console.log(cardsWithoutDeletedCard);
      setCards(cardsWithoutDeletedCard);
  }, [cards]);

  if (currentUserData) {
    return (
      <main className="content-container page__content-container">
          <section className="profile content-container__profile">
            
            <div className="profile__avatar-overlay">
              <img className="profile__avatar" alt="здесь должно быть фото профиля, но что-то пошло не так" src={currentUserData.avatar}/>
              <button type="button" className="profile__avatar-change-button" onClick={props.onEditAvatar}></button>
            </div>
            
            <div className="profile__info">
              <div className="profile__name-and-button-container">
                <h1 className="profile__name">{currentUserData.name}</h1>
                <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__description">{currentUserData.about}</p>
            </div>
            
            <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
          
          </section>
  
          <section className="photo-cards">
            
            <ul className="photo-cards__list">
              {cards.map(card => <Card key={card.id} card={card} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />)}
            </ul>
            
          </section>
        </main>
    );
  }
  else {
    return null;
  }
  
  
}

export default Main;
