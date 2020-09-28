import React, { useCallback } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = React.useRef(null);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
          });

    }, [onUpdateAvatar, avatarRef]);

 
    return (
        <PopupWithForm title="Обновить аватар" name="change-avatar" isOpen={isOpen} onClose={onClose} onUpdateAvatar={handleSubmit}>

        <label className="popup__input">
          <input className="popup__field popup__field popup__field_photo-link" ref={avatarRef} type="url" placeholder="Ссылка на новый аватар" name="avatar-link" required />
          <span className="popup__field-error"></span>
        </label>

        <button type="submit" className="popup__submit-button" name="Сохранить" onClick={handleSubmit}>Сохранить</button>
      </PopupWithForm>
    );

}

export default EditAvatarPopup;