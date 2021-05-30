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
    this._handleDeleteClick = handlers.handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._handleLikeClick(this._cardId, this.isLiked)
      .then((data) => {
        this._btnLike.classList.toggle('elements__like-btn_active');
        this.isLiked = !this.isLiked;
        this._likesCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    this._btnDelete.addEventListener('click', () => this._handleDeleteClick());
    this._btnLike.addEventListener('click', () => this._toggleLike());
  }

  _canDeleteCard() {
    if (this._userId !== this._ownerId) {
      this._btnDelete.classList.add('elements__delete-btn_hidden');
    } else {
      this._btnDelete.classList.remove('elements__delete-btn_hidden');
    }
  }

  markLikes() {
    if (this._likes.some((person) => person._id === this._userId)) {
      this._btnLike.classList.add('elements__like-btn_active');
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
    this._btnLike = this._element.querySelector('.elements__like-btn');
    this._likesCounter = this._element.querySelector('.elements__likesCounter');
    this._btnDelete = this._element.querySelector('.elements__delete-btn');
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
