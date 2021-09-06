'use strict';
(function () {
  const OPEN_FILTER_BUTTON = 'open';
  const CLOSE_FILTER_BUTTON = 'close';

  const setFilter = () => {

    const catalog = document.querySelector('.catalog');
    if (!catalog) {
      return;
    }

    const filterMenu = catalog.querySelector('.form');
    const filterButton = catalog.querySelector('.form__toggle-menu');
    const filterButtonsToggle = catalog.querySelectorAll('.form__button-toggle');
    const page = document.querySelector('.page');
    const pageUnderlay = document.querySelector('.page__underlay');
    const footer = document.querySelector('.footer');

    filterMenu.classList.remove('form--no-js');
    filterButton.classList.remove('form__toggle-menu--no-js');
    filterMenu.classList.add('form--close');


    const toggleVisibilityHandler = (evt) => {
      evt.target.classList.toggle('form__button-toggle--close');
      evt.target.parentNode.classList.toggle('form__filter--close');
      evt.target.parentNode.classList.toggle('form__filter--open');
    };

    filterButtonsToggle.forEach((button) => {
      button.parentNode.classList.add('form__filter--close');
      button.classList.add('form__button-toggle--close');
      button.addEventListener('click', toggleVisibilityHandler);
    });

    const changeFiltersVisibility = () => {
      if (filterMenu) {
        filterMenu.classList.toggle('form--close');
        filterMenu.classList.toggle('form--open');
        page.classList.toggle('fixed');
        pageUnderlay.classList.toggle('page__underlay--fixed');
        footer.classList.toggle('fixed');
      }
    };

    catalog.addEventListener('click', (evt) => {
      const targetData = evt.target.dataset.filterButton;

      if (targetData === OPEN_FILTER_BUTTON || targetData === CLOSE_FILTER_BUTTON) {
        changeFiltersVisibility();
      }
    });
  };

  setFilter();
})();
