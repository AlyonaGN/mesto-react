import React, { useCallback } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import { api } from '../utils/Api.js';
import '../index.css';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);

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

  React.useEffect(() => {
    api.getUserData()
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const handleCardLike = useCallback((card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card.id, isLiked).then((newCard) => {
      newCard = api.createCard(newCard);
      const newCards = cards.map((c) => c.id === card.id ? newCard : c);
      setCards(newCards);
    });
  }, [setCards, cards, currentUser]);

  const handleCardDelete = useCallback((card) => {
      api.deleteCard(card.id);
      const cardsWithoutDeletedCard = cards.filter((item) => {
        return item.id !== card.id;
      });
      setCards(cardsWithoutDeletedCard);
  }, [cards]);

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
  }, [setEditProfilePopupOpen, setAddPlacePopupOpen, setEditAvatarPopupOpen, setIsDeleteCardPopupOpen, setSelectedCard]);

  const handleAddCard = useCallback((newCardData) => {
    api.addNewCard(newCardData.link, newCardData.photoDescription)
      .then((newCard) => {
        newCard = api.createCard(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }, [cards, closeAllPopups]);
  
  const handleUpdateUser = useCallback((formValues) => {
    api.editProfile(formValues)
      .then((res) => {
        setUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }, [closeAllPopups]);

  const handleUpdateAvatar = useCallback((avatarObject) => {
    api.changeAvatar(avatarObject.avatar)
      .then((updatedUserData) => {
        setUser(updatedUserData);
        closeAllPopups();
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
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
      
      <PopupWithForm title="Вы уверены?" name="delete-card" isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} >
        <button type="submit" className="popup__submit-button">Да</button>
      </PopupWithForm>

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/>
      
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

      <ImagePopup name="change-avatar" card={selectedCard} onClose={closeAllPopups} />
  </CurrentUserContext.Provider>
  );
}

export default App;
