// исходный массив данный для карт__________________________________
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
// переменные для pop-up редактирования профиля___________________
const popupEditBtn = document.querySelector('.profile__edit-btn');
const popupProfile = document.querySelector('.popup_type_profile');
const formElement = document.querySelector("form[name='editProfile']");
const nameInput = document.querySelector("input[name='nameInput']");
const jobInput = document.querySelector("input[name='jobInput']");
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');

//переменные для pop-up добавления карточки___________________________
const popupAdd = document.querySelector('.popup_type_add');
const popupAddButton = document.querySelector('.profile__add-btn');
const formElementAdd = popupAdd.querySelector("form[name='addCard']");
const nameCardInput = popupAdd.querySelector("input[name='card-title']");;
const urlCardInput = popupAdd.querySelector("input[name='card-link']");
//переменные для pop-up картинки в большом масштабе______________
const popupWrapImage = document.querySelector('.popup_type_image');
const popupImage = popupWrapImage.querySelector('.popup__image');
const popupImageTitle = popupWrapImage.querySelector('.popup__image-title');
//переменная всех кнопок закрытия pop-up_________________________
const popupCloseButtonAll = document.querySelectorAll('.popup-close');
//функция закрите pop-up__________________________________________
const closePopup = () => {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscKey);
}

popupCloseButtonAll.forEach(button => {
    button.addEventListener('click', closePopup)
});

//переменные карточек________________________________________
const cardItemTemplate = document.querySelector('#card').content;
const elementContainer = document.querySelector('.elements')

// создаём карточку_____________________________________________
const createCard = (nameCard, urlCard) => {
    const cardElement = cardItemTemplate.cloneNode(true);
    const likeButton = cardElement.querySelector('.elements__like-btn');
    const imageElement = cardElement.querySelector('.elements__image');
    const deleteIcon = cardElement.querySelector('.elements__delete-btn');

    imageElement.src = urlCard;
    imageElement.alt = nameCard;
    cardElement.querySelector('.elements__title').textContent = nameCard;

    // слушатели___________________________________________________
    imageElement.addEventListener('click', function() {
        openPopup(popupWrapImage);
        popupImage.src = imageElement.src;
        popupImageTitle.textContent = imageElement.alt;
    });

    deleteIcon.addEventListener('click', function() {
        deleteIcon.closest('.elements__card').remove();
    });

    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('elements__like-btn_active');
    });

    return cardElement;
}

const addCardToContainer = (elementContainer, cardElement) => {
    elementContainer.prepend(cardElement);
}

// отрисовываем карточки из массива_________________________________
initialCards.forEach(card => {
    const cardElement = createCard(card.name, card.link);

    addCardToContainer(elementContainer, cardElement);
});

const openPopup = popup => {
    popup.classList.add('popup_opened');
}

// обработчик формы окна редактирования профиля
formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup();
};

//слушатель pop-up редактирования профиля
popupEditBtn.addEventListener('click', function() {
    openPopup(popupProfile);

    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
});


popupAddButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    openPopup(popupAdd);
});

// обработчик формы окна добавления карточки__________________

const handleAddCardFormSubmit = event => {
    event.preventDefault()

    const nameCard = nameCardInput.value;
    const urlCard =  urlCardInput.value;
    const elementItem = createCard(nameCard, urlCard);

    addCardToContainer(elementContainer, elementItem);
    formElementAdd.reset();
    closePopup();

}
formElementAdd.addEventListener('submit', handleAddCardFormSubmit);