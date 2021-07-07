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
