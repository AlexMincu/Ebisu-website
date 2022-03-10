/*
 *  Hamburger Menu
 */
const menuBtn = document.querySelector('.header__menu__btn');
const menuIcon = document.querySelector('.header__menu__btn__icon');
const nav = document.querySelector('.header__menu__nav');
const navList = document.querySelector('.header__menu__nav__list');
const navItems = document.querySelectorAll('.header__menu__nav__list__item');

let showMenu = false;

menuBtn.addEventListener('click', () => {
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
});

for (let i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener('click', function () {
    // Contract list item selected
    if (navItems[i].classList.contains('expand')) {
      navItems[i].classList.remove('expand');

      // Add open class to sublist
      navItems[i].childNodes[3].classList.remove('open');

      // Animation
      setTimeout(function () {
        navItems[i].childNodes[3].style.display = 'none';
      }, 500);
    }
    // Expand list item selected
    else {
      navItems[i].classList.add('expand');

      // Add open class to sublist
      navItems[i].childNodes[3].classList.add('open');

      // Animation
      setTimeout(function () {
        navItems[i].childNodes[3].style.display = 'block';
      }, 0);
    }
  });
}

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
const promoCardsContainer = document.querySelector(
  '.promotions__cards-container-wrapper'
);
const promoPrevBtn = document.querySelector(
  '.promotions__cards-container-wrapper__btn--prev'
);
const promoNextBtn = document.querySelector(
  '.promotions__cards-container-wrapper__btn--next'
);

/*
 *  The width dimension comes from the current size on reloading the page
 *    Fix - Get a live width dimension so the slider function works properly after resizing the page
 */
const promoContainerDimensions = promoCardsContainer.getBoundingClientRect();
const promoContainerWidth = promoContainerDimensions.width;

promoNextBtn.addEventListener('click', () => {
  promoCardsContainer.scrollLeft += promoContainerWidth;
});

promoPrevBtn.addEventListener('click', () => {
  promoCardsContainer.scrollLeft -= promoContainerWidth;
});

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
 *  Books-showcase Section
 */
const booksCardsContainer = document.querySelector(
  '.books-showcase__cards-container-wrapper'
);
const booksPrevBtn = document.querySelector(
  '.books-showcase__cards-container-wrapper__btn--prev'
);
const booksNextBtn = document.querySelector(
  '.books-showcase__cards-container-wrapper__btn--next'
);

/*
 *  The width dimension comes from the current size on reloading the page
 *    Fix - Get a live width dimension so the slider function works properly after resizing the page
 */
const booksContainerDimensions = booksCardsContainer.getBoundingClientRect();
const booksContainerWidth = booksContainerDimensions.width;

booksNextBtn.addEventListener('click', () => {
  booksCardsContainer.scrollLeft += booksContainerWidth;
});

booksPrevBtn.addEventListener('click', () => {
  booksCardsContainer.scrollLeft -= booksContainerWidth;
});

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
