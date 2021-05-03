import {openPopup} from './index.js';
export class Card {  
	constructor(data, cardSelector) { 
	    this._name = data.name;    
		this._link = data.link;    
		this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.elements__card')
          .cloneNode(true);
      
        return cardElement;
      }

    _setEventListeners() {
        const popupWrapImage = document.querySelector('.popup_type_image');
        const popupImage = popupWrapImage.querySelector('.popup__image');
        const popupImageTitle = popupWrapImage.querySelector('.popup__image-title');
        const likeButton = this._element.querySelector('.elements__like-btn');
        const imageElement = this._element.querySelector('.elements__image');
        const deleteIcon = this._element.querySelector('.elements__delete-btn');
        imageElement.addEventListener('click', function() {
            openPopup(popupWrapImage);
            popupImage.src = imageElement.src;
            popupImageTitle.textContent = imageElement.alt;
            popupImage.alt = imageElement.alt
    
        });
    
        deleteIcon.addEventListener('click', function() {
            deleteIcon.closest('.elements__card').remove();
        });
    
        likeButton.addEventListener('click', function() {
            likeButton.classList.toggle('elements__like-btn_active');
        });
    }

    generateCard() {
        this._element = this._getTemplate();
      
        // Добавим данные
        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__image').alt = this._name;
        this._element.querySelector('.elements__title').textContent = this._name;
        this._setEventListeners();
        // Вернём элемент наружу
        return this._element;
        
    } 

    
}
