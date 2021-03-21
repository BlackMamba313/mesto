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

// Находим форму в DOM
let formElement = document.querySelector('.popup__container')
// Находим поля формы в DOM
    let nameInput = document.querySelector('name' , 'nameInput')
    let jobInput = document.querySelector('name' , 'jobInput')

    function formSubmitHandler (evt) {
        event.preventDefault();

        // Получите значение полей jobInput и nameInput из свойства value
        document.querySelector("input[name='nameInput']").value
        document.querySelector("input[name='jobInput']").value
        // Выберите элементы, куда должны быть вставлены значения полей

        // Вставьте новые значения с помощью textContent
    }

formElement.addEventListener('submit', formSubmitHandler);

console.log(jobInput)