'use strict';
(function () {
  const header = document.querySelector('.header__wrapper');
  const page = document.querySelector('.page');
  const footer = document.querySelector('.footer');
  const headerToggle = header.querySelector('.header__toggle');
  const headerIcon = header.querySelector('.header__icon');
  const headerCart = header.querySelector('.header__cart');
  const headerContent = header.querySelector('.header__content');


  header.classList.add('header__wrapper--close');
  headerIcon.classList.add('header__icon--close');
  headerCart.classList.add('header__cart--close');
  headerContent.classList.add('header__content--close');


  headerToggle.addEventListener('click', () => {
    if (headerToggle) {
      header.classList.toggle('header__wrapper--close');
      headerIcon.classList.toggle('header__icon--close');
      headerCart.classList.toggle('header__cart--close');
      headerContent.classList.toggle('header__content--close');
      headerContent.classList.toggle('header__content--open');
      page.classList.toggle('fixed');
      footer.classList.toggle('fixed');
    }
  });
})();
