export const initialCards = [
    {
        placeName: 'Архыз',
        placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        placeName: 'Челябинская область',
        placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        placeName: 'Иваново',
        placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        placeName: 'Камчатка',
        placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        placeName: 'Холмогорский район',
        placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        placeName: 'Байкал',
        placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const setupValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__inp',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_inactive',
    inputErrorClass: 'popup__inp_type_error',
    errorClass: 'popup__error_visible',
  }

export const popupProfile = document.querySelector('.popup_type_profile');
export const formElementPro = popupProfile.querySelector('.popup__form');
export const popupAdd = document.querySelector('.popup_type_add');
export const formElementAdd = popupAdd.querySelector('.popup__form');