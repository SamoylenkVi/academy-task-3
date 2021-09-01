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

    const trap = window.focusTrap.createFocusTrap(popup, {initialFocus: inputMail});

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImZhcS5qcyIsIm5hdmlnYXRpb24uanMiLCJwb3B1cC5qcyIsInNsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IEgzX1RBR19OQU1FID0gJ0gzJztcbiAgY29uc3QgT1BFTl9GSUxURVJfQlVUVE9OID0gJ29wZW4nO1xuICBjb25zdCBDTE9TRV9GSUxURVJfQlVUVE9OID0gJ2Nsb3NlJztcblxuICBjb25zdCBzZXRGaWx0ZXIgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBjYXRhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2cnKTtcbiAgICBpZiAoIWNhdGFsb2cpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY2NvcmRpb25zID0gY2F0YWxvZy5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9fZmlsdGVyJyk7XG4gICAgY29uc3QgZmlsdGVyTWVudSA9IGNhdGFsb2cucXVlcnlTZWxlY3RvcignLmZvcm0nKTtcbiAgICBjb25zdCBmaWx0ZXJCdXR0b24gPSBjYXRhbG9nLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX190b2dnbGUtbWVudScpO1xuXG4gICAgZmlsdGVyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdmb3JtLS1uby1qcycpO1xuICAgIGZpbHRlckJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdmb3JtX190b2dnbGUtbWVudS0tbm8tanMnKTtcbiAgICBmaWx0ZXJNZW51LmNsYXNzTGlzdC5hZGQoJ2Zvcm0tLWNsb3NlJyk7XG5cbiAgICBjb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGV2dCkgPT4ge1xuICAgICAgY29uc3QgaXNUYXJnZXRDbGlja2VkID0gZXZ0LnRhcmdldC50YWdOYW1lID09PSBIM19UQUdfTkFNRTtcblxuICAgICAgaWYgKGlzVGFyZ2V0Q2xpY2tlZCkge1xuICAgICAgICBhY2NvcmRpb25zLmZvckVhY2goKGFjY29yZGlvbikgPT4ge1xuICAgICAgICAgIGlmIChldnQuY3VycmVudFRhcmdldCA9PT0gYWNjb3JkaW9uKSB7XG4gICAgICAgICAgICBhY2NvcmRpb24uY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybV9fZmlsdGVyLS1jbG9zZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChhY2NvcmRpb25zICYmIGFjY29yZGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgYWNjb3JkaW9ucy5mb3JFYWNoKChhY2NvcmRpb24pID0+IHtcbiAgICAgICAgYWNjb3JkaW9uLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX2ZpbHRlci0tY2xvc2UnKTtcbiAgICAgICAgYWNjb3JkaW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlVmlzaWJpbGl0eSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VGaWx0ZXJzVmlzaWJpbGl0eSA9ICgpID0+IHtcbiAgICAgIGlmIChmaWx0ZXJNZW51KSB7XG4gICAgICAgIGZpbHRlck1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybS0tY2xvc2UnKTtcbiAgICAgICAgZmlsdGVyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtLS1vcGVuJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNhdGFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXREYXRhID0gZXZ0LnRhcmdldC5kYXRhc2V0LmZpbHRlckJ1dHRvbjtcblxuICAgICAgaWYgKHRhcmdldERhdGEgPT09IE9QRU5fRklMVEVSX0JVVFRPTiB8fCB0YXJnZXREYXRhID09PSBDTE9TRV9GSUxURVJfQlVUVE9OKSB7XG4gICAgICAgIGNoYW5nZUZpbHRlcnNWaXNpYmlsaXR5KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgc2V0RmlsdGVyKCk7XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZmFxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhcScpO1xuXG4gIGNvbnN0IHNldEFjY29yZGlvbiA9IChzZWN0aW9uKSA9PiB7XG4gICAgaWYgKCFzZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYXFfX2l0ZW0nKTtcblxuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdmYXFfX2l0ZW0tLW9wZW4nKTtcbiAgICAgIGl0ZW1cbiAgICAgICAgICAucXVlcnlTZWxlY3RvcignZHQgPiBhJylcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnZmFxX19pdGVtLS1vcGVuJyk7XG4gICAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgc2V0QWNjb3JkaW9uKGZhcSk7XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fd3JhcHBlcicpO1xuICBjb25zdCBoZWFkZXJUb2dnbGUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fdG9nZ2xlJyk7XG4gIGNvbnN0IGhlYWRlckljb24gPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmhlYWRlcl9faWNvbicpO1xuICBjb25zdCBoZWFkZXJDYXJ0ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2NhcnQnKTtcbiAgY29uc3QgaGVhZGVyQ29udGVudCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jb250ZW50Jyk7XG5cblxuICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyX193cmFwcGVyLS1jbG9zZScpO1xuICBoZWFkZXJJY29uLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcl9faWNvbi0tY2xvc2UnKTtcbiAgaGVhZGVyQ2FydC5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX2NhcnQtLWNsb3NlJyk7XG4gIGhlYWRlckNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaGVhZGVyX19jb250ZW50LS1jbG9zZScpO1xuXG5cbiAgaGVhZGVyVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChoZWFkZXJUb2dnbGUpIHtcbiAgICAgIGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX3dyYXBwZXItLWNsb3NlJyk7XG4gICAgICBoZWFkZXJJY29uLmNsYXNzTGlzdC50b2dnbGUoJ2hlYWRlcl9faWNvbi0tY2xvc2UnKTtcbiAgICAgIGhlYWRlckNhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnaGVhZGVyX19jYXJ0LS1jbG9zZScpO1xuICAgICAgaGVhZGVyQ29udGVudC5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX2NvbnRlbnQtLWNsb3NlJyk7XG4gICAgfVxuICB9KTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKCkge1xuICBjb25zdCBrZXlzID0ge1xuICAgIEVTQ0FQRTogJ0VzY2FwZScsXG4gICAgRVNDOiAnRXNjJyxcbiAgfTtcblxuICBjb25zdCByZWdFeHBNYWlsID0gL14oPzpbLWEtelxcZFxcK1xcKlxcL1xcPyF7fX5fJSYnPV4kI10rKD86XFwuWy1hLXpcXGRcXCtcXCpcXC9cXD8he31+XyUmJz1eJCNdKykqKUAoPzpbLWEtelxcZF9dK1xcLil7MSw2MH1bYS16XXsyLDZ9JC87XG5cbiAgY29uc3Qgc2V0UG9wdXAgPSAoKSA9PiB7XG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcblxuICAgIGlmICghcG9wdXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGNvbnN0IGZvcm0gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG4gICAgY29uc3QgcG9wdXBPcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtocmVmPVwibG9naW4uaHRtbFwiXScpO1xuICAgIGNvbnN0IHBvcHVwVW5kZXJsYXkgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3VuZGVybGF5Jyk7XG4gICAgY29uc3QgcG9wdXBCdXR0b25DbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2xvc2UnKTtcbiAgICBjb25zdCBpbnB1dE1haWwgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJlLW1haWxcIl0nKTtcbiAgICBjb25zdCBpbnB1dFBhc3N3b3JkID0gcG9wdXAucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInBhc3N3b3JkXCJdJyk7XG5cbiAgICBjb25zdCB0cmFwID0gd2luZG93LmZvY3VzVHJhcC5jcmVhdGVGb2N1c1RyYXAocG9wdXAsIHtpbml0aWFsRm9jdXM6IGlucHV0TWFpbH0pO1xuXG4gICAgY29uc3QgdG9nZ2xlVmFsaWRhdGlvbiA9IChpbnB1dCwgaXNWYWxpZCkgPT4ge1xuICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb3BlblBvcHVwSGFuZGxlciA9IChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBwYWdlLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgcG9wdXBVbmRlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXBIYW5kbGVyKTtcbiAgICAgIHBvcHVwQnV0dG9uQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwSGFuZGxlcik7XG4gICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHN1Ym1pdEZvcm1IYW5kbGVyKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlc2NhcGVLZXlkb3duSGFuZGxlcik7XG5cbiAgICAgIHRyYXAuYWN0aXZhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2xvc2VQb3B1cEhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgcGFnZS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgIHBvcHVwVW5kZXJsYXkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwSGFuZGxlcik7XG4gICAgICBwb3B1cEJ1dHRvbkNsb3NlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cEhhbmRsZXIpO1xuICAgICAgZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBzdWJtaXRGb3JtSGFuZGxlcik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXNjYXBlS2V5ZG93bkhhbmRsZXIpO1xuXG4gICAgICB0cmFwLmRlYWN0aXZhdGUoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZXNjYXBlS2V5ZG93bkhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZXZ0LmtleSA9PT0ga2V5cy5FU0NBUEUgfHwgZXZ0LmtleSA9PT0ga2V5cy5FU0MpIHtcbiAgICAgICAgY2xvc2VQb3B1cEhhbmRsZXIoZXZ0KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgc3VibWl0Rm9ybUhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCBpc01haWxWYWxpZCA9IGlucHV0TWFpbC52YWx1ZS5zZWFyY2gocmVnRXhwTWFpbCkgIT09IC0xO1xuICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gaW5wdXRQYXNzd29yZC52YWx1ZS5sZW5ndGggIT09IDA7XG5cbiAgICAgIGlmICghaXNNYWlsVmFsaWQgfHwgIWlzUGFzc3dvcmRWYWxpZCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgdG9nZ2xlVmFsaWRhdGlvbihpbnB1dE1haWwsIGlzTWFpbFZhbGlkKTtcbiAgICAgIHRvZ2dsZVZhbGlkYXRpb24oaW5wdXRQYXNzd29yZCwgaXNQYXNzd29yZFZhbGlkKTtcbiAgICB9O1xuXG4gICAgcG9wdXBPcGVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblBvcHVwSGFuZGxlcik7XG5cbiAgICBjb25zdCBzZXRMb2NhbFN0b3JhZ2UgPSAoZWxlbWVudCwgc3RvcmFnZUtleSkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZVZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmFnZUtleSk7XG4gICAgICAgIGlmIChzdG9yYWdlVmFsdWUpIHtcbiAgICAgICAgICBlbGVtZW50LnZhbHVlID0gc3RvcmFnZVZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RvcmFnZUtleSwgZXZ0LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzZXRMb2NhbFN0b3JhZ2UoaW5wdXRNYWlsLCAnTWFpbCcpO1xuICB9O1xuXG4gIHNldFBvcHVwKCk7XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlcicpO1xuXG4gIGNvbnN0IHNldFNMaWRlciA9IChzZWN0aW9uKSA9PiB7XG4gICAgaWYgKCFzZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgREVTS1RPUF9XSURUSCA9IDEwMjQ7XG4gICAgY29uc3QgVEFCTEVUX1dJRFRIID0gNzY4O1xuXG4gICAgY29uc3QgU2xpZGVzTWFyZ2luID0ge1xuICAgICAgREVTS1RPUDogMi41NixcbiAgICAgIFRBQkxFVDogNC40MixcbiAgICAgIE1PQklMRTogMTAuMzRcbiAgICB9O1xuXG4gICAgY29uc3QgU2xpZGVzUGVyUGFnZSA9IHtcbiAgICAgIERFU0tUT1A6IDQsXG4gICAgICBUQUJMRVQ6IDIsXG4gICAgfTtcblxuICAgIGNvbnN0IHNsaWRlcldyYXBwZXIgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2l0ZW1zJyk7XG4gICAgY29uc3QgYnV0dG9uTmV4dCA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fZm9yd2FyZCcpO1xuICAgIGNvbnN0IGJ1dHRvblByZXYgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2JhY2snKTtcbiAgICBjb25zdCBwYWdpbmF0aW9uID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19wYWdpbmF0aW9uJyk7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2l0ZW1zIHVsJyk7XG5cbiAgICBjb25zdCBtb2JpbGVQYWdpbmF0aW9uVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9iaWxlLXNsaWRlci1jb3VudGVyJykuY29udGVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCBkZXNrdG9wUGFnaW5hdGlvblRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2t0b3Atc2xpZGVyLWNvdW50ZXInKS5jb250ZW50LmZpcnN0RWxlbWVudENoaWxkO1xuXG4gICAgY29uc3Qgc2xpZGVzQ291bnQgPSBjb250YWluZXIuY2hpbGRFbGVtZW50Q291bnQ7XG5cbiAgICBjb25zdCB7dHJhbnNpdGlvbkR1cmF0aW9ufSA9IGdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKTtcbiAgICBjb25zdCB0cmFuc2xSZWdFeHAgPSAvKFstMC05Ll0rKD89JSkpLztcblxuICAgIGxldCB2aWV3V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgbGV0IHNlbGVjdGVkUGFnZSA9IDE7XG4gICAgbGV0IHBvc0luaXQ7XG4gICAgbGV0IHBvc1gxID0gMDtcbiAgICBsZXQgcG9zWDIgPSAwO1xuXG4gICAgY29uc3QgdGhyb3R0bGUgPSAoY2FsbGJhY2ssIHdhaXQgPSAzMDAsIGltbWVkaWF0ZSA9IHRydWUpID0+IHtcbiAgICAgIGxldCB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGxldCBpbml0aWFsQ2FsbCA9IHRydWU7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgaW5pdGlhbENhbGw7XG4gICAgICAgIGNvbnN0IG5leHQgPSAoKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgIGluaXRpYWxDYWxsID0gZmFsc2U7XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobmV4dCwgd2FpdCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IHJlc2l6ZVdpbmRvd0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoID09PSB2aWV3V2lkdGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2Vmlld1dpZHRoID0gdmlld1dpZHRoO1xuICAgICAgdmlld1dpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgcmVuZGVyUGFnaW5hdGlvbihwcmV2Vmlld1dpZHRoKTtcbiAgICAgIGNoYW5nZVNsaWRlcygxKTtcbiAgICAgIHRvZ2dsZVN3aXBlKHZpZXdXaWR0aCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlbmRlckRlc2t0b3BQYWdpbmF0aW9uID0gKGNvdW50LCBjdXJyZW50UGFnZSkgPT4ge1xuICAgICAgY29uc3QgcGFnZXNDb3VudCA9IE1hdGguY2VpbChjb3VudCAvICh2aWV3V2lkdGggPj0gREVTS1RPUF9XSURUSCA/IFNsaWRlc1BlclBhZ2UuREVTS1RPUCA6IFNsaWRlc1BlclBhZ2UuVEFCTEVUKSk7XG4gICAgICBjb25zdCBwYWdlc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGB1bGApO1xuXG4gICAgICBjb25zdCBwYWdlcyA9IG5ldyBBcnJheShwYWdlc0NvdW50KVxuICAgICAgICAgIC5maWxsKClcbiAgICAgICAgICAubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VOdW1iZXIgPSBpbmRleCArIDE7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZGVza3RvcFBhZ2luYXRpb25UZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50TGluayA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYScpO1xuXG4gICAgICAgICAgICBlbGVtZW50TGluay5zZXRBdHRyaWJ1dGUoYGFyaWEtbGFiZWxgLCBgU2xpZGVyIHBhZ2UgJHtwYWdlTnVtYmVyfWApO1xuICAgICAgICAgICAgZWxlbWVudExpbmsuc2V0QXR0cmlidXRlKGBkYXRhLXBhZ2UtbnVtYmVyYCwgYCR7cGFnZU51bWJlcn1gKTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRQYWdlICE9PSBwYWdlTnVtYmVyKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnRMaW5rLnNldEF0dHJpYnV0ZShgaHJlZmAsIGAjYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnRMaW5rLnRleHRDb250ZW50ID0gcGFnZU51bWJlcjtcblxuICAgICAgICAgICAgZWxlbWVudExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBjaGFuZ2VTbGlkZXMoK2V2dC50YXJnZXQuZGF0YXNldC5wYWdlTnVtYmVyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgICB9KTtcblxuICAgICAgcGFnZXMuZm9yRWFjaChwYWdlID0+IHBhZ2VzTGlzdC5hcHBlbmQocGFnZSkpO1xuXG4gICAgICBwYWdpbmF0aW9uLmlubmVySFRNTCA9IGBgO1xuICAgICAgcGFnaW5hdGlvbi5hcHBlbmQocGFnZXNMaXN0KTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVuZGVyTW9iaWxlUGFnaW5hdGlvbiA9IChjb3VudCwgY3VycmVudFBhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHBhZ2VzQ291bnQgPSBNYXRoLmNlaWwoY291bnQgLyBTbGlkZXNQZXJQYWdlLlRBQkxFVCk7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBtb2JpbGVQYWdpbmF0aW9uVGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICBjb25zdCBbY3VycmVudCwgdG90YWxdID0gQXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKSk7XG4gICAgICBjdXJyZW50LnRleHRDb250ZW50ID0gY3VycmVudFBhZ2U7XG4gICAgICB0b3RhbC50ZXh0Q29udGVudCA9IHBhZ2VzQ291bnQ7XG5cbiAgICAgIHBhZ2luYXRpb24uaW5uZXJIVE1MID0gYGA7XG4gICAgICBwYWdpbmF0aW9uLmFwcGVuZChlbGVtZW50KTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVuZGVyUGFnaW5hdGlvbiA9IChwcmV2Vmlld1dpZHRoLCBpc0ZpcnN0UmVuZGVyID0gZmFsc2UpID0+IHtcbiAgICAgIGlmICgocHJldlZpZXdXaWR0aCA8IERFU0tUT1BfV0lEVEggfHwgaXNGaXJzdFJlbmRlcikgJiYgdmlld1dpZHRoID49IERFU0tUT1BfV0lEVEgpIHtcbiAgICAgICAgcmVuZGVyRGVza3RvcFBhZ2luYXRpb24oc2xpZGVzQ291bnQsIHNlbGVjdGVkUGFnZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgocHJldlZpZXdXaWR0aCA8IFRBQkxFVF9XSURUSCB8fCBwcmV2Vmlld1dpZHRoID49IERFU0tUT1BfV0lEVEggfHwgaXNGaXJzdFJlbmRlcikgJiYgKHZpZXdXaWR0aCA+PSBUQUJMRVRfV0lEVEggJiYgdmlld1dpZHRoIDwgREVTS1RPUF9XSURUSCkpIHtcbiAgICAgICAgcmVuZGVyRGVza3RvcFBhZ2luYXRpb24oc2xpZGVzQ291bnQsIHNlbGVjdGVkUGFnZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgocHJldlZpZXdXaWR0aCA+PSBUQUJMRVRfV0lEVEggfHwgaXNGaXJzdFJlbmRlcikgJiYgdmlld1dpZHRoIDwgVEFCTEVUX1dJRFRIKSB7XG4gICAgICAgIHJlbmRlck1vYmlsZVBhZ2luYXRpb24oc2xpZGVzQ291bnQsIHNlbGVjdGVkUGFnZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYW5nZVNsaWRlcyA9IChwb3NpdGlvbikgPT4ge1xuICAgICAgY29uc3QgcGFnZXNDb3VudCA9IE1hdGguY2VpbChzbGlkZXNDb3VudCAvICh2aWV3V2lkdGggPiBERVNLVE9QX1dJRFRIID8gU2xpZGVzUGVyUGFnZS5ERVNLVE9QIDogU2xpZGVzUGVyUGFnZS5UQUJMRVQpKTtcblxuICAgICAgbGV0IG1hcmdpbiA9IDA7XG5cbiAgICAgIGlmICh2aWV3V2lkdGggPj0gREVTS1RPUF9XSURUSCkge1xuICAgICAgICBtYXJnaW4gPSBTbGlkZXNNYXJnaW4uREVTS1RPUDtcbiAgICAgIH0gZWxzZSBpZiAodmlld1dpZHRoID49IFRBQkxFVF9XSURUSCkge1xuICAgICAgICBtYXJnaW4gPSBTbGlkZXNNYXJnaW4uVEFCTEVUO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFyZ2luID0gU2xpZGVzTWFyZ2luLk1PQklMRTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBvc2l0aW9uIDwgMSkge1xuICAgICAgICBzZWxlY3RlZFBhZ2UgPSBwYWdlc0NvdW50O1xuICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbiA+IHBhZ2VzQ291bnQpIHtcbiAgICAgICAgc2VsZWN0ZWRQYWdlID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGVjdGVkUGFnZSA9IHBvc2l0aW9uO1xuICAgICAgfVxuXG4gICAgICBjb250YWluZXIuc3R5bGUgPSBgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgkeygxIC0gc2VsZWN0ZWRQYWdlKSAqIDEwMCArIG1hcmdpbiAqICgxIC0gc2VsZWN0ZWRQYWdlKX0lLCAwLCAwKWA7XG4gICAgICB1cGRhdGVQYWdlKHNlbGVjdGVkUGFnZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZVBhZ2UgPSAocGFnZU51bWJlcikgPT4ge1xuICAgICAgaWYgKHZpZXdXaWR0aCA+PSBUQUJMRVRfV0lEVEgpIHtcbiAgICAgICAgcGFnaW5hdGlvblxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKVxuICAgICAgICAgICAgLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgIGlmICgraXRlbS5kYXRhc2V0LnBhZ2VOdW1iZXIgPT09IHBhZ2VOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWdpbmF0aW9uXG4gICAgICAgICAgICAucXVlcnlTZWxlY3Rvcignc3BhbicpXG4gICAgICAgICAgICAudGV4dENvbnRlbnQgPSBwYWdlTnVtYmVyO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCB0b3VjaFN0YXJ0SGFuZGxlciA9IChldnQpID0+IHtcblxuICAgICAgc2xpZGVyV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaE1vdmVIYW5kbGVyKTtcbiAgICAgIHNsaWRlcldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEVuZEhhbmRsZXIpO1xuXG4gICAgICBbcG9zSW5pdF0gPSBjb250YWluZXIuc3R5bGUudHJhbnNmb3JtLm1hdGNoKHRyYW5zbFJlZ0V4cCkgfHwgWzBdO1xuICAgICAgcG9zWDEgPSBNYXRoLnRydW5jKGV2dC50b3VjaGVzWzBdLmNsaWVudFgpO1xuXG4gICAgICBjb250YWluZXIuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzBzJztcbiAgICB9O1xuXG4gICAgY29uc3QgdG91Y2hNb3ZlSGFuZGxlciA9IChldnQpID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudFggPSBNYXRoLnRydW5jKGV2dC50b3VjaGVzWzBdLmNsaWVudFgpO1xuICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSBjb250YWluZXIub2Zmc2V0V2lkdGg7XG5cbiAgICAgIHBvc1gyID0gY2xpZW50WCAtIHBvc1gxO1xuICAgICAgY29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgkeytwb3NJbml0ICsgKHBvc1gyIC8gY29udGFpbmVyV2lkdGgpICogMTAwfSUsIDAsIDApYDtcbiAgICB9O1xuXG4gICAgY29uc3QgdG91Y2hFbmRIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgc2xpZGVyV3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaE1vdmVIYW5kbGVyKTtcbiAgICAgIHNsaWRlcldyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEVuZEhhbmRsZXIpO1xuXG4gICAgICBpZiAocG9zWDIgPiAwKSB7XG4gICAgICAgIGNoYW5nZVNsaWRlcyhzZWxlY3RlZFBhZ2UgLSAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoYW5nZVNsaWRlcyhzZWxlY3RlZFBhZ2UgKyAxKTtcbiAgICAgIH1cblxuXG4gICAgICBjb250YWluZXIuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gdHJhbnNpdGlvbkR1cmF0aW9uO1xuICAgIH07XG5cbiAgICBjb25zdCB0b2dnbGVTd2lwZSA9ICh3aWR0aCkgPT4ge1xuICAgICAgaWYgKHdpZHRoIDwgREVTS1RPUF9XSURUSCkge1xuICAgICAgICBzbGlkZXJXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaFN0YXJ0SGFuZGxlciwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlcldyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoU3RhcnRIYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlKHJlc2l6ZVdpbmRvd0hhbmRsZXIpKTtcblxuICAgIGJ1dHRvbk5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjaGFuZ2VTbGlkZXMoc2VsZWN0ZWRQYWdlICsgMSkpO1xuICAgIGJ1dHRvblByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjaGFuZ2VTbGlkZXMoc2VsZWN0ZWRQYWdlIC0gMSkpO1xuXG4gICAgcmVuZGVyUGFnaW5hdGlvbih2aWV3V2lkdGgsIHRydWUpO1xuICAgIHRvZ2dsZVN3aXBlKHZpZXdXaWR0aCk7XG4gIH07XG5cbiAgc2V0U0xpZGVyKHNsaWRlcik7XG59KSgpO1xuIl19
