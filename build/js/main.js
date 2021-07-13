'use strict';

const H3_TAG_NAME = 'H3';

const accordions = document.querySelectorAll('.footer__accordion');

const toggleVisibility = (evt) => {
  const isTargetClicked = evt.target.tagName === H3_TAG_NAME || evt.target.classList.contains('footer__button');

  if (isTargetClicked) {
    accordions.forEach((accordion) => {
      if (evt.currentTarget !== accordion) {
        accordion.classList.add('footer__accordion--close');
        accordion.querySelector('.footer__button').classList.remove('footer__button--close');
      }
    });

    evt.currentTarget.querySelector('.footer__button').classList.toggle('footer__button--close');
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

const StorageKey = {
  PHONE_NUMBER: 'phoneNumber',
  USER_NAME: 'userName',
  QUESTION: 'question',
};

const PHONE_CODE = '+7(';

const regexPhoneSubmit = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
const regexPhoneInput = new RegExp(/\+?7?\(?([0-9]{0,3})\)?([0-9]{0,3})\-?([0-9]{0,2})\-?([0-9]{0,2})/, 'g');
const mainForm = document.querySelector('section.form form');
const mainPhone = mainForm.querySelector('#phone');
const mainName = mainForm.querySelector('#name');
const mainCheckbox = mainForm.querySelector('#agreement');
const popupForm = document.querySelector('section.popup form');
const popupPhone = popupForm.querySelector('#popup-phone');
const popupName = popupForm.querySelector('#popup-name');
const popupCheckbox = popupForm.querySelector('#popup-agreement');
const popupQuestion = popupForm.querySelector('#popup-question');

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

const submitFormHandler = (inputPhone, inputName, inputCheckbox, evt) => {
  const isPhoneValid = inputPhone.value.search(regexPhoneSubmit) !== -1;
  const isNameValid = inputName.value.length !== 0;

  if (!isPhoneValid || !isNameValid || !inputCheckbox.checked) {
    evt.preventDefault();
  }

  toggleValidation(inputPhone, isPhoneValid);
  toggleValidation(inputName, isNameValid);
};

const validate = (inputPhone, inputName, inputCheckbox, form) => {
  if (inputPhone) {
    inputPhone.addEventListener('focus', focusPhoneHandler);
    inputPhone.addEventListener('input', maskPhoneHandler);
  }
  if (form && inputName && inputPhone) {
    form.setAttribute('novalidate', 'novalidate');
    form.addEventListener('submit', (evt) => {
      submitFormHandler(inputPhone, inputName, inputCheckbox, evt);
    });
  }
};

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

validate(mainPhone, mainName, mainCheckbox, mainForm);
validate(popupPhone, popupName, popupCheckbox, popupForm);

setLocalStorage(popupPhone, StorageKey.PHONE_NUMBER);
setLocalStorage(popupName, StorageKey.USER_NAME);
setLocalStorage(popupQuestion, StorageKey.QUESTION);

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbnMuanMiLCJmb3JtLmpzIiwicG9wdXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBIM19UQUdfTkFNRSA9ICdIMyc7XG5cbmNvbnN0IGFjY29yZGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9vdGVyX19hY2NvcmRpb24nKTtcblxuY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IChldnQpID0+IHtcbiAgY29uc3QgaXNUYXJnZXRDbGlja2VkID0gZXZ0LnRhcmdldC50YWdOYW1lID09PSBIM19UQUdfTkFNRSB8fCBldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZm9vdGVyX19idXR0b24nKTtcblxuICBpZiAoaXNUYXJnZXRDbGlja2VkKSB7XG4gICAgYWNjb3JkaW9ucy5mb3JFYWNoKChhY2NvcmRpb24pID0+IHtcbiAgICAgIGlmIChldnQuY3VycmVudFRhcmdldCAhPT0gYWNjb3JkaW9uKSB7XG4gICAgICAgIGFjY29yZGlvbi5jbGFzc0xpc3QuYWRkKCdmb290ZXJfX2FjY29yZGlvbi0tY2xvc2UnKTtcbiAgICAgICAgYWNjb3JkaW9uLnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2J1dHRvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2Zvb3Rlcl9fYnV0dG9uLS1jbG9zZScpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXZ0LmN1cnJlbnRUYXJnZXQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fYnV0dG9uJykuY2xhc3NMaXN0LnRvZ2dsZSgnZm9vdGVyX19idXR0b24tLWNsb3NlJyk7XG4gICAgZXZ0LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnZm9vdGVyX19hY2NvcmRpb24tLWNsb3NlJyk7XG4gIH1cbn07XG5cbmlmIChhY2NvcmRpb25zICYmIGFjY29yZGlvbnMubGVuZ3RoID4gMCkge1xuICBhY2NvcmRpb25zLmZvckVhY2goKGFjY29yZGlvbikgPT4ge1xuICAgIGFjY29yZGlvbi5jbGFzc0xpc3QuYWRkKCdmb290ZXJfX2FjY29yZGlvbi0tY2xvc2UnKTtcbiAgICBhY2NvcmRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVWaXNpYmlsaXR5KTtcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFN0b3JhZ2VLZXkgPSB7XG4gIFBIT05FX05VTUJFUjogJ3Bob25lTnVtYmVyJyxcbiAgVVNFUl9OQU1FOiAndXNlck5hbWUnLFxuICBRVUVTVElPTjogJ3F1ZXN0aW9uJyxcbn07XG5cbmNvbnN0IFBIT05FX0NPREUgPSAnKzcoJztcblxuY29uc3QgcmVnZXhQaG9uZVN1Ym1pdCA9IC9eKFxcKzd8OCk/W1xcc1xcLV0/XFwoP1swLTldezN9XFwpP1tcXHNcXC1dP1swLTldezN9W1xcc1xcLV0/WzAtOV17Mn1bXFxzXFwtXT9bMC05XXsyfSQvO1xuY29uc3QgcmVnZXhQaG9uZUlucHV0ID0gbmV3IFJlZ0V4cCgvXFwrPzc/XFwoPyhbMC05XXswLDN9KVxcKT8oWzAtOV17MCwzfSlcXC0/KFswLTldezAsMn0pXFwtPyhbMC05XXswLDJ9KS8sICdnJyk7XG5jb25zdCBtYWluRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24uZm9ybSBmb3JtJyk7XG5jb25zdCBtYWluUGhvbmUgPSBtYWluRm9ybS5xdWVyeVNlbGVjdG9yKCcjcGhvbmUnKTtcbmNvbnN0IG1haW5OYW1lID0gbWFpbkZvcm0ucXVlcnlTZWxlY3RvcignI25hbWUnKTtcbmNvbnN0IG1haW5DaGVja2JveCA9IG1haW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJyNhZ3JlZW1lbnQnKTtcbmNvbnN0IHBvcHVwRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24ucG9wdXAgZm9ybScpO1xuY29uc3QgcG9wdXBQaG9uZSA9IHBvcHVwRm9ybS5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtcGhvbmUnKTtcbmNvbnN0IHBvcHVwTmFtZSA9IHBvcHVwRm9ybS5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtbmFtZScpO1xuY29uc3QgcG9wdXBDaGVja2JveCA9IHBvcHVwRm9ybS5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtYWdyZWVtZW50Jyk7XG5jb25zdCBwb3B1cFF1ZXN0aW9uID0gcG9wdXBGb3JtLnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cC1xdWVzdGlvbicpO1xuXG5jb25zdCBmb2N1c1Bob25lSGFuZGxlciA9IChldnQpID0+IHtcbiAgaWYgKGV2dC50YXJnZXQudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgZXZ0LnRhcmdldC52YWx1ZSA9IFBIT05FX0NPREU7XG4gIH1cbn07XG5cbmNvbnN0IG1hc2tQaG9uZUhhbmRsZXIgPSAoZXZ0KSA9PiB7XG5cbiAgY29uc3QgWywgZ3JvdXAxLCBncm91cDIsIGdyb3VwMywgZ3JvdXA0XSA9IEFycmF5LmZyb20oZXZ0LnRhcmdldC52YWx1ZS5tYXRjaEFsbChyZWdleFBob25lSW5wdXQpKVswXTtcblxuICBldnQudGFyZ2V0LnZhbHVlID0gUEhPTkVfQ09ERTtcblxuICBpZiAoZ3JvdXAxKSB7XG4gICAgZXZ0LnRhcmdldC52YWx1ZSArPSBncm91cDE7XG4gIH1cblxuICBpZiAoZ3JvdXAyKSB7XG4gICAgZXZ0LnRhcmdldC52YWx1ZSArPSBgKSR7Z3JvdXAyfWA7XG4gIH1cblxuICBpZiAoZ3JvdXAzKSB7XG4gICAgZXZ0LnRhcmdldC52YWx1ZSArPSBgLSR7Z3JvdXAzfWA7XG4gIH1cblxuICBpZiAoZ3JvdXA0KSB7XG4gICAgZXZ0LnRhcmdldC52YWx1ZSArPSBgLSR7Z3JvdXA0fWA7XG4gIH1cbn07XG5cbmNvbnN0IHRvZ2dsZVZhbGlkYXRpb24gPSAoaW5wdXQsIGlzVmFsaWQpID0+IHtcblxuICBpZiAoIWlzVmFsaWQpIHtcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkJyk7XG4gIH0gZWxzZSB7XG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZCcpO1xuICB9XG59O1xuXG5jb25zdCBzdWJtaXRGb3JtSGFuZGxlciA9IChpbnB1dFBob25lLCBpbnB1dE5hbWUsIGlucHV0Q2hlY2tib3gsIGV2dCkgPT4ge1xuICBjb25zdCBpc1Bob25lVmFsaWQgPSBpbnB1dFBob25lLnZhbHVlLnNlYXJjaChyZWdleFBob25lU3VibWl0KSAhPT0gLTE7XG4gIGNvbnN0IGlzTmFtZVZhbGlkID0gaW5wdXROYW1lLnZhbHVlLmxlbmd0aCAhPT0gMDtcblxuICBpZiAoIWlzUGhvbmVWYWxpZCB8fCAhaXNOYW1lVmFsaWQgfHwgIWlucHV0Q2hlY2tib3guY2hlY2tlZCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgdG9nZ2xlVmFsaWRhdGlvbihpbnB1dFBob25lLCBpc1Bob25lVmFsaWQpO1xuICB0b2dnbGVWYWxpZGF0aW9uKGlucHV0TmFtZSwgaXNOYW1lVmFsaWQpO1xufTtcblxuY29uc3QgdmFsaWRhdGUgPSAoaW5wdXRQaG9uZSwgaW5wdXROYW1lLCBpbnB1dENoZWNrYm94LCBmb3JtKSA9PiB7XG4gIGlmIChpbnB1dFBob25lKSB7XG4gICAgaW5wdXRQaG9uZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZvY3VzUGhvbmVIYW5kbGVyKTtcbiAgICBpbnB1dFBob25lLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgbWFza1Bob25lSGFuZGxlcik7XG4gIH1cbiAgaWYgKGZvcm0gJiYgaW5wdXROYW1lICYmIGlucHV0UGhvbmUpIHtcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbm92YWxpZGF0ZScsICdub3ZhbGlkYXRlJyk7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZ0KSA9PiB7XG4gICAgICBzdWJtaXRGb3JtSGFuZGxlcihpbnB1dFBob25lLCBpbnB1dE5hbWUsIGlucHV0Q2hlY2tib3gsIGV2dCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IHNldExvY2FsU3RvcmFnZSA9IChlbGVtZW50LCBzdG9yYWdlS2V5KSA9PiB7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgY29uc3Qgc3RvcmFnZVZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmFnZUtleSk7XG4gICAgaWYgKHN0b3JhZ2VWYWx1ZSkge1xuICAgICAgZWxlbWVudC52YWx1ZSA9IHN0b3JhZ2VWYWx1ZTtcbiAgICB9XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldnQpID0+IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIGV2dC50YXJnZXQudmFsdWUpO1xuICAgIH0pO1xuICB9XG59O1xuXG52YWxpZGF0ZShtYWluUGhvbmUsIG1haW5OYW1lLCBtYWluQ2hlY2tib3gsIG1haW5Gb3JtKTtcbnZhbGlkYXRlKHBvcHVwUGhvbmUsIHBvcHVwTmFtZSwgcG9wdXBDaGVja2JveCwgcG9wdXBGb3JtKTtcblxuc2V0TG9jYWxTdG9yYWdlKHBvcHVwUGhvbmUsIFN0b3JhZ2VLZXkuUEhPTkVfTlVNQkVSKTtcbnNldExvY2FsU3RvcmFnZShwb3B1cE5hbWUsIFN0b3JhZ2VLZXkuVVNFUl9OQU1FKTtcbnNldExvY2FsU3RvcmFnZShwb3B1cFF1ZXN0aW9uLCBTdG9yYWdlS2V5LlFVRVNUSU9OKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qga2V5cyA9IHtcbiAgRVNDQVBFOiAnRXNjYXBlJyxcbiAgRVNDOiAnRXNjJyxcbn07XG5cbmNvbnN0IGJ1dHRvblBvcHVwT3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2J1dHRvbicpO1xuY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcbmNvbnN0IHBvcHVwVW5kZXJsYXkgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3VuZGVybGF5Jyk7XG5jb25zdCBwb3B1cEJ1dHRvbkNsb3NlID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19jbG9zZScpO1xuY29uc3QgaW5wdXROYW1lID0gcG9wdXAucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInVzZXJuYW1lXCJdJyk7XG5jb25zdCBpc1BvcHVwRXhpc3QgPSBwb3B1cCAmJiBidXR0b25Qb3B1cE9wZW4gJiYgcG9wdXBVbmRlcmxheSAmJiBwb3B1cEJ1dHRvbkNsb3NlICYmIGlucHV0TmFtZTtcblxuY29uc3Qgb3BlblBvcHVwSGFuZGxlciA9IChldnQpID0+IHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIGlucHV0TmFtZS5mb2N1cygpO1xuXG4gIHBvcHVwVW5kZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwSGFuZGxlcik7XG4gIHBvcHVwQnV0dG9uQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwSGFuZGxlcik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlc2NhcGVLZXlkb3duSGFuZGxlcik7XG59O1xuXG5jb25zdCBjbG9zZVBvcHVwSGFuZGxlciA9IChldnQpID0+IHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICBwb3B1cFVuZGVybGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cEhhbmRsZXIpO1xuICBwb3B1cEJ1dHRvbkNsb3NlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cEhhbmRsZXIpO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXNjYXBlS2V5ZG93bkhhbmRsZXIpO1xufTtcblxuY29uc3QgZXNjYXBlS2V5ZG93bkhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gIGlmIChldnQua2V5ID09PSBrZXlzLkVTQ0FQRSB8fCBldnQua2V5ID09PSBrZXlzLkVTQykge1xuICAgIGNsb3NlUG9wdXBIYW5kbGVyKGV2dCk7XG4gIH1cbn07XG5cbmlmIChpc1BvcHVwRXhpc3QpIHtcbiAgYnV0dG9uUG9wdXBPcGVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblBvcHVwSGFuZGxlcik7XG59XG4iXX0=
