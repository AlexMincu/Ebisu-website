const menuBtn = document.querySelector('.header__menu__btn');
const menuIcon = document.querySelector('.header__menu__btn__icon');
const nav = document.querySelector('.header__menu__nav');
const navList = document.querySelector('.header__menu__nav__list');
const navItems = document.querySelectorAll('.header__menu__nav__list__item');

let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  console.log('clicking');
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

const popularProductsBtn = document.querySelector('.popular-products__btn');

popularProductsBtn.addEventListener('click', function () {
  document.location.href = '/products';
});

const promoCardsContainer = document.querySelector(
  '.promotions__cards-container-wrapper'
);
const prevBtn = document.querySelector(
  '.promotions__cards-container-wrapper__btn--prev'
);
const nextBtn = document.querySelector(
  '.promotions__cards-container-wrapper__btn--next'
);

const containerDimensions = promoCardsContainer.getBoundingClientRect();
const containerWidth = containerDimensions.width;

nextBtn.addEventListener('click', () => {
  promoCardsContainer.scrollLeft += containerWidth;
});

prevBtn.addEventListener('click', () => {
  promoCardsContainer.scrollLeft -= containerWidth;
});

const promotionsBtn = document.querySelector('.promotions__btn');

promotionsBtn.addEventListener('click', function () {
  document.location.href = '/promos';
});
