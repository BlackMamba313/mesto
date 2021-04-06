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
let popupEditBtn = document.querySelector('.profile__edit-btn');
let popupProfile = document.querySelector('.popup-profile-edit');
let formElement = document.querySelector("form[name='editProfile']");
let nameInput = document.querySelector("input[name='nameInput']");
let jobInput = document.querySelector("input[name='jobInput']");
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

//переменные для pop-up добавления карточки___________________________
let popupAdd = document.querySelector('.popup-card-add');
let popupAddButton = document.querySelector('.profile__add-btn');
let formElementAdd = popupAdd.querySelector("form[name='addCard']");
let nameCardInput = popupAdd.querySelector("input[name='card-title']");;
let urlCardInput = popupAdd.querySelector("input[name='card-link']");
//переменные для pop-up картинки в большом масштабе______________
let popupWrapImage = document.querySelector('.popup-image');
let popupImage = popupWrapImage.querySelector('.popup__image');
let popupImageTitle = popupWrapImage.querySelector('.popup__image-title');
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
//закрытие pop-up по нажатию esc______________________________________
const closePopupByEscKey = evt => {
    if (evt.keyCode === 27) {
        closePopup();
    }
}
//закрытие pop-up по оверлею____________________________________
const closePopupOverlay = event => {
    if (event.target !== event.currentTarget)

        return;

    closePopup(event.target);
}
popupEditBtn.addEventListener('mousedown', closePopupOverlay);
popupAdd.addEventListener('mousedown', closePopupOverlay);
popupWrapImage.addEventListener('mousedown', closePopupOverlay);



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
    document.addEventListener('keydown', closePopupByEscKey);
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