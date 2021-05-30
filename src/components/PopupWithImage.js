import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(title, link) {
    const imageElement = this._popup.querySelector('.popup__image');
    this._popup.querySelector('.popup__image-title').textContent = title;
    imageElement.src = link;
    imageElement.alt = title;
    super.open();
  }
}
