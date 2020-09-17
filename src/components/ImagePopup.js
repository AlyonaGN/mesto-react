import React from 'react';

function ImagePopup(props) {
  if (props.card){
    return (
      <div className="popup popup_opened popup_type_photo-view" onClick={props.onClose}>
        <figure className="popup__photo-card-fullscreen">
          <button type="button" className="popup__close-button popup__close-button_small" onClick={props.onClose}></button>
          <img className="popup__photo-fullscreen" src={props.card.src} alt={props.card.alt} />
          <figcaption className="popup__photo-caption">{props.card.description}</figcaption>
        </figure>
      </div>);
  }
  else {
    return null;
  }
}

export default ImagePopup;