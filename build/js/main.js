'use strict';
const accordions = document.querySelectorAll('.footer__accordion');

const toggleVisibility = (evt) => {
  if (evt.target.classList.contains('footer__button')) {
    accordions.forEach((accordion) => {
      if (evt.currentTarget !== accordion) {
        accordion.classList.add('footer__accordion--close');
        accordion.querySelector('.footer__button').classList.remove('footer__button--close');
      }
    });

    evt.target.classList.toggle('footer__button--close');
    evt.currentTarget.classList.toggle('footer__accordion--close');
  }
};

if (accordions && accordions.length > 0) {
  accordions.forEach((accordion) => {
    accordion.classList.add('footer__accordion--close');
    accordion.addEventListener('click', toggleVisibility);
  });
}

'use strict';

const PHONE_CODE = '+7(';

const regexPhoneSubmit = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
const regexPhoneInput = new RegExp(/\+?7?\(?([0-9]{0,3})\)?([0-9]{0,3})\-?([0-9]{0,2})\-?([0-9]{0,2})/, 'g');
const mainPhone = document.querySelector('#phone');
const mainName = document.querySelector('#name');
const mainForm = document.querySelector('section.form form');
const popupPhone = document.querySelector('#popup-phone');
const popupName = document.querySelector('#popup-name');
const popupForm = document.querySelector('section.popup form');

const focusPhoneHandler = (evt) => {
  if (evt.target.value.length === 0) {
    evt.target.value = PHONE_CODE;
  }
};

const maskPhoneHandler = (evt) => {

  const [, group1, group2, group3, group4] = Array.from(evt.target.value.matchAll(regexPhoneInput))[0];

  evt.target.value = PHONE_CODE;

  if (group1) {
    evt.target.value += group1;
  }

  if (group2) {
    evt.target.value += `)${group2}`;
  }

  if (group3) {
    evt.target.value += `-${group3}`;
  }

  if (group4) {
    evt.target.value += `-${group4}`;
  }
};

const toggleValidation = (input, isValid) => {

  if (!isValid) {
    input.classList.add('invalid');
  } else {
    input.classList.remove('invalid');
  }
};

const validate = (inputPhone, inputName, form) => {
  if (inputPhone) {
    inputPhone.addEventListener('focus', focusPhoneHandler);
    inputPhone.addEventListener('input', maskPhoneHandler);
  }
  if (form && inputName && inputPhone) {
    form.setAttribute('novalidate', 'novalidate');
    form.addEventListener('submit', (evt) => {

      const isPhoneValid = inputPhone.value.search(regexPhoneSubmit) !== -1;
      const isNameValid = inputName.value.length !== 0;

      if (!isPhoneValid || !isNameValid) {
        evt.preventDefault();
      }

      toggleValidation(inputPhone, isPhoneValid);
      toggleValidation(inputName, isNameValid);

    });
  }
};

