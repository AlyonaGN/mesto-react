import React from 'react';

function ImagePopup(props) {
    return (
        <div className={ props.card ? "popup popup_opened popup_type_photo-view" : "popup popup_type_photo-view" } >

          <figure className="popup__photo-card-fullscreen">

            <button type="button" className="popup__close-button popup__close-button_small"></button>
            <img className="popup__photo-fullscreen" src={props.card.src} alt={props.card.alt} />
            <figcaption className="popup__photo-caption">{props.card.description}</figcaption>

          </figure>
      
        </div>
    );
}

export default ImagePopup;