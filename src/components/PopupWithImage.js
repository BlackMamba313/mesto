import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(placeName, placeLink) {
    const imageElement = this._popup.querySelector('.popup__image')
    this._popup.querySelector('.popup__image-title').textContent = placeName;
    imageElement.src = placeLink;
    imageElement.alt = placeName;

    super.open();
  }
}
