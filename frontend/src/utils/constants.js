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

const profilePopup = document.querySelector('.popup_type_edit-profile');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupCard = document.querySelector('.cardpopup');

const buttonOpenPopupCard = document.querySelector('.profile__add-button');
const formCard = document.querySelector('.cardpopup__container');
const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_profession');
const inputNameCard = document.querySelector('.cardpopup__input_data_name');
const linkInput = document.querySelector('.cardpopup__input_data_link');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupImage = document.querySelector('.imagepopup');
const elements = document.querySelector('.elements');
const formEditProfile = document.querySelector('.popup__container');
const popupElems = document.querySelectorAll('.popup');
const cardConteinerSelector = document.querySelector(".elements");
const templateSelector = "#cards__template";
const token = 'd006c78b-efd3-4cba-bbbb-e659c9b51ae0';
const url = 'http://localhost:3000/';
const avatarEdit = document.querySelector('.profile__avatar-edit');

const avatarPopup = document.querySelector('.avatarpopup');

export { avatarPopup, avatarEdit, token, url, buttonOpenPopupProfile, closeButtons, nameInput, jobInput, profileName, profileProfession, popupImage, formEditProfile, popupElems, templateSelector, cardConteinerSelector, inputNameCard, linkInput, buttonOpenPopupCard, elements, popupCard, formCard, profilePopup, initialCards }


