import React, { useCallback } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUserData = React.useContext(CurrentUserContext);

    const handleNameChange = useCallback((e) => {
        setName(e.target.value);
        console.log('ooooooaaaa');
    }, [setName]);

    const handleDescriptionChange = useCallback((e) => {
        setDescription(e.target.value);
        console.log('ooooooaaaa');
    }, [setDescription]);

    const handleSubmit = useCallback((e) => {
        console.log('ooooooaaaa');
        e.persist();
        const submitEventTarget = e.target;
        const submitEventCurTarget = e.currentTarget;
        const syntheticEventOnSubmitClick = e;
        syntheticEventOnSubmitClick.preventDefault();
        onUpdateUser(syntheticEventOnSubmitClick, submitEventTarget, submitEventCurTarget, {
            name,
            about: description,
        });
    }, [onUpdateUser, name, description]);


    React.useEffect(() => {
        if (currentUserData) {
            setName(currentUserData.name);
            setDescription(currentUserData.about);
            //добавить очистку полей через return () =>
        }
    }, [currentUserData]); 
 
    return (
        <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
        <label className="popup__input">
          <input className="popup__field popup__field_name" value={name} onChange={handleNameChange} type="text" name="user-name" minLength="2" maxLength="40" placeholder="Имя" required />
          <span className="popup__field-error"></span>
        </label>

        <label className="popup__input">
          <input className="popup__field popup__field_description" value={description} onChange={handleDescriptionChange} type="text" name="profile-description" minLength="2" maxLength="200" placeholder="О себе" required />
          <span className="popup__field-error"></span>
        </label>

        <button type="submit" className="popup__submit-button" onClick={handleSubmit} name="Сохранить">Сохранить</button>
      </PopupWithForm>
    );

}

export default EditProfilePopup;