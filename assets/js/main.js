/* --------------- COMPONENTS --------------- */

//  Cards Slider
const cardsSliderWrapper = document.querySelectorAll('.cards-slider__wrapper');
const cardSliderBtnLeft = document.querySelectorAll('.cards-slider__btn--left');
const cardSliderBtnRight = document.querySelectorAll(
  '.cards-slider__btn--right'
);

for (const [indexSlider, slider] of cardsSliderWrapper.entries()) {
  cardSliderBtnRight[indexSlider].addEventListener('click', () => {
    slider.scrollLeft += slider.getBoundingClientRect().width * 0.9;
  });

  cardSliderBtnLeft[indexSlider].addEventListener('click', () => {
    slider.scrollLeft -= slider.getBoundingClientRect().width * 0.9;
  });
}

/* --------------- NAVIGATION --------------- */

// Small Navigaton
const menuBtn = document.querySelector('.header__menu__btn--hamburger');
const menuIcon = document.querySelector('.header__menu__btn--hamburger__icon');
const nav = document.querySelector('.header__menu__nav');
const navList = document.querySelector('.header__menu__nav__list');
const navItems = document.querySelectorAll('.header__menu__nav__list__item');

let showMenu = false;

// Open menu
menuBtn.addEventListener('click', () => {
  const mediaQuery = window.matchMedia('(max-width: 768px)');

  if (mediaQuery.matches) {
    if (!showMenu) {
      menuIcon.classList.add('open');
      nav.classList.add('open');
      navList.classList.add('open');
      navItems.forEach((item) => item.classList.add('open'));

      showMenu = true;
    } else {
      menuIcon.classList.remove('open');
      nav.classList.remove('open');
      navList.classList.remove('open');
      navItems.forEach((item) => item.classList.remove('open'));

      showMenu = false;
    }
  }
});

// Open submenu
for (let i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener('click', function () {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    if (mediaQuery.matches) {
      const navItemSublist = navItems[i].querySelector(
        '.header__menu__nav__sublist'
      );

      // Contract list item selected
      if (navItems[i].classList.contains('expand')) {
        navItems[i].classList.remove('expand');

        // Add open class to sublist
        navItemSublist.classList.remove('open');

        // Animation
        setTimeout(function () {
          navItemSublist.style.display = 'none';
        }, 500);
      }
      // Expand list item selected
      else {
        navItems[i].classList.add('expand');

        // Add open class to sublist
        navItemSublist.classList.add('open');

        // Animation
        setTimeout(function () {
          navItemSublist.style.display = 'block';
        }, 0);
      }
    }
  });
}

/* --------------- HEADER --------------- */

// Search Btn
const searchBtn = document.querySelector('.header__btn--search');

searchBtn.addEventListener('click', () => {
  alert(`Search button clicked`);
});

// Cart Btn
const cartBtn = document.querySelector('.header__btn--cart');

cartBtn.addEventListener('click', () => {
  alert(`Cart button clicked`);
});

// Account Btn
const accountBtn = document.querySelector('.header__btn--account');

accountBtn.addEventListener('click', () => {
  alert(`Account button clicked`);
});

/* --------------- COVER SECTION --------------- */
const coverBtn = document.querySelector('.cover__btn');

coverBtn.addEventListener('click', () => {
  alert(`Cover button clicked`);
});

/* --------------- POPULAR SECTION    --------------- */
// Section Btn event
const popularProductsBtn = document.querySelector('.popular-products__btn');

popularProductsBtn.addEventListener('click', function () {
  alert(
    `Button Redirect to the Products Page with a filter for Most Popular Products`
  );
});

// Cards event
const popularProductsCards = document.querySelectorAll(
  '.popular-products__card'
);

popularProductsCards.forEach((card) => {
  card.addEventListener('click', () => {
    const title = card.querySelector(
      '.popular-products__card__title'
    ).innerText;
    alert(`${title} Card clicked`);
  });
});

/* --------------- PROMO SECTION      --------------- */

// Section Btn event
const promotionsBtn = document.querySelector('.promotions__btn');

promotionsBtn.addEventListener('click', function () {
  alert(
    `Button Redirect to the Products Page with a filter for Products in Promotions`
  );
});

// Cards event
const promoCards = document.querySelectorAll('.promotions__card');

promoCards.forEach((card) => {
  card.addEventListener('click', () => {
    const title = card.querySelector('.promotions__card__title').innerText;
    alert(`Redirect to ${title} product page`);
  });
});

/* --------------- CATEGORIES SECTION --------------- */

// Cards event
const categoriesCards = document.querySelectorAll('.categories__card');

categoriesCards.forEach((item) => {
  const btn = item.querySelector('.categories__card__btn');
  const title = item.querySelector('.categories__card__title').innerText;

  btn.addEventListener('click', () => {
    alert(`Button Redirect to ${title} Page`);
  });
});

/* --------------- BOOKS SECTION --------------- */

// Section Btn event
const booksBtn = document.querySelector('.books-showcase__btn');

booksBtn.addEventListener('click', function () {
  alert(`Button Redirect to the Books & Manga Page`);
});

/* --------------- ARTICLES SECTION   --------------- */

// Section Btn event
const articlesBtn = document.querySelector('.articles__btn');

articlesBtn.addEventListener('click', () => {
  window.location.href = `/blog`;
});

// Cards event
const articlesCards = document.querySelectorAll('.articles__card');

articlesCards.forEach((card) => {
  const title = card.querySelector('.articles__card__title');
  const btn = card.querySelector('.articles__card__btn');

  title.addEventListener('click', () => {
    alert(`Redirect to Article '${title.innerText}'`);
  });

  btn.addEventListener('click', () => {
    alert(`Redirect to Article '${title.innerText}'`);
  });
});
