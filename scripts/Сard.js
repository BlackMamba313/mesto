import PopupWithImage from './PopupWithImage.js';
export default class Card {  
  constructor(data, cardSelector, handleCardClick) { 
	const {placeName, placeLink} = data
  this._name = placeName;
	this._link = placeLink;
	this._cardSelector = cardSelector;
  this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector)
      .content.querySelector('.elements__card')
      .cloneNode(true);
      
    return cardElement;
    }

  _setEventListeners() {
    this._element.querySelector('.elements__image')
    .addEventListener('click', () => this._handleCardClick(this._name, this._link));
    
    this._element.querySelector('.elements__delete-btn')
    .addEventListener('click', () => this._handleDeliteIcon());
    
    this._element.querySelector('.elements__like-btn')
    .addEventListener('click', () => this._handleLikeIcon());
  }


  _handleLikeIcon() {
    this._element.querySelector('.elements__like-btn')
    .classList.toggle('elements__like-btn_active');
  }

  _handleDeliteIcon() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._setEventListeners();
    
    return this._element;     
  } 

    
}
