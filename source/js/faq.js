'use strict';
(function () {
  const faq = document.querySelector('.faq');

  const setAccordion = (section) => {
    if (!section) {
      return;
    }

    const items = section.querySelectorAll('.faq__item');
    items.forEach(item => {
      item.classList.remove('faq__item--open');
      item
          .querySelector('dt > a')
          .addEventListener('click', (evt) => {
            evt.preventDefault();
            item.classList.toggle('faq__item--open');
          });
    });
  };

  setAccordion(faq);
})();
