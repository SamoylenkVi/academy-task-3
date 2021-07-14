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
const mainAgreementCheck = mainForm.querySelector('.form__agreement');
const mainCheckbox = mainForm.querySelector('#agreement');
const popupForm = document.querySelector('section.popup form');
const popupPhone = popupForm.querySelector('#popup-phone');
const popupName = popupForm.querySelector('#popup-name');
const popupCheckbox = popupForm.querySelector('#popup-agreement');
const popupAgreementCheck = popupForm.querySelector('.popup__agreement');
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

const submitFormHandler = (inputPhone, inputName, inputCheckbox, wrapperCheckbox, evt) => {
  const isPhoneValid = inputPhone.value.search(regexPhoneSubmit) !== -1;
  const isNameValid = inputName.value.length !== 0;
  const isCheckboxValid = inputCheckbox.checked;

  if (!isPhoneValid || !isNameValid || !isCheckboxValid) {
    evt.preventDefault();
  }
  toggleValidation(wrapperCheckbox, isCheckboxValid);
  toggleValidation(inputPhone, isPhoneValid);
  toggleValidation(inputName, isNameValid);
};

const validate = (inputPhone, inputName, inputCheckbox, wrapperCheckbox, form) => {
  if (inputPhone) {
    inputPhone.addEventListener('focus', focusPhoneHandler);
    inputPhone.addEventListener('input', maskPhoneHandler);
  }
  if (form && inputName && inputPhone && inputCheckbox) {
    form.setAttribute('novalidate', 'novalidate');
    form.addEventListener('submit', (evt) => {
      submitFormHandler(inputPhone, inputName, inputCheckbox, wrapperCheckbox, evt);
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

validate(mainPhone, mainName, mainCheckbox, mainAgreementCheck, mainForm);
validate(popupPhone, popupName, popupCheckbox, popupAgreementCheck, popupForm);

setLocalStorage(popupPhone, StorageKey.PHONE_NUMBER);
setLocalStorage(popupName, StorageKey.USER_NAME);
setLocalStorage(popupQuestion, StorageKey.QUESTION);

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbnMuanMiLCJmb3JtLmpzIiwicG9wdXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgSDNfVEFHX05BTUUgPSAnSDMnO1xuXG5jb25zdCBhY2NvcmRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvb3Rlcl9fYWNjb3JkaW9uJyk7XG5cbmNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSAoZXZ0KSA9PiB7XG4gIGNvbnN0IGlzVGFyZ2V0Q2xpY2tlZCA9IGV2dC50YXJnZXQudGFnTmFtZSA9PT0gSDNfVEFHX05BTUUgfHwgZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Zvb3Rlcl9fYnV0dG9uJyk7XG5cbiAgaWYgKGlzVGFyZ2V0Q2xpY2tlZCkge1xuICAgIGFjY29yZGlvbnMuZm9yRWFjaCgoYWNjb3JkaW9uKSA9PiB7XG4gICAgICBpZiAoZXZ0LmN1cnJlbnRUYXJnZXQgIT09IGFjY29yZGlvbikge1xuICAgICAgICBhY2NvcmRpb24uY2xhc3NMaXN0LmFkZCgnZm9vdGVyX19hY2NvcmRpb24tLWNsb3NlJyk7XG4gICAgICAgIGFjY29yZGlvbi5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19idXR0b24nKS5jbGFzc0xpc3QucmVtb3ZlKCdmb290ZXJfX2J1dHRvbi0tY2xvc2UnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGV2dC5jdXJyZW50VGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2J1dHRvbicpLmNsYXNzTGlzdC50b2dnbGUoJ2Zvb3Rlcl9fYnV0dG9uLS1jbG9zZScpO1xuICAgIGV2dC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2Zvb3Rlcl9fYWNjb3JkaW9uLS1jbG9zZScpO1xuICB9XG59O1xuXG5pZiAoYWNjb3JkaW9ucyAmJiBhY2NvcmRpb25zLmxlbmd0aCA+IDApIHtcbiAgYWNjb3JkaW9ucy5mb3JFYWNoKChhY2NvcmRpb24pID0+IHtcbiAgICBhY2NvcmRpb24uY2xhc3NMaXN0LmFkZCgnZm9vdGVyX19hY2NvcmRpb24tLWNsb3NlJyk7XG4gICAgYWNjb3JkaW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlVmlzaWJpbGl0eSk7XG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBTdG9yYWdlS2V5ID0ge1xuICBQSE9ORV9OVU1CRVI6ICdwaG9uZU51bWJlcicsXG4gIFVTRVJfTkFNRTogJ3VzZXJOYW1lJyxcbiAgUVVFU1RJT046ICdxdWVzdGlvbicsXG59O1xuXG5jb25zdCBQSE9ORV9DT0RFID0gJys3KCc7XG5cbmNvbnN0IHJlZ2V4UGhvbmVTdWJtaXQgPSAvXihcXCs3fDgpP1tcXHNcXC1dP1xcKD9bMC05XXszfVxcKT9bXFxzXFwtXT9bMC05XXszfVtcXHNcXC1dP1swLTldezJ9W1xcc1xcLV0/WzAtOV17Mn0kLztcbmNvbnN0IHJlZ2V4UGhvbmVJbnB1dCA9IG5ldyBSZWdFeHAoL1xcKz83P1xcKD8oWzAtOV17MCwzfSlcXCk/KFswLTldezAsM30pXFwtPyhbMC05XXswLDJ9KVxcLT8oWzAtOV17MCwyfSkvLCAnZycpO1xuY29uc3QgbWFpbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uLmZvcm0gZm9ybScpO1xuY29uc3QgbWFpblBob25lID0gbWFpbkZvcm0ucXVlcnlTZWxlY3RvcignI3Bob25lJyk7XG5jb25zdCBtYWluTmFtZSA9IG1haW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJyNuYW1lJyk7XG5jb25zdCBtYWluQWdyZWVtZW50Q2hlY2sgPSBtYWluRm9ybS5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fYWdyZWVtZW50Jyk7XG5jb25zdCBtYWluQ2hlY2tib3ggPSBtYWluRm9ybS5xdWVyeVNlbGVjdG9yKCcjYWdyZWVtZW50Jyk7XG5jb25zdCBwb3B1cEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uLnBvcHVwIGZvcm0nKTtcbmNvbnN0IHBvcHVwUGhvbmUgPSBwb3B1cEZvcm0ucXVlcnlTZWxlY3RvcignI3BvcHVwLXBob25lJyk7XG5jb25zdCBwb3B1cE5hbWUgPSBwb3B1cEZvcm0ucXVlcnlTZWxlY3RvcignI3BvcHVwLW5hbWUnKTtcbmNvbnN0IHBvcHVwQ2hlY2tib3ggPSBwb3B1cEZvcm0ucXVlcnlTZWxlY3RvcignI3BvcHVwLWFncmVlbWVudCcpO1xuY29uc3QgcG9wdXBBZ3JlZW1lbnRDaGVjayA9IHBvcHVwRm9ybS5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2FncmVlbWVudCcpO1xuY29uc3QgcG9wdXBRdWVzdGlvbiA9IHBvcHVwRm9ybS5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtcXVlc3Rpb24nKTtcblxuY29uc3QgZm9jdXNQaG9uZUhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gIGlmIChldnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIGV2dC50YXJnZXQudmFsdWUgPSBQSE9ORV9DT0RFO1xuICB9XG59O1xuXG5jb25zdCBtYXNrUGhvbmVIYW5kbGVyID0gKGV2dCkgPT4ge1xuXG4gIGNvbnN0IFssIGdyb3VwMSwgZ3JvdXAyLCBncm91cDMsIGdyb3VwNF0gPSBBcnJheS5mcm9tKGV2dC50YXJnZXQudmFsdWUubWF0Y2hBbGwocmVnZXhQaG9uZUlucHV0KSlbMF07XG5cbiAgZXZ0LnRhcmdldC52YWx1ZSA9IFBIT05FX0NPREU7XG5cbiAgaWYgKGdyb3VwMSkge1xuICAgIGV2dC50YXJnZXQudmFsdWUgKz0gZ3JvdXAxO1xuICB9XG5cbiAgaWYgKGdyb3VwMikge1xuICAgIGV2dC50YXJnZXQudmFsdWUgKz0gYCkke2dyb3VwMn1gO1xuICB9XG5cbiAgaWYgKGdyb3VwMykge1xuICAgIGV2dC50YXJnZXQudmFsdWUgKz0gYC0ke2dyb3VwM31gO1xuICB9XG5cbiAgaWYgKGdyb3VwNCkge1xuICAgIGV2dC50YXJnZXQudmFsdWUgKz0gYC0ke2dyb3VwNH1gO1xuICB9XG59O1xuXG5jb25zdCB0b2dnbGVWYWxpZGF0aW9uID0gKGlucHV0LCBpc1ZhbGlkKSA9PiB7XG4gIGlmICghaXNWYWxpZCkge1xuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQnKTtcbiAgfSBlbHNlIHtcbiAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkJyk7XG4gIH1cbn07XG5cbmNvbnN0IHN1Ym1pdEZvcm1IYW5kbGVyID0gKGlucHV0UGhvbmUsIGlucHV0TmFtZSwgaW5wdXRDaGVja2JveCwgd3JhcHBlckNoZWNrYm94LCBldnQpID0+IHtcbiAgY29uc3QgaXNQaG9uZVZhbGlkID0gaW5wdXRQaG9uZS52YWx1ZS5zZWFyY2gocmVnZXhQaG9uZVN1Ym1pdCkgIT09IC0xO1xuICBjb25zdCBpc05hbWVWYWxpZCA9IGlucHV0TmFtZS52YWx1ZS5sZW5ndGggIT09IDA7XG4gIGNvbnN0IGlzQ2hlY2tib3hWYWxpZCA9IGlucHV0Q2hlY2tib3guY2hlY2tlZDtcblxuICBpZiAoIWlzUGhvbmVWYWxpZCB8fCAhaXNOYW1lVmFsaWQgfHwgIWlzQ2hlY2tib3hWYWxpZCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIHRvZ2dsZVZhbGlkYXRpb24od3JhcHBlckNoZWNrYm94LCBpc0NoZWNrYm94VmFsaWQpO1xuICB0b2dnbGVWYWxpZGF0aW9uKGlucHV0UGhvbmUsIGlzUGhvbmVWYWxpZCk7XG4gIHRvZ2dsZVZhbGlkYXRpb24oaW5wdXROYW1lLCBpc05hbWVWYWxpZCk7XG59O1xuXG5jb25zdCB2YWxpZGF0ZSA9IChpbnB1dFBob25lLCBpbnB1dE5hbWUsIGlucHV0Q2hlY2tib3gsIHdyYXBwZXJDaGVja2JveCwgZm9ybSkgPT4ge1xuICBpZiAoaW5wdXRQaG9uZSkge1xuICAgIGlucHV0UGhvbmUuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmb2N1c1Bob25lSGFuZGxlcik7XG4gICAgaW5wdXRQaG9uZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG1hc2tQaG9uZUhhbmRsZXIpO1xuICB9XG4gIGlmIChmb3JtICYmIGlucHV0TmFtZSAmJiBpbnB1dFBob25lICYmIGlucHV0Q2hlY2tib3gpIHtcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbm92YWxpZGF0ZScsICdub3ZhbGlkYXRlJyk7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZ0KSA9PiB7XG4gICAgICBzdWJtaXRGb3JtSGFuZGxlcihpbnB1dFBob25lLCBpbnB1dE5hbWUsIGlucHV0Q2hlY2tib3gsIHdyYXBwZXJDaGVja2JveCwgZXZ0KTtcbiAgICB9KTtcbiAgfVxufTtcblxuY29uc3Qgc2V0TG9jYWxTdG9yYWdlID0gKGVsZW1lbnQsIHN0b3JhZ2VLZXkpID0+IHtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBjb25zdCBzdG9yYWdlVmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KTtcbiAgICBpZiAoc3RvcmFnZVZhbHVlKSB7XG4gICAgICBlbGVtZW50LnZhbHVlID0gc3RvcmFnZVZhbHVlO1xuICAgIH1cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2dCkgPT4ge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RvcmFnZUtleSwgZXZ0LnRhcmdldC52YWx1ZSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbnZhbGlkYXRlKG1haW5QaG9uZSwgbWFpbk5hbWUsIG1haW5DaGVja2JveCwgbWFpbkFncmVlbWVudENoZWNrLCBtYWluRm9ybSk7XG52YWxpZGF0ZShwb3B1cFBob25lLCBwb3B1cE5hbWUsIHBvcHVwQ2hlY2tib3gsIHBvcHVwQWdyZWVtZW50Q2hlY2ssIHBvcHVwRm9ybSk7XG5cbnNldExvY2FsU3RvcmFnZShwb3B1cFBob25lLCBTdG9yYWdlS2V5LlBIT05FX05VTUJFUik7XG5zZXRMb2NhbFN0b3JhZ2UocG9wdXBOYW1lLCBTdG9yYWdlS2V5LlVTRVJfTkFNRSk7XG5zZXRMb2NhbFN0b3JhZ2UocG9wdXBRdWVzdGlvbiwgU3RvcmFnZUtleS5RVUVTVElPTik7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGtleXMgPSB7XG4gIEVTQ0FQRTogJ0VzY2FwZScsXG4gIEVTQzogJ0VzYycsXG59O1xuXG5jb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuY29uc3QgYnV0dG9uUG9wdXBPcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYnV0dG9uJyk7XG5jb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCcpO1xuY29uc3QgcG9wdXBVbmRlcmxheSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fdW5kZXJsYXknKTtcbmNvbnN0IHBvcHVwQnV0dG9uQ2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Nsb3NlJyk7XG5jb25zdCBpbnB1dE5hbWUgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwidXNlcm5hbWVcIl0nKTtcbmNvbnN0IGlzUG9wdXBFeGlzdCA9IHBvcHVwICYmIGJ1dHRvblBvcHVwT3BlbiAmJiBwb3B1cFVuZGVybGF5ICYmIHBvcHVwQnV0dG9uQ2xvc2UgJiYgaW5wdXROYW1lO1xuXG5jb25zdCBmb2N1c1RyYXAgPSB3aW5kb3cuZm9jdXNUcmFwO1xuY29uc3QgdHJhcCA9IGZvY3VzVHJhcC5jcmVhdGVGb2N1c1RyYXAocG9wdXAsIHtpbml0aWFsRm9jdXM6IGlucHV0TmFtZX0pO1xuXG5jb25zdCBvcGVuUG9wdXBIYW5kbGVyID0gKGV2dCkgPT4ge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICBwYWdlLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gIHBvcHVwVW5kZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwSGFuZGxlcik7XG4gIHBvcHVwQnV0dG9uQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwSGFuZGxlcik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlc2NhcGVLZXlkb3duSGFuZGxlcik7XG5cbiAgdHJhcC5hY3RpdmF0ZSgpO1xufTtcblxuY29uc3QgY2xvc2VQb3B1cEhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHBhZ2Uuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XG4gIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgcG9wdXBVbmRlcmxheS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXBIYW5kbGVyKTtcbiAgcG9wdXBCdXR0b25DbG9zZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXBIYW5kbGVyKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGVzY2FwZUtleWRvd25IYW5kbGVyKTtcblxuICB0cmFwLmRlYWN0aXZhdGUoKTtcbn07XG5cbmNvbnN0IGVzY2FwZUtleWRvd25IYW5kbGVyID0gKGV2dCkgPT4ge1xuICBpZiAoZXZ0LmtleSA9PT0ga2V5cy5FU0NBUEUgfHwgZXZ0LmtleSA9PT0ga2V5cy5FU0MpIHtcbiAgICBjbG9zZVBvcHVwSGFuZGxlcihldnQpO1xuICB9XG59O1xuXG5pZiAoaXNQb3B1cEV4aXN0KSB7XG4gIGJ1dHRvblBvcHVwT3Blbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cEhhbmRsZXIpO1xufVxuIl19
