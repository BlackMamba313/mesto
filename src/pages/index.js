//import './index.css';
import Section from '../components/Section.js';
import {
  cardSectionSelector,
  inputSelectors,
  popupSelectors,
  profileConfig,
  initialCards,
  configValidation,
  formElementProfile,
  formElementAdd,
} from '../utils/Сonstants.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//подключаем валидацию
const formAdd = new FormValidator(configValidation, formElementAdd);
formAdd.enableValidation();
const formProfile = new FormValidator(configValidation, formElementProfile);
formProfile.enableValidation();

// функция добавления карточки
function addNewCard(item) {
  const renderCard = new Card(item, '.card-template', openBigImage);
  const cardElement = renderCard.generateCard(item);
  sectionCards.addItem(cardElement);
}

// функции открытия формы профиля/сабмита формы профиля
function openFormProfile() {
  const data = userInfo.getUserInfo();
  document.querySelector(inputSelectors.name).value = data.userName;
  document.querySelector(inputSelectors.text).value = data.userJob;
  formProfile.disableBtnSend();
  profilePopup.open();
}
function sendFormProfile(values) {
  userInfo.setUserInfo(values);
}

// функции открытия формы карточки/сабмита формы карточки/открытия большой картинки
function openFormCard() {
  formAdd.disableBtnSend();
  addCardPopup.open();
}
function sendFormAdd(items) {
  addNewCard(items);
}
function openBigImage(placeName, placeLink) {
  popupWithImage.open(placeName, placeLink);
}

//создаём экземпляры классов
const sectionCards = new Section(initialCards, addNewCard, cardSectionSelector);
const userInfo = new UserInfo({
  userNameSelector: profileConfig.key1,
  userJobSelector: profileConfig.key2,
});
const popupWithImage = new PopupWithImage(popupSelectors.image);
const addCardPopup = new PopupWithForm(popupSelectors.add, sendFormAdd);
const profilePopup = new PopupWithForm(popupSelectors.profile, sendFormProfile);

// отрисовываем карточки
sectionCards.renderItems();

// повесим слушатели
profilePopup.setEventListeners();
popupWithImage.setEventListeners();
addCardPopup.setEventListeners();
document.querySelector('.profile__edit-btn').addEventListener('click', openFormProfile);
document.querySelector('.profile__add-btn').addEventListener('click', openFormCard);
