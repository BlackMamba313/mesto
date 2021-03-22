let popupLink = document.querySelector('.popup-link');
let popup = document.querySelector('.popup')
let popupClosed = document.querySelector('.popup-close');

function popupOpened() {
    popup.classList.add('popup_opened');
    event.preventDefault();
}

function popupClose() {
    popup.classList.remove('popup_opened');
    event.preventDefault();
}
popupClosed.addEventListener('click', popupClose);
popupLink.addEventListener('click', popupOpened);

let formElement = document.querySelector('.popup__container')
let nameInput = document.querySelector("input[name='nameInput']")
let jobInput = document.querySelector("input[name='jobInput']")

    function formSubmitHandler (evt) {
        evt.preventDefault();
        let nameValue = nameInput.value;
        let jobValue = jobInput.value;
        let name = document.querySelector('.profile__title');
        let job = document.querySelector('.profile__subtitle');
        name.textContent = nameValue;
        job.textContent = jobValue;
        popupClose();
    };

formElement.addEventListener('submit', formSubmitHandler);