import React, { useCallback } from 'react';

function Card({cardId, card, onCardClick}) {
    const handleClick = useCallback(() => {
        onCardClick(card);
    }, [onCardClick, card]);

    return (
        <li>
            <figure className="photo-card">
                <img className="photo-card__photo" src={card.src} alt={card.alt} onClick={handleClick} />
                <figcaption className="photo-card__caption">
                    <h2 className="photo-card__description">{card.description}</h2>
                    <div className="photo-card__like-container">
                        <button type="button" className="photo-card__like"></button>
                        <p className="photo-card__likes-amount">{card.likesAmount}</p>
                    </div>
                </figcaption>
            </figure>
        </li>
    )
}

export default Card;
