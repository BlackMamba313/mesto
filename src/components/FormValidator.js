export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._button = formElement.querySelector(config.submitButtonSelector);
  }
  //метод отображения ошибки
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }
  //метод скрытия ошибки
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }
  //метод проверки валидности формы
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  //метод проверrb валидности поля
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  //сброс ошибок
  removeErrors() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
  //отключение кнопки сохраниния
  disableSubmitButton() {
    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.setAttribute('disabled', '');
  }
  //метод переключения активности кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.removeAttribute('disabled', '');
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  //опишем метод, чтобы навесить события на все формы

  //опишем метод для валидации
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
