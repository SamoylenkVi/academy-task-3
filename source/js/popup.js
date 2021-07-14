'use strict';

const keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const page = document.querySelector('body');
const buttonPopupOpen = document.querySelector('.header__button');
const popup = document.querySelector('.popup');
const popupUnderlay = popup.querySelector('.popup__underlay');
const popupButtonClose = popup.querySelector('.popup__close');
const inputName = popup.querySelector('input[name="username"]');
const isPopupExist = popup && buttonPopupOpen && popupUnderlay && popupButtonClose && inputName;

const focusTrap = window.focusTrap;
const trap = focusTrap.createFocusTrap(popup, {initialFocus: inputName});

const openPopupHandler = (evt) => {
  evt.preventDefault();

  page.style.overflow = 'hidden';
  popup.style.display = 'block';

  popupUnderlay.addEventListener('click', closePopupHandler);
  popupButtonClose.addEventListener('click', closePopupHandler);
  document.addEventListener('keydown', escapeKeydownHandler);

  trap.activate();
};

const closePopupHandler = (evt) => {
  evt.preventDefault();

  page.style.overflow = 'auto';
  popup.style.display = 'none';

  popupUnderlay.removeEventListener('click', closePopupHandler);
  popupButtonClose.removeEventListener('click', closePopupHandler);
  document.removeEventListener('keydown', escapeKeydownHandler);

  trap.deactivate();
};

const escapeKeydownHandler = (evt) => {
  if (evt.key === keys.ESCAPE || evt.key === keys.ESC) {
    closePopupHandler(evt);
  }
};

if (isPopupExist) {
  buttonPopupOpen.addEventListener('click', openPopupHandler);
}
