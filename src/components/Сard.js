export default class Card {
  constructor({ data, cardSelector, userId, handlers }) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handlers.handleCardClick;
    this._handleLikeClick = handlers.handleLikeClick;
    this._handleDeleteIconClick = handlers.handleDeleteIconClick;
  }
  
  getCardId() { 
    return this._cardId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  setLikesInfo(data) {
    this.isLiked = !this.isLiked;
    this._likesCounter.textContent = data.likes.length;
    if(this.isLiked) {
      this._buttonLike.classList.add('elements__like-btn_active');
    } else {
      this._buttonLike.classList.remove('elements__like-btn_active');
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    this._buttonDelete.addEventListener('click', () => this._handleDeleteIconClick(this));
    this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._cardId, this.isLiked));
  }

  _canDeleteCard() {
    if (this._userId !== this._ownerId) {
      this._buttonDelete.classList.add('elements__delete-btn_hidden');
    } else {
      this._buttonDelete.classList.remove('elements__delete-btn_hidden');
    }
  }

  markLikes() {
    if (this._likes.some((person) => person._id === this._userId)) {
      this._buttonLike.classList.add('elements__like-btn_active');
      this.isLiked = true
    }
  }

  updateLikes() {
    this._likesCounter.textContent = this._likes.length;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.elements__like-btn');
    this._likesCounter = this._element.querySelector('.elements__likesCounter');
    this._buttonDelete = this._element.querySelector('.elements__delete-btn');
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardTitle = this._element.querySelector('.elements__title');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._canDeleteCard();
    this._setEventListeners();
    return this._element;
  }
}
