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
