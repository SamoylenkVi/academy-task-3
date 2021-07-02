'use strict';
const regexPhoneSubmit = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
const regexPhoneInput = /[^+-\d\s/(/)]/gi;
const mainPhone = document.querySelector('#phone');
const mainName = document.querySelector('#name');
const mainForm = document.querySelector('section.form form');
const popupPhone = document.querySelector('#popup-phone');
const popupName = document.querySelector('#popup-name');
const popupForm = document.querySelector('section.popup form');

const validate = (inputPhone, inputName, form) => {
  if (inputPhone) {
    inputPhone.addEventListener('input', () => {
      inputPhone.value = inputPhone.value.replaceAll(regexPhoneInput, '');
    });
  }
  if (form && inputName && inputPhone) {
    form.setAttribute('novalidate', 'novalidate');
    form.addEventListener('submit', (evt) => {

      const isPhoneValid = inputPhone.value.search(regexPhoneSubmit) !== -1;
      const isNameValid = inputName.value.length !== 0;

      if (!isPhoneValid || !isNameValid) {
        evt.preventDefault();
      }

      if (!isPhoneValid) {
        inputPhone.classList.add('invalid');
      } else {
        inputPhone.classList.remove('invalid');
      }

      if (!isNameValid) {
        inputName.classList.add('invalid');
      } else {
        inputName.classList.remove('invalid');
      }
    });
  }
};

validate(mainPhone, mainName, mainForm);
validate(popupPhone, popupName, popupForm);
