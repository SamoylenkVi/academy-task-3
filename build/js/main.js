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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImZhcS5qcyIsIm5hdmlnYXRpb24uanMiLCJwb3B1cC5qcyIsInNsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgSDNfVEFHX05BTUUgPSAnSDMnO1xuICBjb25zdCBPUEVOX0ZJTFRFUl9CVVRUT04gPSAnb3Blbic7XG4gIGNvbnN0IENMT1NFX0ZJTFRFUl9CVVRUT04gPSAnY2xvc2UnO1xuXG4gIGNvbnN0IHNldEZpbHRlciA9ICgpID0+IHtcblxuICAgIGNvbnN0IGNhdGFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZycpO1xuICAgIGlmICghY2F0YWxvZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjY29yZGlvbnMgPSBjYXRhbG9nLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19maWx0ZXInKTtcbiAgICBjb25zdCBmaWx0ZXJNZW51ID0gY2F0YWxvZy5xdWVyeVNlbGVjdG9yKCcuZm9ybScpO1xuXG4gICAgY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IChldnQpID0+IHtcbiAgICAgIGNvbnN0IGlzVGFyZ2V0Q2xpY2tlZCA9IGV2dC50YXJnZXQudGFnTmFtZSA9PT0gSDNfVEFHX05BTUU7XG5cbiAgICAgIGlmIChpc1RhcmdldENsaWNrZWQpIHtcbiAgICAgICAgYWNjb3JkaW9ucy5mb3JFYWNoKChhY2NvcmRpb24pID0+IHtcbiAgICAgICAgICBpZiAoZXZ0LmN1cnJlbnRUYXJnZXQgPT09IGFjY29yZGlvbikge1xuICAgICAgICAgICAgYWNjb3JkaW9uLmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm1fX2ZpbHRlci0tY2xvc2UnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoYWNjb3JkaW9ucyAmJiBhY2NvcmRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGFjY29yZGlvbnMuZm9yRWFjaCgoYWNjb3JkaW9uKSA9PiB7XG4gICAgICAgIGFjY29yZGlvbi5jbGFzc0xpc3QuYWRkKCdmb3JtX19maWx0ZXItLWNsb3NlJyk7XG4gICAgICAgIGFjY29yZGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVZpc2liaWxpdHkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlRmlsdGVyc1Zpc2liaWxpdHkgPSAoKSA9PiB7XG4gICAgICBpZiAoZmlsdGVyTWVudSkge1xuICAgICAgICBmaWx0ZXJNZW51LmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm0tLWNsb3NlJyk7XG4gICAgICAgIGZpbHRlck1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybS0tb3BlbicpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjYXRhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0RGF0YSA9IGV2dC50YXJnZXQuZGF0YXNldC5maWx0ZXJCdXR0b247XG5cbiAgICAgIGlmICh0YXJnZXREYXRhID09PSBPUEVOX0ZJTFRFUl9CVVRUT04gfHwgdGFyZ2V0RGF0YSA9PT0gQ0xPU0VfRklMVEVSX0JVVFRPTikge1xuICAgICAgICBjaGFuZ2VGaWx0ZXJzVmlzaWJpbGl0eSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHNldEZpbHRlcigpO1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGZhcSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXEnKTtcblxuICBjb25zdCBzZXRBY2NvcmRpb24gPSAoc2VjdGlvbikgPT4ge1xuICAgIGlmICghc2VjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCcuZmFxX19pdGVtJyk7XG5cbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnZmFxX19pdGVtLS1vcGVuJyk7XG4gICAgICBpdGVtXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ2R0ID4gYScpXG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ2ZhcV9faXRlbS0tb3BlbicpO1xuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHNldEFjY29yZGlvbihmYXEpO1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3dyYXBwZXInKTtcbiAgY29uc3QgaGVhZGVyVG9nZ2xlID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3RvZ2dsZScpO1xuICBjb25zdCBoZWFkZXJJY29uID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2ljb24nKTtcbiAgY29uc3QgaGVhZGVyQ2FydCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jYXJ0Jyk7XG4gIGNvbnN0IGhlYWRlckNvbnRlbnQgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29udGVudCcpO1xuXG5cbiAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcl9fd3JhcHBlci0tY2xvc2UnKTtcbiAgaGVhZGVySWNvbi5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX2ljb24tLWNsb3NlJyk7XG4gIGhlYWRlckNhcnQuY2xhc3NMaXN0LmFkZCgnaGVhZGVyX19jYXJ0LS1jbG9zZScpO1xuICBoZWFkZXJDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2hlYWRlcl9fY29udGVudC0tY2xvc2UnKTtcblxuXG4gIGhlYWRlclRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZiAoaGVhZGVyVG9nZ2xlKSB7XG4gICAgICBoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGVhZGVyX193cmFwcGVyLS1jbG9zZScpO1xuICAgICAgaGVhZGVySWNvbi5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX2ljb24tLWNsb3NlJyk7XG4gICAgICBoZWFkZXJDYXJ0LmNsYXNzTGlzdC50b2dnbGUoJ2hlYWRlcl9fY2FydC0tY2xvc2UnKTtcbiAgICAgIGhlYWRlckNvbnRlbnQuY2xhc3NMaXN0LnRvZ2dsZSgnaGVhZGVyX19jb250ZW50LS1jbG9zZScpO1xuICAgIH1cbiAgfSk7XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qga2V5cyA9IHtcbiAgICBFU0NBUEU6ICdFc2NhcGUnLFxuICAgIEVTQzogJ0VzYycsXG4gIH07XG5cbiAgY29uc3QgcmVnRXhwTWFpbCA9IC9eKD86Wy1hLXpcXGRcXCtcXCpcXC9cXD8he31+XyUmJz1eJCNdKyg/OlxcLlstYS16XFxkXFwrXFwqXFwvXFw/IXt9fl8lJic9XiQjXSspKilAKD86Wy1hLXpcXGRfXStcXC4pezEsNjB9W2Etel17Miw2fSQvO1xuXG4gIGNvbnN0IHNldFBvcHVwID0gKCkgPT4ge1xuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJyk7XG5cbiAgICBpZiAoIXBvcHVwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBjb25zdCBmb3JtID0gcG9wdXAucXVlcnlTZWxlY3RvcignZm9ybScpO1xuICAgIGNvbnN0IHBvcHVwT3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FbaHJlZj1cImxvZ2luLmh0bWxcIl0nKTtcbiAgICBjb25zdCBwb3B1cFVuZGVybGF5ID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX191bmRlcmxheScpO1xuICAgIGNvbnN0IHBvcHVwQnV0dG9uQ2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Nsb3NlJyk7XG4gICAgY29uc3QgaW5wdXRNYWlsID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiZS1tYWlsXCJdJyk7XG4gICAgY29uc3QgaW5wdXRQYXNzd29yZCA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpO1xuXG4gICAgY29uc3QgdHJhcCA9IHdpbmRvdy5mb2N1c1RyYXAuY3JlYXRlRm9jdXNUcmFwKHBvcHVwLCB7aW5pdGlhbEZvY3VzOiBpbnB1dE1haWx9KTtcblxuICAgIGNvbnN0IHRvZ2dsZVZhbGlkYXRpb24gPSAoaW5wdXQsIGlzVmFsaWQpID0+IHtcbiAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9wZW5Qb3B1cEhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgcGFnZS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgIHBvcHVwVW5kZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwSGFuZGxlcik7XG4gICAgICBwb3B1cEJ1dHRvbkNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cEhhbmRsZXIpO1xuICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBzdWJtaXRGb3JtSGFuZGxlcik7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXNjYXBlS2V5ZG93bkhhbmRsZXIpO1xuXG4gICAgICB0cmFwLmFjdGl2YXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNsb3NlUG9wdXBIYW5kbGVyID0gKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHBhZ2Uuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XG4gICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICBwb3B1cFVuZGVybGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cEhhbmRsZXIpO1xuICAgICAgcG9wdXBCdXR0b25DbG9zZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXBIYW5kbGVyKTtcbiAgICAgIGZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VibWl0Jywgc3VibWl0Rm9ybUhhbmRsZXIpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGVzY2FwZUtleWRvd25IYW5kbGVyKTtcblxuICAgICAgdHJhcC5kZWFjdGl2YXRlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGVzY2FwZUtleWRvd25IYW5kbGVyID0gKGV2dCkgPT4ge1xuICAgICAgaWYgKGV2dC5rZXkgPT09IGtleXMuRVNDQVBFIHx8IGV2dC5rZXkgPT09IGtleXMuRVNDKSB7XG4gICAgICAgIGNsb3NlUG9wdXBIYW5kbGVyKGV2dCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHN1Ym1pdEZvcm1IYW5kbGVyID0gKGV2dCkgPT4ge1xuICAgICAgY29uc3QgaXNNYWlsVmFsaWQgPSBpbnB1dE1haWwudmFsdWUuc2VhcmNoKHJlZ0V4cE1haWwpICE9PSAtMTtcbiAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGlucHV0UGFzc3dvcmQudmFsdWUubGVuZ3RoICE9PSAwO1xuXG4gICAgICBpZiAoIWlzTWFpbFZhbGlkIHx8ICFpc1Bhc3N3b3JkVmFsaWQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHRvZ2dsZVZhbGlkYXRpb24oaW5wdXRNYWlsLCBpc01haWxWYWxpZCk7XG4gICAgICB0b2dnbGVWYWxpZGF0aW9uKGlucHV0UGFzc3dvcmQsIGlzUGFzc3dvcmRWYWxpZCk7XG4gICAgfTtcblxuICAgIHBvcHVwT3Blbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cEhhbmRsZXIpO1xuXG4gICAgY29uc3Qgc2V0TG9jYWxTdG9yYWdlID0gKGVsZW1lbnQsIHN0b3JhZ2VLZXkpID0+IHtcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2VWYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpO1xuICAgICAgICBpZiAoc3RvcmFnZVZhbHVlKSB7XG4gICAgICAgICAgZWxlbWVudC52YWx1ZSA9IHN0b3JhZ2VWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2dCkgPT4ge1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIGV2dC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2V0TG9jYWxTdG9yYWdlKGlucHV0TWFpbCwgJ01haWwnKTtcbiAgfTtcblxuICBzZXRQb3B1cCgpO1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXInKTtcblxuICBjb25zdCBzZXRTTGlkZXIgPSAoc2VjdGlvbikgPT4ge1xuICAgIGlmICghc2VjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IERFU0tUT1BfV0lEVEggPSAxMDI0O1xuICAgIGNvbnN0IFRBQkxFVF9XSURUSCA9IDc2ODtcblxuICAgIGNvbnN0IFNsaWRlc01hcmdpbiA9IHtcbiAgICAgIERFU0tUT1A6IDIuNTYsXG4gICAgICBUQUJMRVQ6IDQuNDIsXG4gICAgICBNT0JJTEU6IDEwLjM0XG4gICAgfTtcblxuICAgIGNvbnN0IFNsaWRlc1BlclBhZ2UgPSB7XG4gICAgICBERVNLVE9QOiA0LFxuICAgICAgVEFCTEVUOiAyLFxuICAgIH07XG5cbiAgICBjb25zdCBzbGlkZXJXcmFwcGVyID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19pdGVtcycpO1xuICAgIGNvbnN0IGJ1dHRvbk5leHQgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2ZvcndhcmQnKTtcbiAgICBjb25zdCBidXR0b25QcmV2ID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19iYWNrJyk7XG4gICAgY29uc3QgcGFnaW5hdGlvbiA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fcGFnaW5hdGlvbicpO1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19pdGVtcyB1bCcpO1xuXG4gICAgY29uc3QgbW9iaWxlUGFnaW5hdGlvblRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vYmlsZS1zbGlkZXItY291bnRlcicpLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgZGVza3RvcFBhZ2luYXRpb25UZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNrdG9wLXNsaWRlci1jb3VudGVyJykuY29udGVudC5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAgIGNvbnN0IHNsaWRlc0NvdW50ID0gY29udGFpbmVyLmNoaWxkRWxlbWVudENvdW50O1xuXG4gICAgY29uc3Qge3RyYW5zaXRpb25EdXJhdGlvbn0gPSBnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcik7XG4gICAgY29uc3QgdHJhbnNsUmVnRXhwID0gLyhbLTAtOS5dKyg/PSUpKS87XG5cbiAgICBsZXQgdmlld1dpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIGxldCBzZWxlY3RlZFBhZ2UgPSAxO1xuICAgIGxldCBwb3NJbml0O1xuICAgIGxldCBwb3NYMSA9IDA7XG4gICAgbGV0IHBvc1gyID0gMDtcblxuICAgIGNvbnN0IHRocm90dGxlID0gKGNhbGxiYWNrLCB3YWl0ID0gMzAwLCBpbW1lZGlhdGUgPSB0cnVlKSA9PiB7XG4gICAgICBsZXQgdGltZW91dCA9IG51bGw7XG4gICAgICBsZXQgaW5pdGlhbENhbGwgPSB0cnVlO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBjYWxsTm93ID0gaW1tZWRpYXRlICYmIGluaXRpYWxDYWxsO1xuICAgICAgICBjb25zdCBuZXh0ID0gKCkgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICBpbml0aWFsQ2FsbCA9IGZhbHNlO1xuICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG5leHQsIHdhaXQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCByZXNpemVXaW5kb3dIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA9PT0gdmlld1dpZHRoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJldlZpZXdXaWR0aCA9IHZpZXdXaWR0aDtcbiAgICAgIHZpZXdXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgIHJlbmRlclBhZ2luYXRpb24ocHJldlZpZXdXaWR0aCk7XG4gICAgICBjaGFuZ2VTbGlkZXMoMSk7XG4gICAgICB0b2dnbGVTd2lwZSh2aWV3V2lkdGgpO1xuICAgIH07XG5cbiAgICBjb25zdCByZW5kZXJEZXNrdG9wUGFnaW5hdGlvbiA9IChjb3VudCwgY3VycmVudFBhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHBhZ2VzQ291bnQgPSBNYXRoLmNlaWwoY291bnQgLyAodmlld1dpZHRoID49IERFU0tUT1BfV0lEVEggPyBTbGlkZXNQZXJQYWdlLkRFU0tUT1AgOiBTbGlkZXNQZXJQYWdlLlRBQkxFVCkpO1xuICAgICAgY29uc3QgcGFnZXNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgdWxgKTtcblxuICAgICAgY29uc3QgcGFnZXMgPSBuZXcgQXJyYXkocGFnZXNDb3VudClcbiAgICAgICAgICAuZmlsbCgpXG4gICAgICAgICAgLm1hcCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWdlTnVtYmVyID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRlc2t0b3BQYWdpbmF0aW9uVGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudExpbmsgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblxuICAgICAgICAgICAgZWxlbWVudExpbmsuc2V0QXR0cmlidXRlKGBhcmlhLWxhYmVsYCwgYFNsaWRlciBwYWdlICR7cGFnZU51bWJlcn1gKTtcbiAgICAgICAgICAgIGVsZW1lbnRMaW5rLnNldEF0dHJpYnV0ZShgZGF0YS1wYWdlLW51bWJlcmAsIGAke3BhZ2VOdW1iZXJ9YCk7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50UGFnZSAhPT0gcGFnZU51bWJlcikge1xuICAgICAgICAgICAgICBlbGVtZW50TGluay5zZXRBdHRyaWJ1dGUoYGhyZWZgLCBgI2ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50TGluay50ZXh0Q29udGVudCA9IHBhZ2VOdW1iZXI7XG5cbiAgICAgICAgICAgIGVsZW1lbnRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgY2hhbmdlU2xpZGVzKCtldnQudGFyZ2V0LmRhdGFzZXQucGFnZU51bWJlcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIHBhZ2VzLmZvckVhY2gocGFnZSA9PiBwYWdlc0xpc3QuYXBwZW5kKHBhZ2UpKTtcblxuICAgICAgcGFnaW5hdGlvbi5pbm5lckhUTUwgPSBgYDtcbiAgICAgIHBhZ2luYXRpb24uYXBwZW5kKHBhZ2VzTGlzdCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlbmRlck1vYmlsZVBhZ2luYXRpb24gPSAoY291bnQsIGN1cnJlbnRQYWdlKSA9PiB7XG4gICAgICBjb25zdCBwYWdlc0NvdW50ID0gTWF0aC5jZWlsKGNvdW50IC8gU2xpZGVzUGVyUGFnZS5UQUJMRVQpO1xuXG4gICAgICBjb25zdCBlbGVtZW50ID0gbW9iaWxlUGFnaW5hdGlvblRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgY29uc3QgW2N1cnJlbnQsIHRvdGFsXSA9IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzcGFuJykpO1xuICAgICAgY3VycmVudC50ZXh0Q29udGVudCA9IGN1cnJlbnRQYWdlO1xuICAgICAgdG90YWwudGV4dENvbnRlbnQgPSBwYWdlc0NvdW50O1xuXG4gICAgICBwYWdpbmF0aW9uLmlubmVySFRNTCA9IGBgO1xuICAgICAgcGFnaW5hdGlvbi5hcHBlbmQoZWxlbWVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlbmRlclBhZ2luYXRpb24gPSAocHJldlZpZXdXaWR0aCwgaXNGaXJzdFJlbmRlciA9IGZhbHNlKSA9PiB7XG4gICAgICBpZiAoKHByZXZWaWV3V2lkdGggPCBERVNLVE9QX1dJRFRIIHx8IGlzRmlyc3RSZW5kZXIpICYmIHZpZXdXaWR0aCA+PSBERVNLVE9QX1dJRFRIKSB7XG4gICAgICAgIHJlbmRlckRlc2t0b3BQYWdpbmF0aW9uKHNsaWRlc0NvdW50LCBzZWxlY3RlZFBhZ2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHByZXZWaWV3V2lkdGggPCBUQUJMRVRfV0lEVEggfHwgcHJldlZpZXdXaWR0aCA+PSBERVNLVE9QX1dJRFRIIHx8IGlzRmlyc3RSZW5kZXIpICYmICh2aWV3V2lkdGggPj0gVEFCTEVUX1dJRFRIICYmIHZpZXdXaWR0aCA8IERFU0tUT1BfV0lEVEgpKSB7XG4gICAgICAgIHJlbmRlckRlc2t0b3BQYWdpbmF0aW9uKHNsaWRlc0NvdW50LCBzZWxlY3RlZFBhZ2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHByZXZWaWV3V2lkdGggPj0gVEFCTEVUX1dJRFRIIHx8IGlzRmlyc3RSZW5kZXIpICYmIHZpZXdXaWR0aCA8IFRBQkxFVF9XSURUSCkge1xuICAgICAgICByZW5kZXJNb2JpbGVQYWdpbmF0aW9uKHNsaWRlc0NvdW50LCBzZWxlY3RlZFBhZ2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFuZ2VTbGlkZXMgPSAocG9zaXRpb24pID0+IHtcbiAgICAgIGNvbnN0IHBhZ2VzQ291bnQgPSBNYXRoLmNlaWwoc2xpZGVzQ291bnQgLyAodmlld1dpZHRoID4gREVTS1RPUF9XSURUSCA/IFNsaWRlc1BlclBhZ2UuREVTS1RPUCA6IFNsaWRlc1BlclBhZ2UuVEFCTEVUKSk7XG5cbiAgICAgIGxldCBtYXJnaW4gPSAwO1xuXG4gICAgICBpZiAodmlld1dpZHRoID49IERFU0tUT1BfV0lEVEgpIHtcbiAgICAgICAgbWFyZ2luID0gU2xpZGVzTWFyZ2luLkRFU0tUT1A7XG4gICAgICB9IGVsc2UgaWYgKHZpZXdXaWR0aCA+PSBUQUJMRVRfV0lEVEgpIHtcbiAgICAgICAgbWFyZ2luID0gU2xpZGVzTWFyZ2luLlRBQkxFVDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcmdpbiA9IFNsaWRlc01hcmdpbi5NT0JJTEU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwb3NpdGlvbiA8IDEpIHtcbiAgICAgICAgc2VsZWN0ZWRQYWdlID0gcGFnZXNDb3VudDtcbiAgICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPiBwYWdlc0NvdW50KSB7XG4gICAgICAgIHNlbGVjdGVkUGFnZSA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3RlZFBhZ2UgPSBwb3NpdGlvbjtcbiAgICAgIH1cblxuICAgICAgY29udGFpbmVyLnN0eWxlID0gYHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoJHsoMSAtIHNlbGVjdGVkUGFnZSkgKiAxMDAgKyBtYXJnaW4gKiAoMSAtIHNlbGVjdGVkUGFnZSl9JSwgMCwgMClgO1xuICAgICAgdXBkYXRlUGFnZShzZWxlY3RlZFBhZ2UpO1xuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVQYWdlID0gKHBhZ2VOdW1iZXIpID0+IHtcbiAgICAgIGlmICh2aWV3V2lkdGggPj0gVEFCTEVUX1dJRFRIKSB7XG4gICAgICAgIHBhZ2luYXRpb25cbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdhJylcbiAgICAgICAgICAgIC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICBpZiAoK2l0ZW0uZGF0YXNldC5wYWdlTnVtYmVyID09PSBwYWdlTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFnaW5hdGlvblxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKVxuICAgICAgICAgICAgLnRleHRDb250ZW50ID0gcGFnZU51bWJlcjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgdG91Y2hTdGFydEhhbmRsZXIgPSAoZXZ0KSA9PiB7XG5cbiAgICAgIHNsaWRlcldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hNb3ZlSGFuZGxlcik7XG4gICAgICBzbGlkZXJXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hFbmRIYW5kbGVyKTtcblxuICAgICAgW3Bvc0luaXRdID0gY29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybS5tYXRjaCh0cmFuc2xSZWdFeHApIHx8IFswXTtcbiAgICAgIHBvc1gxID0gTWF0aC50cnVuYyhldnQudG91Y2hlc1swXS5jbGllbnRYKTtcblxuICAgICAgY29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcwcyc7XG4gICAgfTtcblxuICAgIGNvbnN0IHRvdWNoTW92ZUhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCBjbGllbnRYID0gTWF0aC50cnVuYyhldnQudG91Y2hlc1swXS5jbGllbnRYKTtcbiAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gY29udGFpbmVyLm9mZnNldFdpZHRoO1xuXG4gICAgICBwb3NYMiA9IGNsaWVudFggLSBwb3NYMTtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHsrcG9zSW5pdCArIChwb3NYMiAvIGNvbnRhaW5lcldpZHRoKSAqIDEwMH0lLCAwLCAwKWA7XG4gICAgfTtcblxuICAgIGNvbnN0IHRvdWNoRW5kSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHNsaWRlcldyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hNb3ZlSGFuZGxlcik7XG4gICAgICBzbGlkZXJXcmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hFbmRIYW5kbGVyKTtcblxuICAgICAgaWYgKHBvc1gyID4gMCkge1xuICAgICAgICBjaGFuZ2VTbGlkZXMoc2VsZWN0ZWRQYWdlIC0gMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGFuZ2VTbGlkZXMoc2VsZWN0ZWRQYWdlICsgMSk7XG4gICAgICB9XG5cblxuICAgICAgY29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IHRyYW5zaXRpb25EdXJhdGlvbjtcbiAgICB9O1xuXG4gICAgY29uc3QgdG9nZ2xlU3dpcGUgPSAod2lkdGgpID0+IHtcbiAgICAgIGlmICh3aWR0aCA8IERFU0tUT1BfV0lEVEgpIHtcbiAgICAgICAgc2xpZGVyV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hTdGFydEhhbmRsZXIsIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZXJXcmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaFN0YXJ0SGFuZGxlcik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aHJvdHRsZShyZXNpemVXaW5kb3dIYW5kbGVyKSk7XG5cbiAgICBidXR0b25OZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2hhbmdlU2xpZGVzKHNlbGVjdGVkUGFnZSArIDEpKTtcbiAgICBidXR0b25QcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2hhbmdlU2xpZGVzKHNlbGVjdGVkUGFnZSAtIDEpKTtcblxuICAgIHJlbmRlclBhZ2luYXRpb24odmlld1dpZHRoLCB0cnVlKTtcbiAgICB0b2dnbGVTd2lwZSh2aWV3V2lkdGgpO1xuICB9O1xuXG4gIHNldFNMaWRlcihzbGlkZXIpO1xufSkoKTtcbiJdfQ==
