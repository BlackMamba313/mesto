let popupLink = document.querySelector('.popup-link');
let popup = document.querySelector('.popup');
let popupClosed = document.querySelector('.popup-close');
let formElement = document.querySelector("form[name='editProfile']");
let nameInput = document.querySelector("input[name='nameInput']");
let jobInput = document.querySelector("input[name='jobInput']");
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

function popupOpened() {
    popup.classList.add('popup_opened');
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
};

function popupClose() {
    popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupClose();
};

formElement.addEventListener('submit', formSubmitHandler);
popupClosed.addEventListener('click', popupClose);
popupLink.addEventListener('click', popupOpened);