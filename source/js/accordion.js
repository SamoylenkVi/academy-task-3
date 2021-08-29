'use strict';

const H3_TAG_NAME = 'H3';

const setFilter = () => {

  const catalog = document.querySelector('.catalog');
  if (!catalog) {
    return;
  }

  const accordions = catalog.querySelectorAll('.form__filter');
  const openButton = catalog.querySelector('.catalog__toggle');
  const filterMenu = catalog.querySelector('.form');
  const closeButton = catalog.querySelector('.form__toggle-menu');


  const toggleVisibility = (evt) => {
    const isTargetClicked = evt.target.tagName === H3_TAG_NAME;

    if (isTargetClicked) {
      accordions.forEach((accordion) => {
        if (evt.currentTarget === accordion) {
          accordion.classList.toggle('form__filter--close');
        }
      });
    }
  };

  if (accordions && accordions.length > 0) {
    accordions.forEach((accordion) => {
      accordion.classList.add('form__filter--close');
      accordion.addEventListener('click', toggleVisibility);
    });
  }

  const buttonClickHeandler = () => {
    filterMenu.classList.toggle('form--close');
    filterMenu.classList.toggle('form--open');
  };

  openButton.addEventListener('click', buttonClickHeandler);
  closeButton.addEventListener('click', buttonClickHeandler);

};

setFilter();
