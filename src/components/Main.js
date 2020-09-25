import React, { useCallback } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
  const [cards, setCards] = React.useState([]);
  const currentUserData = React.useContext(CurrentUserContext);

  const handleCardLike = useCallback((card) => {
    const isLiked = card.likes.some(i => i._id === currentUserData._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });
}, [cards]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
        const cardsFromServer = initialCards.map(card => ({
          src: card.link,
          alt: card.name,
          description: card.name,
          likes: card.likes,
          likesAmount: card.likes.length,
          id: card._id,
          ownerId: card.owner._id,
        }))
        setCards(cardsFromServer);

      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

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
              {cards.map(card => <Card key={card.id} card={card} onCardClick={props.onCardClick} />)}
            </ul>
            
          </section>
        </main>
    );
  }
  else {
    return null
  }
  
  
}

export default Main;
