'use strict';

const keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const buttonPopupOpen = document.querySelector('.header__button');
const popup = document.querySelector('.popup');
const popupUnderlay = popup.querySelector('.popup__underlay');
const popupButtonClose = popup.querySelector('.popup__close');
const inputName = popup.querySelector('input[name="username"]');
const isPopupExist = popup && buttonPopupOpen && popupUnderlay && popupButtonClose && inputName;

const openPopupHandler = (evt) => {
  evt.preventDefault();

  popup.style.display = 'block';
  inputName.focus();

  popupUnderlay.addEventListener('click', closePopupHandler);
  popupButtonClose.addEventListener('click', closePopupHandler);
  document.addEventListener('keydown', escapeKeydownHandler);
};

const closePopupHandler = (evt) => {
  evt.preventDefault();

  popup.style.display = 'none';

  popupUnderlay.removeEventListener('click', closePopupHandler);
  popupButtonClose.removeEventListener('click', closePopupHandler);
  document.removeEventListener('keydown', escapeKeydownHandler);
};

const escapeKeydownHandler = (evt) => {
  if (evt.key === keys.ESCAPE || evt.key === keys.ESC) {
    closePopupHandler(evt);
  }
};

if (isPopupExist) {
  buttonPopupOpen.addEventListener('click', openPopupHandler);
}
