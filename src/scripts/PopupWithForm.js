import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._getInputValues = this._getInputValues.bind(this);
    }

    _getInputValues() {
      const values = {}
      const inputs = [...this._form.querySelectorAll('.popup__inp')]
      inputs.forEach( input => {
          values[input.name] = input.value})
      return values;
      }

    setEventListeners(){
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const data = this._getInputValues()
            this._submitHandler(data);
            this.close()
          });
    }

    close() {
        this._form.reset()
        super.close()
    }

}


