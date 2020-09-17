import React from 'react';

function PopupWithForm(props) {

  return (
    <div className={props.isOpen ? `popup popup_opened popup_type_${props.name}` : `popup popup_type_${props.name}`} onClick={props.onClose}>
        
        <form className ="popup__form" name={`${props.name}`} noValidate>

        <button type="button" className="popup__close-button" onClick={props.onClose}></button>

        <h2 className="popup__header">{`${props.title}`}</h2>
        
        {props.children}

        </form>

    </div>
  );
}

export default PopupWithForm;