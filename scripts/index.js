import Section from './Section.js';
import {initialCards} from './data.js'
import Card from './Сard.js'
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const popupProfile = document.querySelector('.popup_type_profile');
const formElementPro = popupProfile.querySelector('.popup__form');
const popupAdd = document.querySelector('.popup_type_add');
const formElementAdd = popupAdd.querySelector('.popup__form');


const setupValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__inp',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__inp_type_error',
  errorClass: 'popup__error_visible',
}

//подключаем валидацию
const formAdd = new FormValidator(setupValidation, formElementAdd);
formAdd.enableValidation();
const formProfile = new FormValidator(setupValidation, formElementPro);
formProfile.enableValidation();

//создаём экземпляры классов
const sectionCards = new Section(initialCards, renderer,'.elements');
const userInfo = new UserInfo({userName :'.profile__title', userJob: '.profile__subtitle'});
const popupWithImage = new PopupWithImage('.popup_type_image');
const addCardPopup = new PopupWithForm('.popup_type_add', addSubmitHandler);
const profilePopup = new PopupWithForm('.popup_type_profile', submitProfileHandler)
// функция рендера карточки
function renderer (item) {
  const renderCard = new Card(item, '.card-template', handleCardClick)
  const cardElement = renderCard.generateCard(item)
  sectionCards.addItem(cardElement)
}

function editButtonHandler() {
  
  userInfo.getUserInfo();
  const data = userInfo.getUserInfo()
  document.querySelector('.popup__inp_name').value = data.userName;
  document.querySelector('.popup__inp_text').value = data.userJob;
  btndisabled(popupProfile)
  profilePopup.open()
}

function submitProfileHandler(values){
  userInfo.setUserInfo(values);
}

function btndisabled(popup) {
  popup.querySelector('.popup__btn-save').classList
  .add('popup__btn-save_inactive');
  popup.querySelector('.popup__btn-save')
  .setAttribute('disabled', true);
}

// функции открытия формы карточки/сабмита формы карточки/
function addButtonHandler() { addCardPopup.open() }
function addSubmitHandler(items){
  renderer (items)
  btndisabled(popupAdd)
}
function handleCardClick(placeName, placeLink) {
  popupWithImage.open(placeName, placeLink)
}

// отрисовываем карточки
sectionCards.renderItems();

// повесим слушатели
profilePopup.setEventListeners();
popupWithImage.setEventListeners();
addCardPopup.setEventListeners();
document.querySelector('.profile__edit-btn')
.addEventListener('click', editButtonHandler)
document.querySelector('.profile__add-btn')
.addEventListener('click', addButtonHandler)