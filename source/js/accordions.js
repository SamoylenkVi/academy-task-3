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
