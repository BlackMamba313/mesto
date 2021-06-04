import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup)
    this._popupCardImage = this._popup.querySelector('.popup__image')
    this._captionImage = this._popup.querySelector('.popup__image-title')
  }
  open(title, link) {
    this._captionImage.textContent = title;
    this._popupCardImage.src = link;
    this._popupCardImage.alt = title;
    super.open();
  }
}
