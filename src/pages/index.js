import './index.css';
import Section from '../components/Section.js';
import {
  cardSection,
  inputs,
  popups,
  forms,
  buttons,
  profileConfig,
  validationConfig,
} from '../utils/constants.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupConfirm from '../components/PopupConfirm.js';
const userInfo = new UserInfo(profileConfig);

//подключаем Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'c1450c2c-a48c-4f63-ab99-b9b5f6aeb0cf',
    'Content-Type': 'application/json',
  },
});

//получаем информацию о юзере
let userId;
let cardsList;

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([userData, cards]) => {
  userId = userData._id;
  userInfo.setUserInfo(userData);
  cardsList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
      },
    },
    cardSection,
  );
  cardsList.renderItems();
});

function createCard(data) {
  const card = new Card({
    data: data,
    cardSelector: '.card-template',
    userId: userId,
    handlers: {
      handleCardClick: (title, link) => {
        popupImage.open(title, link);
      },
      handleLikeClick: (cardId, isLiked) => {
        api
          .likeCard(cardId, isLiked)
          .then((data, isLiked) => {
            card.setLikesInfo(data, isLiked);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleDeleteIconClick: (cardObject) => {
        popupConfirm.cardObject = cardObject;
        popupConfirm.open();
      },
    },
  });
  const cardElement = card.generateCard();
  card.markLikes(cardElement);
  card.updateLikes(cardElement);
  return cardElement;
}

function renderLoading(popup, isLoading) {
  const submitButton = popup.querySelector('.popup__btn-save');
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
}

const popupProfile = new PopupWithForm({
  popup: popups.profile,
  handleFormSubmit: (info) => {
    renderLoading(popups.profile, true);
    api
      .setUserInfo(info.name, info.job)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(popups.profile, false));
  },
});
buttons.profile.addEventListener('click', function () {
  const userData = userInfo.getUserInfo();
  inputs.name.value = userData.name;
  inputs.job.value = userData.job;
  formProfileValidation.removeErrors();
  formProfileValidation.disableSubmitButton();
  popupProfile.open();
});
const formProfileValidation = new FormValidator(validationConfig, forms.profile);
formProfileValidation.enableValidation();

const popupAvatar = new PopupWithForm({
  popup: popups.avatar,
  handleFormSubmit: (info) => {
    renderLoading(popups.avatar, true);
    api
      .setAvatar(info.avatarLink)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(popups.avatar, false));
  },
});
buttons.avatar.addEventListener('click', function () {
  popupAvatar.open();
});

const popupAddCard = new PopupWithForm({
  popup: popups.add,
  handleFormSubmit: (info) => {
    renderLoading(popups.add, true);
    api
      .postNewCard(info.title, info.link)
      .then((data) => {
        const cardElement = createCard(data);
        cardsList.addItem(cardElement);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(popups.add, false));
  },
});
buttons.add.addEventListener('click', function () {
  formAddCardValidation.removeErrors();
  formAddCardValidation.disableSubmitButton();
  popupAddCard.open();
});
const formAddCardValidation = new FormValidator(validationConfig, forms.add);
formAddCardValidation.enableValidation();

const popupImage = new PopupWithImage(popups.image);

const popupConfirm = new PopupConfirm({
  popup: popups.confirm,
  handleDeleteButtonClick: () => {
    console.log(popupConfirm);
    const cardId = popupConfirm.cardObject.getCardId();

    api
      .deleteCard(cardId)
      .then(() => {
        popupConfirm.cardObject.deleteCard();
        popupConfirm.close();
        popupConfirm.cardObject = '';
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
const formAvatarValidation = new FormValidator(validationConfig, forms.avatar);
formAvatarValidation.enableValidation();
// повесим слушатели
popupConfirm.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupAvatar.setEventListeners();
