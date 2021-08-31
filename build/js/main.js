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

'use strict';
(function () {
  const faq = document.querySelector('.faq');

  const setAccordion = (section) => {
    if (!section) {
      return;
    }

    const items = section.querySelectorAll('.faq__item');

    if (items.length === 0) {
      return;
    }

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

'use strict';
(function () {
  const header = document.querySelector('.header__wrapper');
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
    }
  });
})();

import * as focusTrap from './vendor.js'; // ESM

'use strict';
(function () {
  const keys = {
    ESCAPE: 'Escape',
    ESC: 'Esc',
  };

  const regExpMail = /^(?:[-a-z\d\+\*\/\?!{}~_%&'=^$#]+(?:\.[-a-z\d\+\*\/\?!{}~_%&'=^$#]+)*)@(?:[-a-z\d_]+\.){1,60}[a-z]{2,6}$/;

  const setPopup = () => {
    const popup = document.querySelector('.popup');

    if (!popup) {
      return;
    }

    const page = document.querySelector('body');
    const form = popup.querySelector('form');
    const popupOpen = document.querySelector('a[href="login.html"]');
    const popupUnderlay = popup.querySelector('.popup__underlay');
    const popupButtonClose = popup.querySelector('.popup__close');
    const inputMail = form.querySelector('input[name="e-mail"]');
    const inputPassword = popup.querySelector('input[name="password"]');

    const trap = focusTrap.createFocusTrap(popup, {initialFocus: inputMail});

    const toggleValidation = (input, isValid) => {
      if (!isValid) {
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
    };

    const openPopupHandler = (evt) => {
      evt.preventDefault();

      page.style.overflow = 'hidden';
      popup.style.display = 'block';

      popupUnderlay.addEventListener('click', closePopupHandler);
      popupButtonClose.addEventListener('click', closePopupHandler);
      form.addEventListener('submit', submitFormHandler);
      document.addEventListener('keydown', escapeKeydownHandler);

      trap.activate();
    };

    const closePopupHandler = (evt) => {
      evt.preventDefault();

      page.style.overflow = 'auto';
      popup.style.display = 'none';

      popupUnderlay.removeEventListener('click', closePopupHandler);
      popupButtonClose.removeEventListener('click', closePopupHandler);
      form.removeEventListener('submit', submitFormHandler);
      document.removeEventListener('keydown', escapeKeydownHandler);

      trap.deactivate();
    };

    const escapeKeydownHandler = (evt) => {
      if (evt.key === keys.ESCAPE || evt.key === keys.ESC) {
        closePopupHandler(evt);
      }
    };

    const submitFormHandler = (evt) => {
      const isMailValid = inputMail.value.search(regExpMail) !== -1;
      const isPasswordValid = inputPassword.value.length !== 0;

      if (!isMailValid || !isPasswordValid) {
        evt.preventDefault();
      }

      toggleValidation(inputMail, isMailValid);
      toggleValidation(inputPassword, isPasswordValid);
    };

    popupOpen.addEventListener('click', openPopupHandler);

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

    setLocalStorage(inputMail, 'Mail');
  };

  setPopup();
})();

'use strict';
(function () {
  const slider = document.querySelector('.slider');

  const setSLider = (section) => {
    if (!section) {
      return;
    }

    const DESKTOP_WIDTH = 1024;
    const TABLET_WIDTH = 768;

    const SlidesMargin = {
      DESKTOP: 2.56,
      TABLET: 4.42,
      MOBILE: 10.34
    };

    const SlidesPerPage = {
      DESKTOP: 4,
      TABLET: 2,
    };

    const sliderWrapper = section.querySelector('.slider__items');
    const buttonNext = section.querySelector('.slider__forward');
    const buttonPrev = section.querySelector('.slider__back');
    const pagination = section.querySelector('.slider__pagination');

    const container = section.querySelector('.slider__items ul');

    const mobilePaginationTemplate = document.querySelector('#mobile-slider-counter').content.firstElementChild;
    const desktopPaginationTemplate = document.querySelector('#desktop-slider-counter').content.firstElementChild;

    const slidesCount = container.childElementCount;

    const {transitionDuration} = getComputedStyle(container);
    const translRegExp = /([-0-9.]+(?=%))/;

    let viewWidth = document.documentElement.clientWidth;
    let selectedPage = 1;
    let posInit;
    let posX1 = 0;
    let posX2 = 0;

    const throttle = (callback, wait = 300, immediate = true) => {
      let timeout = null;
      let initialCall = true;

      return function () {
        const callNow = immediate && initialCall;
        const next = () => {
          callback.apply(this, arguments);
          timeout = null;
        };

        if (callNow) {
          initialCall = false;
          next();
        }

        if (!timeout) {
          timeout = setTimeout(next, wait);
        }
      };
    };

    const resizeWindowHandler = () => {
      if (document.documentElement.clientWidth === viewWidth) {
        return;
      }

      const prevViewWidth = viewWidth;
      viewWidth = document.documentElement.clientWidth;
      renderPagination(prevViewWidth);
      changeSlides(1);
      toggleSwipe(viewWidth);
    };

    const renderDesktopPagination = (count, currentPage) => {
      const pagesCount = Math.ceil(count / (viewWidth >= DESKTOP_WIDTH ? SlidesPerPage.DESKTOP : SlidesPerPage.TABLET));
      const pagesList = document.createElement(`ul`);

      const pages = new Array(pagesCount)
          .fill()
          .map((value, index) => {
            const pageNumber = index + 1;
            const element = desktopPaginationTemplate.cloneNode(true);
            const elementLink = element.querySelector('a');

            elementLink.setAttribute(`aria-label`, `Slider page ${pageNumber}`);
            elementLink.setAttribute(`data-page-number`, `${pageNumber}`);

            if (currentPage !== pageNumber) {
              elementLink.setAttribute(`href`, `#`);
            }

            elementLink.textContent = pageNumber;

            elementLink.addEventListener('click', (evt) => {
              evt.preventDefault();
              changeSlides(+evt.target.dataset.pageNumber);
            });

            return element;
          });

      pages.forEach(page => pagesList.append(page));

      pagination.innerHTML = ``;
      pagination.append(pagesList);
    };

    const renderMobilePagination = (count, currentPage) => {
      const pagesCount = Math.ceil(count / SlidesPerPage.TABLET);

      const element = mobilePaginationTemplate.cloneNode(true);

      const [current, total] = Array.from(element.querySelectorAll('span'));
      current.textContent = currentPage;
      total.textContent = pagesCount;

      pagination.innerHTML = ``;
      pagination.append(element);
    };

    const renderPagination = (prevViewWidth, isFirstRender = false) => {
      if ((prevViewWidth < DESKTOP_WIDTH || isFirstRender) && viewWidth >= DESKTOP_WIDTH) {
        renderDesktopPagination(slidesCount, selectedPage);
      }

      if ((prevViewWidth < TABLET_WIDTH || prevViewWidth >= DESKTOP_WIDTH || isFirstRender) && (viewWidth >= TABLET_WIDTH && viewWidth < DESKTOP_WIDTH)) {
        renderDesktopPagination(slidesCount, selectedPage);
      }

      if ((prevViewWidth >= TABLET_WIDTH || isFirstRender) && viewWidth < TABLET_WIDTH) {
        renderMobilePagination(slidesCount, selectedPage);
      }
    };

    const changeSlides = (position) => {
      const pagesCount = Math.ceil(slidesCount / (viewWidth > DESKTOP_WIDTH ? SlidesPerPage.DESKTOP : SlidesPerPage.TABLET));

      let margin = 0;

      if (viewWidth >= DESKTOP_WIDTH) {
        margin = SlidesMargin.DESKTOP;
      } else if (viewWidth >= TABLET_WIDTH) {
        margin = SlidesMargin.TABLET;
      } else {
        margin = SlidesMargin.MOBILE;
      }

      if (position < 1) {
        selectedPage = pagesCount;
      } else if (position > pagesCount) {
        selectedPage = 1;
      } else {
        selectedPage = position;
      }

      container.style = `transform: translate3d(${(1 - selectedPage) * 100 + margin * (1 - selectedPage)}%, 0, 0)`;
      updatePage(selectedPage);
    };

    const updatePage = (pageNumber) => {
      if (viewWidth >= TABLET_WIDTH) {
        pagination
            .querySelectorAll('a')
            .forEach(item => {
              if (+item.dataset.pageNumber === pageNumber) {
                item.removeAttribute('href');
              } else {
                item.setAttribute('href', '#');
              }
            });
      } else {
        pagination
            .querySelector('span')
            .textContent = pageNumber;
      }
    };

    const touchStartHandler = (evt) => {

      sliderWrapper.addEventListener('touchmove', touchMoveHandler);
      sliderWrapper.addEventListener('touchend', touchEndHandler);

      [posInit] = container.style.transform.match(translRegExp) || [0];
      posX1 = Math.trunc(evt.touches[0].clientX);

      container.style.transitionDuration = '0s';
    };

    const touchMoveHandler = (evt) => {
      const clientX = Math.trunc(evt.touches[0].clientX);
      const containerWidth = container.offsetWidth;

      posX2 = clientX - posX1;
      container.style.transform = `translate3d(${+posInit + (posX2 / containerWidth) * 100}%, 0, 0)`;
    };

    const touchEndHandler = () => {
      sliderWrapper.removeEventListener('touchmove', touchMoveHandler);
      sliderWrapper.removeEventListener('touchend', touchEndHandler);

      if (posX2 > 0) {
        changeSlides(selectedPage - 1);
      } else {
        changeSlides(selectedPage + 1);
      }


      container.style.transitionDuration = transitionDuration;
    };

    const toggleSwipe = (width) => {
      if (width < DESKTOP_WIDTH) {
        sliderWrapper.addEventListener('touchstart', touchStartHandler, {passive: true});
      } else {
        sliderWrapper.removeEventListener('touchstart', touchStartHandler);
      }
    };

    window.addEventListener('resize', throttle(resizeWindowHandler));

    buttonNext.addEventListener('click', () => changeSlides(selectedPage + 1));
    buttonPrev.addEventListener('click', () => changeSlides(selectedPage - 1));

    renderPagination(viewWidth, true);
    toggleSwipe(viewWidth);
  };

  setSLider(slider);
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImZhcS5qcyIsIm5hdmlnYXRpb24uanMiLCJwb3B1cC5qcyIsInNsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IEgzX1RBR19OQU1FID0gJ0gzJztcbiAgY29uc3QgT1BFTl9GSUxURVJfQlVUVE9OID0gJ29wZW4nO1xuICBjb25zdCBDTE9TRV9GSUxURVJfQlVUVE9OID0gJ2Nsb3NlJztcblxuICBjb25zdCBzZXRGaWx0ZXIgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBjYXRhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2cnKTtcbiAgICBpZiAoIWNhdGFsb2cpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY2NvcmRpb25zID0gY2F0YWxvZy5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9fZmlsdGVyJyk7XG4gICAgY29uc3QgZmlsdGVyTWVudSA9IGNhdGFsb2cucXVlcnlTZWxlY3RvcignLmZvcm0nKTtcblxuICAgIGNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCBpc1RhcmdldENsaWNrZWQgPSBldnQudGFyZ2V0LnRhZ05hbWUgPT09IEgzX1RBR19OQU1FO1xuXG4gICAgICBpZiAoaXNUYXJnZXRDbGlja2VkKSB7XG4gICAgICAgIGFjY29yZGlvbnMuZm9yRWFjaCgoYWNjb3JkaW9uKSA9PiB7XG4gICAgICAgICAgaWYgKGV2dC5jdXJyZW50VGFyZ2V0ID09PSBhY2NvcmRpb24pIHtcbiAgICAgICAgICAgIGFjY29yZGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtX19maWx0ZXItLWNsb3NlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGFjY29yZGlvbnMgJiYgYWNjb3JkaW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBhY2NvcmRpb25zLmZvckVhY2goKGFjY29yZGlvbikgPT4ge1xuICAgICAgICBhY2NvcmRpb24uY2xhc3NMaXN0LmFkZCgnZm9ybV9fZmlsdGVyLS1jbG9zZScpO1xuICAgICAgICBhY2NvcmRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVWaXNpYmlsaXR5KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZUZpbHRlcnNWaXNpYmlsaXR5ID0gKCkgPT4ge1xuICAgICAgaWYgKGZpbHRlck1lbnUpIHtcbiAgICAgICAgZmlsdGVyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtLS1jbG9zZScpO1xuICAgICAgICBmaWx0ZXJNZW51LmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm0tLW9wZW4nKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY2F0YWxvZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldERhdGEgPSBldnQudGFyZ2V0LmRhdGFzZXQuZmlsdGVyQnV0dG9uO1xuXG4gICAgICBpZiAodGFyZ2V0RGF0YSA9PT0gT1BFTl9GSUxURVJfQlVUVE9OIHx8IHRhcmdldERhdGEgPT09IENMT1NFX0ZJTFRFUl9CVVRUT04pIHtcbiAgICAgICAgY2hhbmdlRmlsdGVyc1Zpc2liaWxpdHkoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBzZXRGaWx0ZXIoKTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKCkge1xuICBjb25zdCBmYXEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmFxJyk7XG5cbiAgY29uc3Qgc2V0QWNjb3JkaW9uID0gKHNlY3Rpb24pID0+IHtcbiAgICBpZiAoIXNlY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpdGVtcyA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbCgnLmZhcV9faXRlbScpO1xuXG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhcV9faXRlbS0tb3BlbicpO1xuICAgICAgaXRlbVxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCdkdCA+IGEnKVxuICAgICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdmYXFfX2l0ZW0tLW9wZW4nKTtcbiAgICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBzZXRBY2NvcmRpb24oZmFxKTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKCkge1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX193cmFwcGVyJyk7XG4gIGNvbnN0IGhlYWRlclRvZ2dsZSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX190b2dnbGUnKTtcbiAgY29uc3QgaGVhZGVySWNvbiA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19pY29uJyk7XG4gIGNvbnN0IGhlYWRlckNhcnQgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY2FydCcpO1xuICBjb25zdCBoZWFkZXJDb250ZW50ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2NvbnRlbnQnKTtcblxuXG4gIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX3dyYXBwZXItLWNsb3NlJyk7XG4gIGhlYWRlckljb24uY2xhc3NMaXN0LmFkZCgnaGVhZGVyX19pY29uLS1jbG9zZScpO1xuICBoZWFkZXJDYXJ0LmNsYXNzTGlzdC5hZGQoJ2hlYWRlcl9fY2FydC0tY2xvc2UnKTtcbiAgaGVhZGVyQ29udGVudC5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX2NvbnRlbnQtLWNsb3NlJyk7XG5cblxuICBoZWFkZXJUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKGhlYWRlclRvZ2dsZSkge1xuICAgICAgaGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hlYWRlcl9fd3JhcHBlci0tY2xvc2UnKTtcbiAgICAgIGhlYWRlckljb24uY2xhc3NMaXN0LnRvZ2dsZSgnaGVhZGVyX19pY29uLS1jbG9zZScpO1xuICAgICAgaGVhZGVyQ2FydC5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX2NhcnQtLWNsb3NlJyk7XG4gICAgICBoZWFkZXJDb250ZW50LmNsYXNzTGlzdC50b2dnbGUoJ2hlYWRlcl9fY29udGVudC0tY2xvc2UnKTtcbiAgICB9XG4gIH0pO1xufSkoKTtcbiIsImltcG9ydCAqIGFzIGZvY3VzVHJhcCBmcm9tICcuL3ZlbmRvci5qcyc7IC8vIEVTTVxuXG4ndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKCkge1xuICBjb25zdCBrZXlzID0ge1xuICAgIEVTQ0FQRTogJ0VzY2FwZScsXG4gICAgRVNDOiAnRXNjJyxcbiAgfTtcblxuICBjb25zdCByZWdFeHBNYWlsID0gL14oPzpbLWEtelxcZFxcK1xcKlxcL1xcPyF7fX5fJSYnPV4kI10rKD86XFwuWy1hLXpcXGRcXCtcXCpcXC9cXD8he31+XyUmJz1eJCNdKykqKUAoPzpbLWEtelxcZF9dK1xcLil7MSw2MH1bYS16XXsyLDZ9JC87XG5cbiAgY29uc3Qgc2V0UG9wdXAgPSAoKSA9PiB7XG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcblxuICAgIGlmICghcG9wdXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGNvbnN0IGZvcm0gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG4gICAgY29uc3QgcG9wdXBPcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtocmVmPVwibG9naW4uaHRtbFwiXScpO1xuICAgIGNvbnN0IHBvcHVwVW5kZXJsYXkgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3VuZGVybGF5Jyk7XG4gICAgY29uc3QgcG9wdXBCdXR0b25DbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2xvc2UnKTtcbiAgICBjb25zdCBpbnB1dE1haWwgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJlLW1haWxcIl0nKTtcbiAgICBjb25zdCBpbnB1dFBhc3N3b3JkID0gcG9wdXAucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInBhc3N3b3JkXCJdJyk7XG5cbiAgICBjb25zdCB0cmFwID0gZm9jdXNUcmFwLmNyZWF0ZUZvY3VzVHJhcChwb3B1cCwge2luaXRpYWxGb2N1czogaW5wdXRNYWlsfSk7XG5cbiAgICBjb25zdCB0b2dnbGVWYWxpZGF0aW9uID0gKGlucHV0LCBpc1ZhbGlkKSA9PiB7XG4gICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnaW52YWxpZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZCcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvcGVuUG9wdXBIYW5kbGVyID0gKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHBhZ2Uuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICBwb3B1cFVuZGVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cEhhbmRsZXIpO1xuICAgICAgcG9wdXBCdXR0b25DbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXBIYW5kbGVyKTtcbiAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0Jywgc3VibWl0Rm9ybUhhbmRsZXIpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGVzY2FwZUtleWRvd25IYW5kbGVyKTtcblxuICAgICAgdHJhcC5hY3RpdmF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBjbG9zZVBvcHVwSGFuZGxlciA9IChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBwYWdlLnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xuICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgcG9wdXBVbmRlcmxheS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXBIYW5kbGVyKTtcbiAgICAgIHBvcHVwQnV0dG9uQ2xvc2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwSGFuZGxlcik7XG4gICAgICBmb3JtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHN1Ym1pdEZvcm1IYW5kbGVyKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlc2NhcGVLZXlkb3duSGFuZGxlcik7XG5cbiAgICAgIHRyYXAuZGVhY3RpdmF0ZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBlc2NhcGVLZXlkb3duSGFuZGxlciA9IChldnQpID0+IHtcbiAgICAgIGlmIChldnQua2V5ID09PSBrZXlzLkVTQ0FQRSB8fCBldnQua2V5ID09PSBrZXlzLkVTQykge1xuICAgICAgICBjbG9zZVBvcHVwSGFuZGxlcihldnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBzdWJtaXRGb3JtSGFuZGxlciA9IChldnQpID0+IHtcbiAgICAgIGNvbnN0IGlzTWFpbFZhbGlkID0gaW5wdXRNYWlsLnZhbHVlLnNlYXJjaChyZWdFeHBNYWlsKSAhPT0gLTE7XG4gICAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBpbnB1dFBhc3N3b3JkLnZhbHVlLmxlbmd0aCAhPT0gMDtcblxuICAgICAgaWYgKCFpc01haWxWYWxpZCB8fCAhaXNQYXNzd29yZFZhbGlkKSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICB0b2dnbGVWYWxpZGF0aW9uKGlucHV0TWFpbCwgaXNNYWlsVmFsaWQpO1xuICAgICAgdG9nZ2xlVmFsaWRhdGlvbihpbnB1dFBhc3N3b3JkLCBpc1Bhc3N3b3JkVmFsaWQpO1xuICAgIH07XG5cbiAgICBwb3B1cE9wZW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuUG9wdXBIYW5kbGVyKTtcblxuICAgIGNvbnN0IHNldExvY2FsU3RvcmFnZSA9IChlbGVtZW50LCBzdG9yYWdlS2V5KSA9PiB7XG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBzdG9yYWdlVmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KTtcbiAgICAgICAgaWYgKHN0b3JhZ2VWYWx1ZSkge1xuICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSBzdG9yYWdlVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldnQpID0+IHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlS2V5LCBldnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNldExvY2FsU3RvcmFnZShpbnB1dE1haWwsICdNYWlsJyk7XG4gIH07XG5cbiAgc2V0UG9wdXAoKTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKCkge1xuICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyJyk7XG5cbiAgY29uc3Qgc2V0U0xpZGVyID0gKHNlY3Rpb24pID0+IHtcbiAgICBpZiAoIXNlY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBERVNLVE9QX1dJRFRIID0gMTAyNDtcbiAgICBjb25zdCBUQUJMRVRfV0lEVEggPSA3Njg7XG5cbiAgICBjb25zdCBTbGlkZXNNYXJnaW4gPSB7XG4gICAgICBERVNLVE9QOiAyLjU2LFxuICAgICAgVEFCTEVUOiA0LjQyLFxuICAgICAgTU9CSUxFOiAxMC4zNFxuICAgIH07XG5cbiAgICBjb25zdCBTbGlkZXNQZXJQYWdlID0ge1xuICAgICAgREVTS1RPUDogNCxcbiAgICAgIFRBQkxFVDogMixcbiAgICB9O1xuXG4gICAgY29uc3Qgc2xpZGVyV3JhcHBlciA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignLnNsaWRlcl9faXRlbXMnKTtcbiAgICBjb25zdCBidXR0b25OZXh0ID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19mb3J3YXJkJyk7XG4gICAgY29uc3QgYnV0dG9uUHJldiA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fYmFjaycpO1xuICAgIGNvbnN0IHBhZ2luYXRpb24gPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX3BhZ2luYXRpb24nKTtcblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignLnNsaWRlcl9faXRlbXMgdWwnKTtcblxuICAgIGNvbnN0IG1vYmlsZVBhZ2luYXRpb25UZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2JpbGUtc2xpZGVyLWNvdW50ZXInKS5jb250ZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGNvbnN0IGRlc2t0b3BQYWdpbmF0aW9uVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVza3RvcC1zbGlkZXItY291bnRlcicpLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICBjb25zdCBzbGlkZXNDb3VudCA9IGNvbnRhaW5lci5jaGlsZEVsZW1lbnRDb3VudDtcblxuICAgIGNvbnN0IHt0cmFuc2l0aW9uRHVyYXRpb259ID0gZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpO1xuICAgIGNvbnN0IHRyYW5zbFJlZ0V4cCA9IC8oWy0wLTkuXSsoPz0lKSkvO1xuXG4gICAgbGV0IHZpZXdXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBsZXQgc2VsZWN0ZWRQYWdlID0gMTtcbiAgICBsZXQgcG9zSW5pdDtcbiAgICBsZXQgcG9zWDEgPSAwO1xuICAgIGxldCBwb3NYMiA9IDA7XG5cbiAgICBjb25zdCB0aHJvdHRsZSA9IChjYWxsYmFjaywgd2FpdCA9IDMwMCwgaW1tZWRpYXRlID0gdHJ1ZSkgPT4ge1xuICAgICAgbGV0IHRpbWVvdXQgPSBudWxsO1xuICAgICAgbGV0IGluaXRpYWxDYWxsID0gdHJ1ZTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiBpbml0aWFsQ2FsbDtcbiAgICAgICAgY29uc3QgbmV4dCA9ICgpID0+IHtcbiAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgICAgaW5pdGlhbENhbGwgPSBmYWxzZTtcbiAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChuZXh0LCB3YWl0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzaXplV2luZG93SGFuZGxlciA9ICgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPT09IHZpZXdXaWR0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXZWaWV3V2lkdGggPSB2aWV3V2lkdGg7XG4gICAgICB2aWV3V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICByZW5kZXJQYWdpbmF0aW9uKHByZXZWaWV3V2lkdGgpO1xuICAgICAgY2hhbmdlU2xpZGVzKDEpO1xuICAgICAgdG9nZ2xlU3dpcGUodmlld1dpZHRoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVuZGVyRGVza3RvcFBhZ2luYXRpb24gPSAoY291bnQsIGN1cnJlbnRQYWdlKSA9PiB7XG4gICAgICBjb25zdCBwYWdlc0NvdW50ID0gTWF0aC5jZWlsKGNvdW50IC8gKHZpZXdXaWR0aCA+PSBERVNLVE9QX1dJRFRIID8gU2xpZGVzUGVyUGFnZS5ERVNLVE9QIDogU2xpZGVzUGVyUGFnZS5UQUJMRVQpKTtcbiAgICAgIGNvbnN0IHBhZ2VzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHVsYCk7XG5cbiAgICAgIGNvbnN0IHBhZ2VzID0gbmV3IEFycmF5KHBhZ2VzQ291bnQpXG4gICAgICAgICAgLmZpbGwoKVxuICAgICAgICAgIC5tYXAoKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFnZU51bWJlciA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkZXNrdG9wUGFnaW5hdGlvblRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRMaW5rID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdhJyk7XG5cbiAgICAgICAgICAgIGVsZW1lbnRMaW5rLnNldEF0dHJpYnV0ZShgYXJpYS1sYWJlbGAsIGBTbGlkZXIgcGFnZSAke3BhZ2VOdW1iZXJ9YCk7XG4gICAgICAgICAgICBlbGVtZW50TGluay5zZXRBdHRyaWJ1dGUoYGRhdGEtcGFnZS1udW1iZXJgLCBgJHtwYWdlTnVtYmVyfWApO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudFBhZ2UgIT09IHBhZ2VOdW1iZXIpIHtcbiAgICAgICAgICAgICAgZWxlbWVudExpbmsuc2V0QXR0cmlidXRlKGBocmVmYCwgYCNgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudExpbmsudGV4dENvbnRlbnQgPSBwYWdlTnVtYmVyO1xuXG4gICAgICAgICAgICBlbGVtZW50TGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGNoYW5nZVNsaWRlcygrZXZ0LnRhcmdldC5kYXRhc2V0LnBhZ2VOdW1iZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAgIH0pO1xuXG4gICAgICBwYWdlcy5mb3JFYWNoKHBhZ2UgPT4gcGFnZXNMaXN0LmFwcGVuZChwYWdlKSk7XG5cbiAgICAgIHBhZ2luYXRpb24uaW5uZXJIVE1MID0gYGA7XG4gICAgICBwYWdpbmF0aW9uLmFwcGVuZChwYWdlc0xpc3QpO1xuICAgIH07XG5cbiAgICBjb25zdCByZW5kZXJNb2JpbGVQYWdpbmF0aW9uID0gKGNvdW50LCBjdXJyZW50UGFnZSkgPT4ge1xuICAgICAgY29uc3QgcGFnZXNDb3VudCA9IE1hdGguY2VpbChjb3VudCAvIFNsaWRlc1BlclBhZ2UuVEFCTEVUKTtcblxuICAgICAgY29uc3QgZWxlbWVudCA9IG1vYmlsZVBhZ2luYXRpb25UZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgIGNvbnN0IFtjdXJyZW50LCB0b3RhbF0gPSBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3BhbicpKTtcbiAgICAgIGN1cnJlbnQudGV4dENvbnRlbnQgPSBjdXJyZW50UGFnZTtcbiAgICAgIHRvdGFsLnRleHRDb250ZW50ID0gcGFnZXNDb3VudDtcblxuICAgICAgcGFnaW5hdGlvbi5pbm5lckhUTUwgPSBgYDtcbiAgICAgIHBhZ2luYXRpb24uYXBwZW5kKGVsZW1lbnQpO1xuICAgIH07XG5cbiAgICBjb25zdCByZW5kZXJQYWdpbmF0aW9uID0gKHByZXZWaWV3V2lkdGgsIGlzRmlyc3RSZW5kZXIgPSBmYWxzZSkgPT4ge1xuICAgICAgaWYgKChwcmV2Vmlld1dpZHRoIDwgREVTS1RPUF9XSURUSCB8fCBpc0ZpcnN0UmVuZGVyKSAmJiB2aWV3V2lkdGggPj0gREVTS1RPUF9XSURUSCkge1xuICAgICAgICByZW5kZXJEZXNrdG9wUGFnaW5hdGlvbihzbGlkZXNDb3VudCwgc2VsZWN0ZWRQYWdlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChwcmV2Vmlld1dpZHRoIDwgVEFCTEVUX1dJRFRIIHx8IHByZXZWaWV3V2lkdGggPj0gREVTS1RPUF9XSURUSCB8fCBpc0ZpcnN0UmVuZGVyKSAmJiAodmlld1dpZHRoID49IFRBQkxFVF9XSURUSCAmJiB2aWV3V2lkdGggPCBERVNLVE9QX1dJRFRIKSkge1xuICAgICAgICByZW5kZXJEZXNrdG9wUGFnaW5hdGlvbihzbGlkZXNDb3VudCwgc2VsZWN0ZWRQYWdlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChwcmV2Vmlld1dpZHRoID49IFRBQkxFVF9XSURUSCB8fCBpc0ZpcnN0UmVuZGVyKSAmJiB2aWV3V2lkdGggPCBUQUJMRVRfV0lEVEgpIHtcbiAgICAgICAgcmVuZGVyTW9iaWxlUGFnaW5hdGlvbihzbGlkZXNDb3VudCwgc2VsZWN0ZWRQYWdlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhbmdlU2xpZGVzID0gKHBvc2l0aW9uKSA9PiB7XG4gICAgICBjb25zdCBwYWdlc0NvdW50ID0gTWF0aC5jZWlsKHNsaWRlc0NvdW50IC8gKHZpZXdXaWR0aCA+IERFU0tUT1BfV0lEVEggPyBTbGlkZXNQZXJQYWdlLkRFU0tUT1AgOiBTbGlkZXNQZXJQYWdlLlRBQkxFVCkpO1xuXG4gICAgICBsZXQgbWFyZ2luID0gMDtcblxuICAgICAgaWYgKHZpZXdXaWR0aCA+PSBERVNLVE9QX1dJRFRIKSB7XG4gICAgICAgIG1hcmdpbiA9IFNsaWRlc01hcmdpbi5ERVNLVE9QO1xuICAgICAgfSBlbHNlIGlmICh2aWV3V2lkdGggPj0gVEFCTEVUX1dJRFRIKSB7XG4gICAgICAgIG1hcmdpbiA9IFNsaWRlc01hcmdpbi5UQUJMRVQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXJnaW4gPSBTbGlkZXNNYXJnaW4uTU9CSUxFO1xuICAgICAgfVxuXG4gICAgICBpZiAocG9zaXRpb24gPCAxKSB7XG4gICAgICAgIHNlbGVjdGVkUGFnZSA9IHBhZ2VzQ291bnQ7XG4gICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID4gcGFnZXNDb3VudCkge1xuICAgICAgICBzZWxlY3RlZFBhZ2UgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZWN0ZWRQYWdlID0gcG9zaXRpb247XG4gICAgICB9XG5cbiAgICAgIGNvbnRhaW5lci5zdHlsZSA9IGB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKCR7KDEgLSBzZWxlY3RlZFBhZ2UpICogMTAwICsgbWFyZ2luICogKDEgLSBzZWxlY3RlZFBhZ2UpfSUsIDAsIDApYDtcbiAgICAgIHVwZGF0ZVBhZ2Uoc2VsZWN0ZWRQYWdlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgdXBkYXRlUGFnZSA9IChwYWdlTnVtYmVyKSA9PiB7XG4gICAgICBpZiAodmlld1dpZHRoID49IFRBQkxFVF9XSURUSCkge1xuICAgICAgICBwYWdpbmF0aW9uXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnYScpXG4gICAgICAgICAgICAuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgaWYgKCtpdGVtLmRhdGFzZXQucGFnZU51bWJlciA9PT0gcGFnZU51bWJlcikge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhZ2luYXRpb25cbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCdzcGFuJylcbiAgICAgICAgICAgIC50ZXh0Q29udGVudCA9IHBhZ2VOdW1iZXI7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHRvdWNoU3RhcnRIYW5kbGVyID0gKGV2dCkgPT4ge1xuXG4gICAgICBzbGlkZXJXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoTW92ZUhhbmRsZXIpO1xuICAgICAgc2xpZGVyV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoRW5kSGFuZGxlcik7XG5cbiAgICAgIFtwb3NJbml0XSA9IGNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0ubWF0Y2godHJhbnNsUmVnRXhwKSB8fCBbMF07XG4gICAgICBwb3NYMSA9IE1hdGgudHJ1bmMoZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCk7XG5cbiAgICAgIGNvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMHMnO1xuICAgIH07XG5cbiAgICBjb25zdCB0b3VjaE1vdmVIYW5kbGVyID0gKGV2dCkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50WCA9IE1hdGgudHJ1bmMoZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCk7XG4gICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IGNvbnRhaW5lci5vZmZzZXRXaWR0aDtcblxuICAgICAgcG9zWDIgPSBjbGllbnRYIC0gcG9zWDE7XG4gICAgICBjb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7K3Bvc0luaXQgKyAocG9zWDIgLyBjb250YWluZXJXaWR0aCkgKiAxMDB9JSwgMCwgMClgO1xuICAgIH07XG5cbiAgICBjb25zdCB0b3VjaEVuZEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICBzbGlkZXJXcmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoTW92ZUhhbmRsZXIpO1xuICAgICAgc2xpZGVyV3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoRW5kSGFuZGxlcik7XG5cbiAgICAgIGlmIChwb3NYMiA+IDApIHtcbiAgICAgICAgY2hhbmdlU2xpZGVzKHNlbGVjdGVkUGFnZSAtIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hhbmdlU2xpZGVzKHNlbGVjdGVkUGFnZSArIDEpO1xuICAgICAgfVxuXG5cbiAgICAgIGNvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSB0cmFuc2l0aW9uRHVyYXRpb247XG4gICAgfTtcblxuICAgIGNvbnN0IHRvZ2dsZVN3aXBlID0gKHdpZHRoKSA9PiB7XG4gICAgICBpZiAod2lkdGggPCBERVNLVE9QX1dJRFRIKSB7XG4gICAgICAgIHNsaWRlcldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoU3RhcnRIYW5kbGVyLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xpZGVyV3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hTdGFydEhhbmRsZXIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhyb3R0bGUocmVzaXplV2luZG93SGFuZGxlcikpO1xuXG4gICAgYnV0dG9uTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNoYW5nZVNsaWRlcyhzZWxlY3RlZFBhZ2UgKyAxKSk7XG4gICAgYnV0dG9uUHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNoYW5nZVNsaWRlcyhzZWxlY3RlZFBhZ2UgLSAxKSk7XG5cbiAgICByZW5kZXJQYWdpbmF0aW9uKHZpZXdXaWR0aCwgdHJ1ZSk7XG4gICAgdG9nZ2xlU3dpcGUodmlld1dpZHRoKTtcbiAgfTtcblxuICBzZXRTTGlkZXIoc2xpZGVyKTtcbn0pKCk7XG4iXX0=
