export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
    }

    open() {
        this._popup.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose)
        this._popup.addEventListener('mousedown', this._handleOverlayClose);
    }

    close() {
        this._popup.classList.remove('popup_opened')
        document.addEventListener('keydown', this._handleEscClose)
        this._popup.addEventListener('mousedown', this._handleOverlayClose)
    }

    _handleEscClose = e => {
        if(e.key === 'Escape') {
            this.close()
        }
    }

    _handleOverlayClose = e =>{
            if (e.target !== e.currentTarget)
                return;
                this.close();
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close')
        .addEventListener('mousedown', () => this.close()
        )
    }
}