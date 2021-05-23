export default class FormValidator {
  constructor(setupValidation, formElement) {
    this._setupValidation = setupValidation;
    this._form = formElement;
    this._inputList = Array.from(this._form.querySelectorAll(this._setupValidation.inputSelector));
    this._button = this._form.querySelector(this._setupValidation.submitButtonSelector);
  }
  //метод отображения ошибки
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._setupValidation.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._setupValidation.errorClass);
  }
  //метод скрытия ошибки
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._setupValidation.inputErrorClass);
    errorElement.classList.remove(this._setupValidation.errorClass);
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
  //метод переключения активности кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableBtnSend()
    } else {
      this._button.classList.remove(this._setupValidation.inactiveButtonClass);
      this._button.removeAttribute('disabled', '');
    }
  }

  disableBtnSend() {
    this._button.classList.add(this._setupValidation.inactiveButtonClass);
    this._button.setAttribute('disabled', '');
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
