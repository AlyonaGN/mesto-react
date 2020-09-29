import React, { useCallback } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { formsValidator } from './FormsValidator.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [formValues, setFormValues] = React.useState({
        userName: "",
        profileDescription: ""
    });

    const [errors, setErrors] = React.useState({
        userNameErrors: {
            required: true,
            minLength: true,
            maxLength: true,
        },
        profileDescriptionErrors: {
            required: true,
            minLength: true,
            maxLength: true,
        }
    });

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

    const handleNameValidation = useCallback((inputValue) => {
        const userNameValidationResult = formsValidator.validateEditProfileNameInput(inputValue);
        console.log(userNameValidationResult);
        setErrors({
            userNameErrors: userNameValidationResult,
        });
    });


    const handleDescriptionValidation = useCallback((inputValue) => {
        const userNameValidationResult = formsValidator.validateEditProfileDescriptionInput(inputValue);

        setErrors({
            userNameErrors: userNameValidationResult,
        });
    });

    const handleNameChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
        handleNameValidation(value);
    }, [setFormValues, handleNameValidation]);

    const handleDescriptionChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({...prevState, [name]: value}));
        handleDescriptionValidation(value);
    }, [setFormValues, handleDescriptionValidation]);
 
    return (
        <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
        <label className="popup__input">
          <input className="popup__field popup__field_name" value={formValues.userName} onChange={handleNameChange} type="text" name="userName" placeholder="Имя" />
          <span className="popup__field-error"></span>
        </label>

        <label className="popup__input">
          <input className="popup__field popup__field_description" value={formValues.profileDescription} onChange={handleDescriptionChange} type="text" name="profileDescription" placeholder="О себе" />
          <span className="popup__field-error"></span>
        </label>

        <button type="submit" className="popup__submit-button" onClick={handleSubmit} name="Сохранить">Сохранить</button>
      </PopupWithForm>
    );

}

export default EditProfilePopup;