import { BaseComponent } from './BaseComponent';

export class SearchInput extends BaseComponent {
  constructor(handlers) {
    super(handlers);
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
      const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
      errorElem.textContent = '';
    }
  }
}