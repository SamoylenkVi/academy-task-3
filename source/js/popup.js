'use strict';
(function () {
  const keys = {
    ESCAPE: 'Escape',
    ESC: 'Esc',
  };

  const regExpMail = /^(?:[-a-z\d\+\*\/\?!{}~_%&'=^$#]+(?:\.[-a-z\d\+\*\/\?!{}~_%&'=^$#]+)*)@(?:[-a-z\d_]+\.){1,60}[a-z]{2,6}$/;

  const setPopup = () => {
    const popup = document.querySelector('.popup');

    if (!popup) {
      return;
    }

    const page = document.querySelector('body');
    const form = popup.querySelector('form');
    const popupOpen = document.querySelector('a[href="login.html"]');
    const popupUnderlay = popup.querySelector('.popup__underlay');
    const popupButtonClose = popup.querySelector('.popup__close');
    const inputMail = form.querySelector('input[name="e-mail"]');
    const inputPassword = popup.querySelector('input[name="password"]');

    const trap = window.focusTrap.createFocusTrap(popup, {initialFocus: inputMail});

    const toggleValidation = (input, isValid) => {
      if (!isValid) {
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
    };

    const openPopupHandler = (evt) => {
      evt.preventDefault();

      page.style.overflow = 'hidden';
      popup.style.display = 'block';

      popupUnderlay.addEventListener('click', closePopupHandler);
      popupButtonClose.addEventListener('click', closePopupHandler);
      form.addEventListener('submit', submitFormHandler);
      document.addEventListener('keydown', escapeKeydownHandler);

      trap.activate();
    };

    const closePopupHandler = (evt) => {
      evt.preventDefault();

      page.style.overflow = 'auto';
      popup.style.display = 'none';

      popupUnderlay.removeEventListener('click', closePopupHandler);
      popupButtonClose.removeEventListener('click', closePopupHandler);
      form.removeEventListener('submit', submitFormHandler);
      document.removeEventListener('keydown', escapeKeydownHandler);

      trap.deactivate();
    };

    const escapeKeydownHandler = (evt) => {
      if (evt.key === keys.ESCAPE || evt.key === keys.ESC) {
        closePopupHandler(evt);
      }
    };

    const submitFormHandler = (evt) => {
      const isMailValid = inputMail.value.search(regExpMail) !== -1;
      const isPasswordValid = inputPassword.value.length !== 0;

      if (!isMailValid || !isPasswordValid) {
        evt.preventDefault();
      }

      toggleValidation(inputMail, isMailValid);
      toggleValidation(inputPassword, isPasswordValid);
    };

    popupOpen.addEventListener('click', openPopupHandler);

    const setLocalStorage = (element, storageKey) => {
      if (element) {
        const storageValue = localStorage.getItem(storageKey);
        if (storageValue) {
          element.value = storageValue;
        }
        element.addEventListener('input', (evt) => {
          localStorage.setItem(storageKey, evt.target.value);
        });
      }
    };

    setLocalStorage(inputMail, 'Mail');
  };

  setPopup();
})();