validate(mainPhone, mainName, mainForm);
validate(popupPhone, popupName, popupForm);

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbnMuanMiLCJmb3JtLmpzIiwicG9wdXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5jb25zdCBhY2NvcmRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvb3Rlcl9fYWNjb3JkaW9uJyk7XG5cbmNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSAoZXZ0KSA9PiB7XG4gIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZm9vdGVyX19idXR0b24nKSkge1xuICAgIGFjY29yZGlvbnMuZm9yRWFjaCgoYWNjb3JkaW9uKSA9PiB7XG4gICAgICBpZiAoZXZ0LmN1cnJlbnRUYXJnZXQgIT09IGFjY29yZGlvbikge1xuICAgICAgICBhY2NvcmRpb24uY2xhc3NMaXN0LmFkZCgnZm9vdGVyX19hY2NvcmRpb24tLWNsb3NlJyk7XG4gICAgICAgIGFjY29yZGlvbi5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19idXR0b24nKS5jbGFzc0xpc3QucmVtb3ZlKCdmb290ZXJfX2J1dHRvbi0tY2xvc2UnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGV2dC50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnZm9vdGVyX19idXR0b24tLWNsb3NlJyk7XG4gICAgZXZ0LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnZm9vdGVyX19hY2NvcmRpb24tLWNsb3NlJyk7XG4gIH1cbn07XG5cbmlmIChhY2NvcmRpb25zICYmIGFjY29yZGlvbnMubGVuZ3RoID4gMCkge1xuICBhY2NvcmRpb25zLmZvckVhY2goKGFjY29yZGlvbikgPT4ge1xuICAgIGFjY29yZGlvbi5jbGFzc0xpc3QuYWRkKCdmb290ZXJfX2FjY29yZGlvbi0tY2xvc2UnKTtcbiAgICBhY2NvcmRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVWaXNpYmlsaXR5KTtcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFBIT05FX0NPREUgPSAnKzcoJztcblxuY29uc3QgcmVnZXhQaG9uZVN1Ym1pdCA9IC9eKFxcKzd8OCk/W1xcc1xcLV0/XFwoP1swLTldezN9XFwpP1tcXHNcXC1dP1swLTldezN9W1xcc1xcLV0/WzAtOV17Mn1bXFxzXFwtXT9bMC05XXsyfSQvO1xuY29uc3QgcmVnZXhQaG9uZUlucHV0ID0gbmV3IFJlZ0V4cCgvXFwrPzc/XFwoPyhbMC05XXswLDN9KVxcKT8oWzAtOV17MCwzfSlcXC0/KFswLTldezAsMn0pXFwtPyhbMC05XXswLDJ9KS8sICdnJyk7XG5jb25zdCBtYWluUGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGhvbmUnKTtcbmNvbnN0IG1haW5OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hbWUnKTtcbmNvbnN0IG1haW5Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2VjdGlvbi5mb3JtIGZvcm0nKTtcbmNvbnN0IHBvcHVwUGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtcGhvbmUnKTtcbmNvbnN0IHBvcHVwTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cC1uYW1lJyk7XG5jb25zdCBwb3B1cEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uLnBvcHVwIGZvcm0nKTtcblxuY29uc3QgZm9jdXNQaG9uZUhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gIGlmIChldnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIGV2dC50YXJnZXQudmFsdWUgPSBQSE9ORV9DT0RFO1xuICB9XG59O1xuXG5jb25zdCBtYXNrUGhvbmVIYW5kbGVyID0gKGV2dCkgPT4ge1xuXG4gIGNvbnN0IFssIGdyb3VwMSwgZ3JvdXAyLCBncm91cDMsIGdyb3VwNF0gPSBBcnJheS5mcm9tKGV2dC50YXJnZXQudmFsdWUubWF0Y2hBbGwocmVnZXhQaG9uZUlucHV0KSlbMF07XG5cbiAgZXZ0LnRhcmdldC52YWx1ZSA9IFBIT05FX0NPREU7XG5cbiAgaWYgKGdyb3VwMSkge1xuICAgIGV2dC50YXJnZXQudmFsdWUgKz0gZ3JvdXAxO1xuICB9XG5cbiAgaWYgKGdyb3VwMikge1xuICAgIGV2dC50YXJnZXQudmFsdWUgKz0gYCkke2dyb3VwMn1gO1xuICB9XG5cbiAgaWYgKGdyb3VwMykge1xuICAgIGV2dC50YXJnZXQudmFsdWUgKz0gYC0ke2dyb3VwM31gO1xuICB9XG5cbiAgaWYgKGdyb3VwNCkge1xuICAgIGV2dC50YXJnZXQudmFsdWUgKz0gYC0ke2dyb3VwNH1gO1xuICB9XG59O1xuXG5jb25zdCB0b2dnbGVWYWxpZGF0aW9uID0gKGlucHV0LCBpc1ZhbGlkKSA9PiB7XG5cbiAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnaW52YWxpZCcpO1xuICB9IGVsc2Uge1xuICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKTtcbiAgfVxufTtcblxuY29uc3QgdmFsaWRhdGUgPSAoaW5wdXRQaG9uZSwgaW5wdXROYW1lLCBmb3JtKSA9PiB7XG4gIGlmIChpbnB1dFBob25lKSB7XG4gICAgaW5wdXRQaG9uZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZvY3VzUGhvbmVIYW5kbGVyKTtcbiAgICBpbnB1dFBob25lLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgbWFza1Bob25lSGFuZGxlcik7XG4gIH1cbiAgaWYgKGZvcm0gJiYgaW5wdXROYW1lICYmIGlucHV0UGhvbmUpIHtcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbm92YWxpZGF0ZScsICdub3ZhbGlkYXRlJyk7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZ0KSA9PiB7XG5cbiAgICAgIGNvbnN0IGlzUGhvbmVWYWxpZCA9IGlucHV0UGhvbmUudmFsdWUuc2VhcmNoKHJlZ2V4UGhvbmVTdWJtaXQpICE9PSAtMTtcbiAgICAgIGNvbnN0IGlzTmFtZVZhbGlkID0gaW5wdXROYW1lLnZhbHVlLmxlbmd0aCAhPT0gMDtcblxuICAgICAgaWYgKCFpc1Bob25lVmFsaWQgfHwgIWlzTmFtZVZhbGlkKSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICB0b2dnbGVWYWxpZGF0aW9uKGlucHV0UGhvbmUsIGlzUGhvbmVWYWxpZCk7XG4gICAgICB0b2dnbGVWYWxpZGF0aW9uKGlucHV0TmFtZSwgaXNOYW1lVmFsaWQpO1xuXG4gICAgfSk7XG4gIH1cbn07XG5cbnZhbGlkYXRlKG1haW5QaG9uZSwgbWFpbk5hbWUsIG1haW5Gb3JtKTtcbnZhbGlkYXRlKHBvcHVwUGhvbmUsIHBvcHVwTmFtZSwgcG9wdXBGb3JtKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qga2V5cyA9IHtcbiAgRVNDQVBFOiAnRXNjYXBlJyxcbiAgRVNDOiAnRXNjJyxcbn07XG5cbmNvbnN0IGJ1dHRvblBvcHVwT3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2J1dHRvbicpO1xuY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcbmNvbnN0IHBvcHVwVW5kZXJsYXkgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3VuZGVybGF5Jyk7XG5jb25zdCBwb3B1cEJ1dHRvbkNsb3NlID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19jbG9zZScpO1xuY29uc3QgaW5wdXROYW1lID0gcG9wdXAucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInVzZXJuYW1lXCJdJyk7XG5jb25zdCBpc1BvcHVwRXhpc3QgPSBwb3B1cCAmJiBidXR0b25Qb3B1cE9wZW4gJiYgcG9wdXBVbmRlcmxheSAmJiBwb3B1cEJ1dHRvbkNsb3NlICYmIGlucHV0TmFtZTtcblxuY29uc3Qgb3BlblBvcHVwSGFuZGxlciA9IChldnQpID0+IHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIGlucHV0TmFtZS5mb2N1cygpO1xuXG4gIHBvcHVwVW5kZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwSGFuZGxlcik7XG4gIHBvcHVwQnV0dG9uQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwSGFuZGxlcik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlc2NhcGVLZXlkb3duSGFuZGxlcik7XG59O1xuXG5jb25zdCBjbG9zZVBvcHVwSGFuZGxlciA9IChldnQpID0+IHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICBwb3B1cFVuZGVybGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cEhhbmRsZXIpO1xuICBwb3B1cEJ1dHRvbkNsb3NlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cEhhbmRsZXIpO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXNjYXBlS2V5ZG93bkhhbmRsZXIpO1xufTtcblxuY29uc3QgZXNjYXBlS2V5ZG93bkhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gIGlmIChldnQua2V5ID09PSBrZXlzLkVTQ0FQRSB8fCBldnQua2V5ID09PSBrZXlzLkVTQykge1xuICAgIGNsb3NlUG9wdXBIYW5kbGVyKGV2dCk7XG4gIH1cbn07XG5cbmlmIChpc1BvcHVwRXhpc3QpIHtcbiAgYnV0dG9uUG9wdXBPcGVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblBvcHVwSGFuZGxlcik7XG59XG4iXX0=
