import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup({ isOpen, onClose, onDeletionConfirm }) {
    return (
        <PopupWithForm title="Вы уверены?" name="delete-card" isOpen={isOpen} onClose={onClose} >
            <button type="button" className="popup__submit-button" onClick={onDeletionConfirm}>Да</button>
        </PopupWithForm>
    );

}

export default DeleteCardPopup;