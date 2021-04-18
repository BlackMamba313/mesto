// переменные для pop-up редактирования профиля___________________
const openEditProfilePopupBtn = document.querySelector('.profile__edit-btn');
const popupProfile = document.querySelector('.popup_type_profile');
const btnProDel = popupProfile.querySelector('.popup__close');
const formEditProfile = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector("input[name='nameInput']");
const jobInput = popupProfile.querySelector("input[name='jobInput']");
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
//переменные для pop-up добавления карточки___________________________
const popupAdd = document.querySelector('.popup_type_add');
const popupAddButton = document.querySelector('.profile__add-btn');
const cardButton = popupAdd.querySelector('.popup__btn-save');
const formAddCard = popupAdd.querySelector('.popup__form');
const btnAddDel = popupAdd.querySelector('.popup__close');
const nameCardInput = popupAdd.querySelector("input[name='card-title']");
const urlCardInput = popupAdd.querySelector("input[name='card-link']");
//переменные для pop-up картинки в большом масштабе______________
const popupWrapImage = document.querySelector('.popup_type_image');
const btnImgDel = popupWrapImage.querySelector('.popup__close');
const popupImage = popupWrapImage.querySelector('.popup__image');
const popupImageTitle = popupWrapImage.querySelector('.popup__image-title');



const openPopup = popup => {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupByEscKey);
    document.addEventListener('keydown', handleEsc);
}

//функция закрите pop-up__________________________________________
const closePopup = popup => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscKey);
    popup.removeEventListener('click', closePopupOverlay);
}

//закрытие pop-up по оверлею____________________________________
const closePopupOverlay = event => {
    if (event.target !== event.currentTarget)
        return;
    closePopup(event.target);
}

const handleEsc = function(evt) {
    closePopupByEscKey(evt)
}

function closePopupByEscKey(evt) {
    const activePopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') { closePopup(activePopup);}
}
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
        popupImage.alt = imageElement.alt

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


// обработчик формы окна редактирования профиля
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

function formEditProfileSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupProfile);
}

//слушатель pop-up редактирования профиля
openEditProfilePopupBtn.addEventListener('click', function() {
    openPopup(popupProfile);
    formEditProfile.reset()
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
});


popupAddButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    formAddCard.reset()
    openPopup(popupAdd);
});

// обработчик формы окна добавления карточки__________________

const handleAddCardFormSubmit = event => {
    event.preventDefault()
    const nameCard = nameCardInput.value;
    const urlCard =  urlCardInput.value;
    const elementItem = createCard(nameCard, urlCard);

    addCardToContainer(elementContainer, elementItem);
    cardButton.classList.add('popup__btn-save_inactive');
    cardButton.setAttribute('disabled', true);
    closePopup(popupAdd);
}
formAddCard.addEventListener('submit', handleAddCardFormSubmit);
btnProDel.addEventListener('click', () => closePopup(popupProfile));
btnAddDel.addEventListener('click', () => closePopup(popupAdd));
btnImgDel.addEventListener('click', () => closePopup(popupWrapImage));

