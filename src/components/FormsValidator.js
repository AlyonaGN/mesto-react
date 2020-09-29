import { editProfileValidators } from '../utils/editProfileValidators.js';


class FormsValidator {

    validateEditProfileNameInput(nameInputValue) {
        console.log(nameInputValue);
        const userNameValidationResult = Object.keys(editProfileValidators.userName)
            .map((errorKey) => {
                const errorResult = editProfileValidators.userName[errorKey](nameInputValue);

                return { [errorKey]: errorResult };
            });

        return userNameValidationResult;
    }

    validateEditProfileDescriptionInput(descriptionInputValue) {

        const descriptionValidationResult = Object.keys(editProfileValidators.description)
            .map((errorKey) => {
                const errorResult = editProfileValidators.profileDescription[errorKey](descriptionInputValue);

                return { [errorKey]: errorResult };
            });

        return descriptionValidationResult;
    }
    
}

export const formsValidator = new FormsValidator();