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

'use strict';
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

'use strict';

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

  const focusTrap = window.focusTrap;
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
    const slidesCount = container.childElementCount;

    const {transitionDuration} = getComputedStyle(container);
    const translRegExp = /([-0-9.]+(?=%))/;

    let viewWidth = document.documentElement.clientWidth;
    let selectedPage = 1;
    let posInit;
    let posX1 = 0;
    let posX2 = 0;

    const createElement = (template) => {
      const newElement = document.createElement(`div`);
      newElement.innerHTML = template;
      return newElement.firstChild || ``;
    };

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
      const pagesList = createElement(`<ul></ul>`);
      const pages = new Array(pagesCount)
          .fill()
          .map((value, index) => {
            const pageNumber = index + 1;
            const hyperRef = currentPage !== pageNumber ? ` href="#"` : ``;

            const template = `<li>
                                <a aria-label="slider page ${pageNumber}" data-page-number="${pageNumber}"${hyperRef}>
                                  ${index + 1}
                                </a>
                              </li>`;

            const element = createElement(template);

            element.addEventListener('click', (evt) => {
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

      const template = `<p><span>${currentPage}</span>&nbsp;&nbsp;of&nbsp;&nbsp;${pagesCount}</p>`;
      const element = createElement(template);

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImZhcS5qcyIsIm5hdmlnYXRpb24uanMiLCJwb3B1cC5qcyIsInNsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgSDNfVEFHX05BTUUgPSAnSDMnO1xuXG5jb25zdCBzZXRGaWx0ZXIgPSAoKSA9PiB7XG5cbiAgY29uc3QgY2F0YWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9nJyk7XG4gIGlmICghY2F0YWxvZykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGFjY29yZGlvbnMgPSBjYXRhbG9nLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19maWx0ZXInKTtcbiAgY29uc3Qgb3BlbkJ1dHRvbiA9IGNhdGFsb2cucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX3RvZ2dsZScpO1xuICBjb25zdCBmaWx0ZXJNZW51ID0gY2F0YWxvZy5xdWVyeVNlbGVjdG9yKCcuZm9ybScpO1xuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGNhdGFsb2cucXVlcnlTZWxlY3RvcignLmZvcm1fX3RvZ2dsZS1tZW51Jyk7XG5cblxuICBjb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IGlzVGFyZ2V0Q2xpY2tlZCA9IGV2dC50YXJnZXQudGFnTmFtZSA9PT0gSDNfVEFHX05BTUU7XG5cbiAgICBpZiAoaXNUYXJnZXRDbGlja2VkKSB7XG4gICAgICBhY2NvcmRpb25zLmZvckVhY2goKGFjY29yZGlvbikgPT4ge1xuICAgICAgICBpZiAoZXZ0LmN1cnJlbnRUYXJnZXQgPT09IGFjY29yZGlvbikge1xuICAgICAgICAgIGFjY29yZGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtX19maWx0ZXItLWNsb3NlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBpZiAoYWNjb3JkaW9ucyAmJiBhY2NvcmRpb25zLmxlbmd0aCA+IDApIHtcbiAgICBhY2NvcmRpb25zLmZvckVhY2goKGFjY29yZGlvbikgPT4ge1xuICAgICAgYWNjb3JkaW9uLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX2ZpbHRlci0tY2xvc2UnKTtcbiAgICAgIGFjY29yZGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVZpc2liaWxpdHkpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgYnV0dG9uQ2xpY2tIZWFuZGxlciA9ICgpID0+IHtcbiAgICBmaWx0ZXJNZW51LmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm0tLWNsb3NlJyk7XG4gICAgZmlsdGVyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtLS1vcGVuJyk7XG4gIH07XG5cbiAgb3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ1dHRvbkNsaWNrSGVhbmRsZXIpO1xuICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ1dHRvbkNsaWNrSGVhbmRsZXIpO1xuXG59O1xuXG5zZXRGaWx0ZXIoKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGZhcSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXEnKTtcblxuICBjb25zdCBzZXRBY2NvcmRpb24gPSAoc2VjdGlvbikgPT4ge1xuICAgIGlmICghc2VjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCcuZmFxX19pdGVtJyk7XG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnZmFxX19pdGVtLS1vcGVuJyk7XG4gICAgICBpdGVtXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ2R0ID4gYScpXG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ2ZhcV9faXRlbS0tb3BlbicpO1xuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHNldEFjY29yZGlvbihmYXEpO1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3dyYXBwZXInKTtcbmNvbnN0IGhlYWRlclRvZ2dsZSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX190b2dnbGUnKTtcbmNvbnN0IGhlYWRlckljb24gPSBoZWFkZXIucXVlcnlTZWxlY3RvcignLmhlYWRlcl9faWNvbicpO1xuY29uc3QgaGVhZGVyQ2FydCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jYXJ0Jyk7XG5jb25zdCBoZWFkZXJDb250ZW50ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2NvbnRlbnQnKTtcblxuXG5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyX193cmFwcGVyLS1jbG9zZScpO1xuaGVhZGVySWNvbi5jbGFzc0xpc3QuYWRkKCdoZWFkZXJfX2ljb24tLWNsb3NlJyk7XG5oZWFkZXJDYXJ0LmNsYXNzTGlzdC5hZGQoJ2hlYWRlcl9fY2FydC0tY2xvc2UnKTtcbmhlYWRlckNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaGVhZGVyX19jb250ZW50LS1jbG9zZScpO1xuXG5cbmhlYWRlclRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGhlYWRlclRvZ2dsZSkge1xuICAgIGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX3dyYXBwZXItLWNsb3NlJyk7XG4gICAgaGVhZGVySWNvbi5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX2ljb24tLWNsb3NlJyk7XG4gICAgaGVhZGVyQ2FydC5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX2NhcnQtLWNsb3NlJyk7XG4gICAgaGVhZGVyQ29udGVudC5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX2NvbnRlbnQtLWNsb3NlJyk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBrZXlzID0ge1xuICBFU0NBUEU6ICdFc2NhcGUnLFxuICBFU0M6ICdFc2MnLFxufTtcblxuY29uc3QgcmVnRXhwTWFpbCA9IC9eKD86Wy1hLXpcXGRcXCtcXCpcXC9cXD8he31+XyUmJz1eJCNdKyg/OlxcLlstYS16XFxkXFwrXFwqXFwvXFw/IXt9fl8lJic9XiQjXSspKilAKD86Wy1hLXpcXGRfXStcXC4pezEsNjB9W2Etel17Miw2fSQvO1xuXG5jb25zdCBzZXRQb3B1cCA9ICgpID0+IHtcbiAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcblxuICBpZiAoIXBvcHVwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgY29uc3QgZm9ybSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbiAgY29uc3QgcG9wdXBPcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtocmVmPVwibG9naW4uaHRtbFwiXScpO1xuICBjb25zdCBwb3B1cFVuZGVybGF5ID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX191bmRlcmxheScpO1xuICBjb25zdCBwb3B1cEJ1dHRvbkNsb3NlID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19jbG9zZScpO1xuICBjb25zdCBpbnB1dE1haWwgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJlLW1haWxcIl0nKTtcbiAgY29uc3QgaW5wdXRQYXNzd29yZCA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpO1xuXG4gIGNvbnN0IGZvY3VzVHJhcCA9IHdpbmRvdy5mb2N1c1RyYXA7XG4gIGNvbnN0IHRyYXAgPSBmb2N1c1RyYXAuY3JlYXRlRm9jdXNUcmFwKHBvcHVwLCB7aW5pdGlhbEZvY3VzOiBpbnB1dE1haWx9KTtcblxuICBjb25zdCB0b2dnbGVWYWxpZGF0aW9uID0gKGlucHV0LCBpc1ZhbGlkKSA9PiB7XG4gICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgb3BlblBvcHVwSGFuZGxlciA9IChldnQpID0+IHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHBhZ2Uuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgIHBvcHVwVW5kZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwSGFuZGxlcik7XG4gICAgcG9wdXBCdXR0b25DbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXBIYW5kbGVyKTtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHN1Ym1pdEZvcm1IYW5kbGVyKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXNjYXBlS2V5ZG93bkhhbmRsZXIpO1xuXG4gICAgdHJhcC5hY3RpdmF0ZSgpO1xuICB9O1xuXG4gIGNvbnN0IGNsb3NlUG9wdXBIYW5kbGVyID0gKGV2dCkgPT4ge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgcGFnZS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgcG9wdXBVbmRlcmxheS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXBIYW5kbGVyKTtcbiAgICBwb3B1cEJ1dHRvbkNsb3NlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cEhhbmRsZXIpO1xuICAgIGZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VibWl0Jywgc3VibWl0Rm9ybUhhbmRsZXIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlc2NhcGVLZXlkb3duSGFuZGxlcik7XG5cbiAgICB0cmFwLmRlYWN0aXZhdGUoKTtcbiAgfTtcblxuICBjb25zdCBlc2NhcGVLZXlkb3duSGFuZGxlciA9IChldnQpID0+IHtcbiAgICBpZiAoZXZ0LmtleSA9PT0ga2V5cy5FU0NBUEUgfHwgZXZ0LmtleSA9PT0ga2V5cy5FU0MpIHtcbiAgICAgIGNsb3NlUG9wdXBIYW5kbGVyKGV2dCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHN1Ym1pdEZvcm1IYW5kbGVyID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IGlzTWFpbFZhbGlkID0gaW5wdXRNYWlsLnZhbHVlLnNlYXJjaChyZWdFeHBNYWlsKSAhPT0gLTE7XG4gICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gaW5wdXRQYXNzd29yZC52YWx1ZS5sZW5ndGggIT09IDA7XG5cbiAgICBpZiAoIWlzTWFpbFZhbGlkIHx8ICFpc1Bhc3N3b3JkVmFsaWQpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZVZhbGlkYXRpb24oaW5wdXRNYWlsLCBpc01haWxWYWxpZCk7XG4gICAgdG9nZ2xlVmFsaWRhdGlvbihpbnB1dFBhc3N3b3JkLCBpc1Bhc3N3b3JkVmFsaWQpO1xuICB9O1xuXG4gIHBvcHVwT3Blbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cEhhbmRsZXIpO1xuXG4gIGNvbnN0IHNldExvY2FsU3RvcmFnZSA9IChlbGVtZW50LCBzdG9yYWdlS2V5KSA9PiB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHN0b3JhZ2VWYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpO1xuICAgICAgaWYgKHN0b3JhZ2VWYWx1ZSkge1xuICAgICAgICBlbGVtZW50LnZhbHVlID0gc3RvcmFnZVZhbHVlO1xuICAgICAgfVxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldnQpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RvcmFnZUtleSwgZXZ0LnRhcmdldC52YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgc2V0TG9jYWxTdG9yYWdlKGlucHV0TWFpbCwgJ01haWwnKTtcbn07XG5cblxuc2V0UG9wdXAoKTtcbiIsIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXInKTtcblxuICBjb25zdCBzZXRTTGlkZXIgPSAoc2VjdGlvbikgPT4ge1xuICAgIGlmICghc2VjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IERFU0tUT1BfV0lEVEggPSAxMDI0O1xuICAgIGNvbnN0IFRBQkxFVF9XSURUSCA9IDc2ODtcblxuICAgIGNvbnN0IFNsaWRlc01hcmdpbiA9IHtcbiAgICAgIERFU0tUT1A6IDIuNTYsXG4gICAgICBUQUJMRVQ6IDQuNDIsXG4gICAgICBNT0JJTEU6IDEwLjM0XG4gICAgfTtcblxuICAgIGNvbnN0IFNsaWRlc1BlclBhZ2UgPSB7XG4gICAgICBERVNLVE9QOiA0LFxuICAgICAgVEFCTEVUOiAyLFxuICAgIH07XG5cbiAgICBjb25zdCBzbGlkZXJXcmFwcGVyID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19pdGVtcycpO1xuICAgIGNvbnN0IGJ1dHRvbk5leHQgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2ZvcndhcmQnKTtcbiAgICBjb25zdCBidXR0b25QcmV2ID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19iYWNrJyk7XG4gICAgY29uc3QgcGFnaW5hdGlvbiA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fcGFnaW5hdGlvbicpO1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19pdGVtcyB1bCcpO1xuICAgIGNvbnN0IHNsaWRlc0NvdW50ID0gY29udGFpbmVyLmNoaWxkRWxlbWVudENvdW50O1xuXG4gICAgY29uc3Qge3RyYW5zaXRpb25EdXJhdGlvbn0gPSBnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcik7XG4gICAgY29uc3QgdHJhbnNsUmVnRXhwID0gLyhbLTAtOS5dKyg/PSUpKS87XG5cbiAgICBsZXQgdmlld1dpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIGxldCBzZWxlY3RlZFBhZ2UgPSAxO1xuICAgIGxldCBwb3NJbml0O1xuICAgIGxldCBwb3NYMSA9IDA7XG4gICAgbGV0IHBvc1gyID0gMDtcblxuICAgIGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAodGVtcGxhdGUpID0+IHtcbiAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICAgIG5ld0VsZW1lbnQuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgICByZXR1cm4gbmV3RWxlbWVudC5maXJzdENoaWxkIHx8IGBgO1xuICAgIH07XG5cbiAgICBjb25zdCB0aHJvdHRsZSA9IChjYWxsYmFjaywgd2FpdCA9IDMwMCwgaW1tZWRpYXRlID0gdHJ1ZSkgPT4ge1xuICAgICAgbGV0IHRpbWVvdXQgPSBudWxsO1xuICAgICAgbGV0IGluaXRpYWxDYWxsID0gdHJ1ZTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiBpbml0aWFsQ2FsbDtcbiAgICAgICAgY29uc3QgbmV4dCA9ICgpID0+IHtcbiAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgICAgaW5pdGlhbENhbGwgPSBmYWxzZTtcbiAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChuZXh0LCB3YWl0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzaXplV2luZG93SGFuZGxlciA9ICgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPT09IHZpZXdXaWR0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXZWaWV3V2lkdGggPSB2aWV3V2lkdGg7XG4gICAgICB2aWV3V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICByZW5kZXJQYWdpbmF0aW9uKHByZXZWaWV3V2lkdGgpO1xuICAgICAgY2hhbmdlU2xpZGVzKDEpO1xuICAgICAgdG9nZ2xlU3dpcGUodmlld1dpZHRoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVuZGVyRGVza3RvcFBhZ2luYXRpb24gPSAoY291bnQsIGN1cnJlbnRQYWdlKSA9PiB7XG4gICAgICBjb25zdCBwYWdlc0NvdW50ID0gTWF0aC5jZWlsKGNvdW50IC8gKHZpZXdXaWR0aCA+PSBERVNLVE9QX1dJRFRIID8gU2xpZGVzUGVyUGFnZS5ERVNLVE9QIDogU2xpZGVzUGVyUGFnZS5UQUJMRVQpKTtcbiAgICAgIGNvbnN0IHBhZ2VzTGlzdCA9IGNyZWF0ZUVsZW1lbnQoYDx1bD48L3VsPmApO1xuICAgICAgY29uc3QgcGFnZXMgPSBuZXcgQXJyYXkocGFnZXNDb3VudClcbiAgICAgICAgICAuZmlsbCgpXG4gICAgICAgICAgLm1hcCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWdlTnVtYmVyID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgY29uc3QgaHlwZXJSZWYgPSBjdXJyZW50UGFnZSAhPT0gcGFnZU51bWJlciA/IGAgaHJlZj1cIiNcImAgOiBgYDtcblxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBhcmlhLWxhYmVsPVwic2xpZGVyIHBhZ2UgJHtwYWdlTnVtYmVyfVwiIGRhdGEtcGFnZS1udW1iZXI9XCIke3BhZ2VOdW1iZXJ9XCIke2h5cGVyUmVmfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2luZGV4ICsgMX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5gO1xuXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZSk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBjaGFuZ2VTbGlkZXMoK2V2dC50YXJnZXQuZGF0YXNldC5wYWdlTnVtYmVyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgICB9KTtcblxuICAgICAgcGFnZXMuZm9yRWFjaChwYWdlID0+IHBhZ2VzTGlzdC5hcHBlbmQocGFnZSkpO1xuXG4gICAgICBwYWdpbmF0aW9uLmlubmVySFRNTCA9IGBgO1xuICAgICAgcGFnaW5hdGlvbi5hcHBlbmQocGFnZXNMaXN0KTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVuZGVyTW9iaWxlUGFnaW5hdGlvbiA9IChjb3VudCwgY3VycmVudFBhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHBhZ2VzQ291bnQgPSBNYXRoLmNlaWwoY291bnQgLyBTbGlkZXNQZXJQYWdlLlRBQkxFVCk7XG5cbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gYDxwPjxzcGFuPiR7Y3VycmVudFBhZ2V9PC9zcGFuPiZuYnNwOyZuYnNwO29mJm5ic3A7Jm5ic3A7JHtwYWdlc0NvdW50fTwvcD5gO1xuICAgICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQodGVtcGxhdGUpO1xuXG4gICAgICBwYWdpbmF0aW9uLmlubmVySFRNTCA9IGBgO1xuICAgICAgcGFnaW5hdGlvbi5hcHBlbmQoZWxlbWVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlbmRlclBhZ2luYXRpb24gPSAocHJldlZpZXdXaWR0aCwgaXNGaXJzdFJlbmRlciA9IGZhbHNlKSA9PiB7XG4gICAgICBpZiAoKHByZXZWaWV3V2lkdGggPCBERVNLVE9QX1dJRFRIIHx8IGlzRmlyc3RSZW5kZXIpICYmIHZpZXdXaWR0aCA+PSBERVNLVE9QX1dJRFRIKSB7XG4gICAgICAgIHJlbmRlckRlc2t0b3BQYWdpbmF0aW9uKHNsaWRlc0NvdW50LCBzZWxlY3RlZFBhZ2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHByZXZWaWV3V2lkdGggPCBUQUJMRVRfV0lEVEggfHwgcHJldlZpZXdXaWR0aCA+PSBERVNLVE9QX1dJRFRIIHx8IGlzRmlyc3RSZW5kZXIpICYmICh2aWV3V2lkdGggPj0gVEFCTEVUX1dJRFRIICYmIHZpZXdXaWR0aCA8IERFU0tUT1BfV0lEVEgpKSB7XG4gICAgICAgIHJlbmRlckRlc2t0b3BQYWdpbmF0aW9uKHNsaWRlc0NvdW50LCBzZWxlY3RlZFBhZ2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHByZXZWaWV3V2lkdGggPj0gVEFCTEVUX1dJRFRIIHx8IGlzRmlyc3RSZW5kZXIpICYmIHZpZXdXaWR0aCA8IFRBQkxFVF9XSURUSCkge1xuICAgICAgICByZW5kZXJNb2JpbGVQYWdpbmF0aW9uKHNsaWRlc0NvdW50LCBzZWxlY3RlZFBhZ2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFuZ2VTbGlkZXMgPSAocG9zaXRpb24pID0+IHtcbiAgICAgIGNvbnN0IHBhZ2VzQ291bnQgPSBNYXRoLmNlaWwoc2xpZGVzQ291bnQgLyAodmlld1dpZHRoID4gREVTS1RPUF9XSURUSCA/IFNsaWRlc1BlclBhZ2UuREVTS1RPUCA6IFNsaWRlc1BlclBhZ2UuVEFCTEVUKSk7XG5cbiAgICAgIGxldCBtYXJnaW4gPSAwO1xuXG4gICAgICBpZiAodmlld1dpZHRoID49IERFU0tUT1BfV0lEVEgpIHtcbiAgICAgICAgbWFyZ2luID0gU2xpZGVzTWFyZ2luLkRFU0tUT1A7XG4gICAgICB9IGVsc2UgaWYgKHZpZXdXaWR0aCA+PSBUQUJMRVRfV0lEVEgpIHtcbiAgICAgICAgbWFyZ2luID0gU2xpZGVzTWFyZ2luLlRBQkxFVDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcmdpbiA9IFNsaWRlc01hcmdpbi5NT0JJTEU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwb3NpdGlvbiA8IDEpIHtcbiAgICAgICAgc2VsZWN0ZWRQYWdlID0gcGFnZXNDb3VudDtcbiAgICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPiBwYWdlc0NvdW50KSB7XG4gICAgICAgIHNlbGVjdGVkUGFnZSA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3RlZFBhZ2UgPSBwb3NpdGlvbjtcbiAgICAgIH1cblxuICAgICAgY29udGFpbmVyLnN0eWxlID0gYHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoJHsoMSAtIHNlbGVjdGVkUGFnZSkgKiAxMDAgKyBtYXJnaW4gKiAoMSAtIHNlbGVjdGVkUGFnZSl9JSwgMCwgMClgO1xuICAgICAgdXBkYXRlUGFnZShzZWxlY3RlZFBhZ2UpO1xuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVQYWdlID0gKHBhZ2VOdW1iZXIpID0+IHtcbiAgICAgIGlmICh2aWV3V2lkdGggPj0gVEFCTEVUX1dJRFRIKSB7XG4gICAgICAgIHBhZ2luYXRpb25cbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdhJylcbiAgICAgICAgICAgIC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICBpZiAoK2l0ZW0uZGF0YXNldC5wYWdlTnVtYmVyID09PSBwYWdlTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFnaW5hdGlvblxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKVxuICAgICAgICAgICAgLnRleHRDb250ZW50ID0gcGFnZU51bWJlcjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgdG91Y2hTdGFydEhhbmRsZXIgPSAoZXZ0KSA9PiB7XG5cbiAgICAgIHNsaWRlcldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hNb3ZlSGFuZGxlcik7XG4gICAgICBzbGlkZXJXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hFbmRIYW5kbGVyKTtcblxuICAgICAgW3Bvc0luaXRdID0gY29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybS5tYXRjaCh0cmFuc2xSZWdFeHApIHx8IFswXTtcbiAgICAgIHBvc1gxID0gTWF0aC50cnVuYyhldnQudG91Y2hlc1swXS5jbGllbnRYKTtcblxuICAgICAgY29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcwcyc7XG4gICAgfTtcblxuICAgIGNvbnN0IHRvdWNoTW92ZUhhbmRsZXIgPSAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCBjbGllbnRYID0gTWF0aC50cnVuYyhldnQudG91Y2hlc1swXS5jbGllbnRYKTtcbiAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gY29udGFpbmVyLm9mZnNldFdpZHRoO1xuXG4gICAgICBwb3NYMiA9IGNsaWVudFggLSBwb3NYMTtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHsrcG9zSW5pdCArIChwb3NYMiAvIGNvbnRhaW5lcldpZHRoKSAqIDEwMH0lLCAwLCAwKWA7XG4gICAgfTtcblxuICAgIGNvbnN0IHRvdWNoRW5kSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHNsaWRlcldyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hNb3ZlSGFuZGxlcik7XG4gICAgICBzbGlkZXJXcmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hFbmRIYW5kbGVyKTtcblxuICAgICAgaWYgKHBvc1gyID4gMCkge1xuICAgICAgICBjaGFuZ2VTbGlkZXMoc2VsZWN0ZWRQYWdlIC0gMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGFuZ2VTbGlkZXMoc2VsZWN0ZWRQYWdlICsgMSk7XG4gICAgICB9XG5cblxuICAgICAgY29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IHRyYW5zaXRpb25EdXJhdGlvbjtcbiAgICB9O1xuXG4gICAgY29uc3QgdG9nZ2xlU3dpcGUgPSAod2lkdGgpID0+IHtcbiAgICAgIGlmICh3aWR0aCA8IERFU0tUT1BfV0lEVEgpIHtcbiAgICAgICAgc2xpZGVyV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hTdGFydEhhbmRsZXIsIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZXJXcmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaFN0YXJ0SGFuZGxlcik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aHJvdHRsZShyZXNpemVXaW5kb3dIYW5kbGVyKSk7XG5cbiAgICBidXR0b25OZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2hhbmdlU2xpZGVzKHNlbGVjdGVkUGFnZSArIDEpKTtcbiAgICBidXR0b25QcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2hhbmdlU2xpZGVzKHNlbGVjdGVkUGFnZSAtIDEpKTtcblxuICAgIHJlbmRlclBhZ2luYXRpb24odmlld1dpZHRoLCB0cnVlKTtcbiAgICB0b2dnbGVTd2lwZSh2aWV3V2lkdGgpO1xuICB9O1xuXG4gIHNldFNMaWRlcihzbGlkZXIpO1xufSkoKTtcbiJdfQ==
