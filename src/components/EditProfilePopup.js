import React, { useCallback } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [formValues, setFormValues] = React.useState({
        userName: "",
        profileDescription: ""
    });

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({...prevState, [name]: value}));
    }, [setFormValues]);

    const currentUserData = React.useContext(CurrentUserContext);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onUpdateUser({
            name: formValues.userName,
            about: formValues.profileDescription,
        });
    }, [onUpdateUser, formValues]);


    React.useEffect(() => {
        if (currentUserData) {
            setFormValues({
                userName: currentUserData.name,
                profileDescription: currentUserData.about});
        }
    }, [currentUserData]); 
 
    return (
        <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
        <label className="popup__input">
          <input className="popup__field popup__field_name" value={formValues.userName} onChange={handleInputChange} type="text" name="userName" minLength="2" maxLength="40" placeholder="Имя" required />
          <span className="popup__field-error"></span>
        </label>

        <label className="popup__input">
          <input className="popup__field popup__field_description" value={formValues.profileDescription} onChange={handleInputChange} type="text" name="profileDescription" minLength="2" maxLength="200" placeholder="О себе" required />
          <span className="popup__field-error"></span>
        </label>

        <button type="submit" className="popup__submit-button" onClick={handleSubmit} name="Сохранить">Сохранить</button>
      </PopupWithForm>
    );

}

export default EditProfilePopup;