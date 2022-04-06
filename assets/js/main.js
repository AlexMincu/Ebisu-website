/*
 *  Hamburger Menu
 */
const menuBtn = document.querySelector('.header__menu__btn--hamburger');
const menuIcon = document.querySelector('.header__menu__btn--hamburger__icon');
const nav = document.querySelector('.header__menu__nav');
const navList = document.querySelector('.header__menu__nav__list');
const navItems = document.querySelectorAll('.header__menu__nav__list__item');

let showMenu = false;

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

const navSublists = document.querySelectorAll('.header__menu__nav__sublist');
const header = document.querySelector('.header');

const navListsItems = document.querySelectorAll(
  '.header__menu__nav__list__item__content'
);

for (let i = 0; i < navListsItems.length; i++) {
  const mediaQuery = window.matchMedia('(min-width: 768px)');

  if (mediaQuery.matches) {
    const ListItemContent = navListsItems[i];
    const Sublist = ListItemContent.parentElement.querySelectorAll(
      '.header__menu__nav__sublist'
    );

    ListItemContent.addEventListener('mouseover', () => {
      // let temp = Sublist.getBoundingClientRect();
      // console.log(temp.width);
    });
  }
}

/*
 *  Header
 */
const searchBtn = document.querySelector('.header__btn--search');
const cartBtn = document.querySelector('.header__btn--cart');
const accountBtn = document.querySelector('.header__btn--account');

searchBtn.addEventListener('click', () => {
  alert(`Search button clicked - TODO`);
});
cartBtn.addEventListener('click', () => {
  alert(`Cart button clicked - TODO`);
});
accountBtn.addEventListener('click', () => {
  alert(`Account button clicked - TODO`);
});

/*
 *  Popular Section
 */
const popularProductsBtn = document.querySelector('.popular-products__btn');

popularProductsBtn.addEventListener('click', function () {
  alert(
    `TODO Button Redirect to the Products Page with a filter for Most Popular Products`
  );
});

/*
 *  Promotions Section
 */
const promotionsCardAddBtn = document.querySelectorAll(
  '.promotions__card__btn'
);

promotionsCardAddBtn.forEach((item) => {
  item.addEventListener('click', () => {
    alert(`TODO Button Functionality to add to a cart`);
  });
});

const promotionsBtn = document.querySelector('.promotions__btn');

promotionsBtn.addEventListener('click', function () {
  alert(
    `TODO Button Redirect to the Products Page with a filter for Products in Promotions`
  );
});

/*
 *  Categories Section
 */
const categoriesCards = document.querySelectorAll('.categories__card');

categoriesCards.forEach((item) => {
  // Add event listeners to all category cards buttons
  const btn = item.childNodes[5];
  btn.addEventListener('click', () => {
    alert(`TODO Button Redirect of ${item.childNodes[3].innerText}`);
  });
});

/*
 *  Cards Slider
 */
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

/*
 *  Books-showcase Section
 */

const booksBtn = document.querySelector('.books-showcase__btn');

booksBtn.addEventListener('click', function () {
  alert(`TODO Button Redirect to the Books & Manga Page`);
});

/*
 *  Articles Section
 */
const articlesCardsBtn = document.querySelectorAll('.articles__card__btn');
const articlesBtn = document.querySelector('.articles__btn');

articlesCardsBtn.forEach((item) => {
  item.addEventListener('click', () => {
    alert(
      `TODO Button Redirect of Article with title - ${item.parentElement.childNodes[3].innerText}`
    );
  });
});

articlesBtn.addEventListener('click', () => {
  alert(`TODO Button Redirect to the Articles Page`);
});

function include(file) {
  var script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);
}
