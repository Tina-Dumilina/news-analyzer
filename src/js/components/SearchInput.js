import { BaseComponent } from './BaseComponent';

export class SearchInput extends BaseComponent {
  constructor(handlers) {
    super(handlers);
    this._form = handlers[0].element;
    this._button = this._form.querySelector('.intro__button');
  }

  isFormValid() {
    const inputs = [...this._form.elements];
    let valid = false;
  
    inputs.forEach(input => {
      if (input.type !== 'submit' && input.type !== 'button') {
        if (this._isFieldValid(input)) valid = true;
      }
    });
  
    return valid;
  }

  setEventListeners(e) {
    const inputs = [...this._form.elements];
    this._isFieldValid(e.target);
    this._checkSumbitButtonState(inputs);
  }

  _checkSumbitButtonState(inputs) {
    if (inputs.every(this._checkInputValidity)) {
      this._setSubmitButtonState(true);
    } else {
      this._setSubmitButtonState(false);
    }
  }

  _isFieldValid(input) {
    const errorElement = this._form.querySelector(`.intro__error`);
    const valid = this._checkInputValidity(input); 
    errorElement.textContent = input.validationMessage;
    return valid;
  }

  _checkInputValidity(input) {
    input.setCustomValidity('');

    if (input.validity.valueMissing) {
      input.setCustomValidity('Это обязательное поле');
      return false;
    }
  
    return true;
  }

  _setSubmitButtonState(state) {
    if (state) {
      this._button.removeAttribute('disabled');
    } else {
      this._button.setAttribute('disabled', true);
    }
  }

  resetErrors(input) {
    if (input.type !== 'submit' && input.type !== 'button') {
      const errorElem = this._form.querySelector(`.intro__error`);
      errorElem.textContent = '';
    }
  }
}