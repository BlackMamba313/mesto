import Section from '../scripts/Section.js';
import {initialCards, setupValidation, popupProfile, 
formElementPro, popupAdd, formElementAdd} from '../utils/data.js'
import Card from '../scripts/Сard.js'
import FormValidator from '../scripts/FormValidator.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import './index.css'

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

// функции открытия формы профиля/сабмита формы профиля
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

//функция сброса кнопки сабмита формы
function btndisabled(popup) {
  popup.querySelector('.popup__btn-save').classList
  .add('popup__btn-save_inactive');
  popup.querySelector('.popup__btn-save')
  .setAttribute('disabled', true);
}

// функции открытия формы карточки/сабмита формы карточки/открытия большой картинки
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