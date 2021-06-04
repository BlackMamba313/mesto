import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor({ popup, handleDeleteButtonClick }) {
    super(popup);
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._deleteCardBtn = this._popup.querySelector('.popup__btn-save');
  }
  //вешаем слушатель на кнопку удаления.
  setEventListeners() {
    super.setEventListeners();
    this._deleteCardBtn.addEventListener('click', this._confirmDelete);
  }

  _confirmDelete = () => {
    this._handleDeleteButtonClick();
  };
}
