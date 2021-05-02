import {initialCards} from './data.js'
import {Card} from './card.js'
import {FormValidator} from './validate.js';

const setupValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__inp',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_inactive',
    inputErrorClass: 'popup__inp_type_error',
    errorClass: 'popup__error_visible',
  }

  const cardSelector = '.card-template'

// переменные для pop-up редактирования профиля___________________
const popupEditBtn = document.querySelector('.profile__edit-btn');
const popupProfile = document.querySelector('.popup_type_profile');
const btnProfileClose = popupProfile.querySelector('.popup__close');
const formElementPro = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector("input[name='nameInput']");
const jobInput = popupProfile.querySelector("input[name='jobInput']");
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const popupList = document.querySelectorAll('.popup');
//переменные для pop-up добавления карточки___________________________
const popupAdd = document.querySelector('.popup_type_add');
const popupAddButton = document.querySelector('.profile__add-btn');
const formElementAdd = popupAdd.querySelector('.popup__form');
const cardButton = popupAdd.querySelector('.popup__btn-save');
const btnAddClose = popupAdd.querySelector('.popup__close');
const nameCardInput = popupAdd.querySelector("input[name='card-title']");;
const urlCardInput = popupAdd.querySelector("input[name='card-link']");
//переменные для pop-up картинки в большом масштабе______________
const popupWrapImage = document.querySelector('.popup_type_image');
const btnImgClose = popupWrapImage.querySelector('.popup__close');
const popupImage = popupWrapImage.querySelector('.popup__image');
const popupImageTitle = popupWrapImage.querySelector('.popup__image-title');
const elementContainer = document.querySelector('.elements')


const formAdd = new FormValidator(setupValidation, formElementAdd);
  formAdd.enableValidation();

const formProfile = new FormValidator(setupValidation, formElementPro);
  formProfile.enableValidation();
  

export const openPopup = popup => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscKey);
}

//функция закрите pop-up__________________________________________
const closePopup = popup => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscKey)
}

//закрытие pop-up по нажатию esc______________________________________
const closePopupByEscKey = event => {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_opened')
        closePopup(popup);
    }
}
//закрытие pop-up по оверлею____________________________________
const closePopupOverlay = event => {
    if (event.target !== event.currentTarget)
        return;
    closePopup(event.target);
}

// отрисовываем карточки из массива_________________________________
initialCards.forEach(data => {
    const card = new Card(data, cardSelector);
    const cardElement = card.generateCard();

    elementContainer.append(cardElement);
});
// обработчик формы окна редактирования профиля
function formSubmitHandler (event) {
    event.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupProfile);
};
// обработчик формы окна добавления карточки__________________
const handleAddCardFormSubmit = event => {
    event.preventDefault()
    
    const data = { 
        name : nameCardInput.value,
        link :  urlCardInput.value,
    }
    const card = new Card(data, cardSelector)
    const cardElement = card.generateCard();

    elementContainer.prepend(cardElement)
    formElementAdd.reset();
    cardButton.classList.add('popup__btn-save_inactive');
    cardButton.setAttribute('disabled', true);
    closePopup(popupAdd);
    

}
popupEditBtn.addEventListener('click', function() {
    openPopup(popupProfile);

    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
});
popupAddButton.addEventListener('click', function() {
    openPopup(popupAdd);
})

formElementPro.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', handleAddCardFormSubmit);
btnProfileClose.addEventListener('click', () => closePopup(popupProfile));
btnAddClose.addEventListener('click', () => closePopup(popupAdd));
btnImgClose.addEventListener('click', () => closePopup(popupWrapImage));
popupProfile.addEventListener('mousedown', closePopupOverlay);
popupAdd.addEventListener('mousedown', closePopupOverlay);
popupWrapImage.addEventListener('mousedown', closePopupOverlay);
