export const initialCards = [
  {
    placeName: 'Архыз',
    placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    placeName: 'Челябинская область',
    placeLink:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    placeName: 'Иваново',
    placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    placeName: 'Камчатка',
    placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    placeName: 'Холмогорский район',
    placeLink:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    placeName: 'Байкал',
    placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const popupProfile = document.querySelector('.popup_type_profile');
export const formElementProfile = popupProfile.querySelector('.popup__form');
export const popupAdd = document.querySelector('.popup_type_add');
export const formElementAdd = popupAdd.querySelector('.popup__form');
export const popupSelectors = {
  add: '.popup_type_add',
  profile: '.popup_type_profile',
  image: '.popup_type_image',
};
export const profileConfig = { key1: '.profile__title', key2: '.profile__subtitle' };
export const cardSectionSelector = '.elements';
export const inputSelectors = { name: '.popup__input_name', text: '.popup__input_text' };
