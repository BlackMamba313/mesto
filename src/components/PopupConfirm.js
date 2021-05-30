import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor({ popup, handleDeleteClick }) {
    super(popup);
    this._handleDeleteClick = handleDeleteClick;
    this._deleteCardBtn = this._popup.querySelector('.popup__btn-save');
  }
  //вешаем слушатель на кнопку удаления.
  _setEventListeners() {
    super._setEventListeners();
    this._deleteCardBtn.addEventListener('click', this._confirmDelete);
  }
  // поддтверждаем удаление
  _confirmDelete = () => {
    this._handleDeleteClick();
  };
  // добавляем ещё один слушатель
  open() {
    super.open();
    this._setEventListeners();
  }
}
