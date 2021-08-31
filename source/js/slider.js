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
