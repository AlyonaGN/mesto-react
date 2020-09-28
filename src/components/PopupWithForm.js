import React from 'react';

function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ''}`} >
        
        <form className ="popup__form" name={`${props.name}`} onSubmit={props.onSubmit} noValidate>

        <button type="button" className="popup__close-button" onClick={props.onClose}></button>

        <h2 className="popup__header">{`${props.title}`}</h2>
        
        {props.children}

        </form>

    </div>
  );
}

export default PopupWithForm;