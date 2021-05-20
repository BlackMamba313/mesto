import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(placeName, placeLink) {
        this._popup.querySelector('.popup__image-title').textContent = placeName;
        this._popup.querySelector('.popup__image').src = placeLink;
        this._popup.querySelector('.popup__image').alt = placeName;

        super.open()
    }
}