'use strict';
(function () {
  const H3_TAG_NAME = 'H3';
  const OPEN_FILTER_BUTTON = 'open';
  const CLOSE_FILTER_BUTTON = 'close';

  const setFilter = () => {

    const catalog = document.querySelector('.catalog');
    if (!catalog) {
      return;
    }

    const accordions = catalog.querySelectorAll('.form__filter');
    const filterMenu = catalog.querySelector('.form');
    const filterButton = catalog.querySelector('.form__toggle-menu');
    const page = document.querySelector('.page');
    const pageUnderlay = document.querySelector('.page__underlay');
    const footer = document.querySelector('.footer');

    filterMenu.classList.remove('form--no-js');
    filterButton.classList.remove('form__toggle-menu--no-js');
    filterMenu.classList.add('form--close');

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
