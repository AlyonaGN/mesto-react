import React from 'react';

function PopupWithForm(props) {
console.log(props.isOpen);
  return (
    <div className={props.isOpen ? `popup_opened popup_type_${props.name}` : `popup popup_type_${props.name}`}>
        
        <form className ="popup__form" name={`${props.name}`} noValidate>

        <button type="button" className="popup__close-button"></button>

        <h2 className="popup__header">{`${props.title}`}</h2>
        
        {props.children}

        </form>

    </div>
  );
}

export default PopupWithForm;