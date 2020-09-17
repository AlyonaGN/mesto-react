import React from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li>
            <figure className="photo-card">
                <img className="photo-card__photo" src={props.card.src} alt={props.card.alt} onClick={handleClick} />
                <figcaption className="photo-card__caption">
                    <h2 className="photo-card__description">{props.card.description}</h2>
                    <div className="photo-card__like-container">
                        <button type="button" className="photo-card__like"></button>
                        <p className="photo-card__likes-amount">{props.card.likesAmount}</p>
                    </div>
                </figcaption>
            </figure>
        </li>
    )
}

export default Card;
