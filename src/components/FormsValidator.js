import { editProfileValidators } from '../utils/editProfileValidators.js';


class FormsValidator {

    validateEditProfileNameInput(nameInputValue) {
        let result = {}
        Object.keys(editProfileValidators.userName)
            .forEach((errorKey) => {
                const errorResult = editProfileValidators.userName[errorKey](nameInputValue);
                result[errorKey] = errorResult;
            });
        return result;
    }

    validateEditProfileDescriptionInput(descriptionInputValue) {
        let result = {}
        Object.keys(editProfileValidators.profileDescription)
            .forEach((errorKey) => {
                const errorResult = editProfileValidators.profileDescription[errorKey](descriptionInputValue);
                result[errorKey] = errorResult;
            });
        return result;
    }   
}

export const formsValidator = new FormsValidator();