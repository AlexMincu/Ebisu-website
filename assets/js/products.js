/* --------------- Params functions --------------- */
function getQueryString() {
  let queryString = '';
  if (window.location.href.includes('?')) {
    queryString += '?';
    queryString += window.location.href.split('?')[1];
  }

  return queryString;
}

function setURL(newQueryString) {
  let newUrl = window.location.href;

  if (newUrl.includes('?')) {
    newUrl = newUrl.split('?')[0];
  }
  newUrl += '?';
  newUrl += newQueryString;

  window.location.href = newUrl;
}

/* --------------- SORT SECTION --------------- */
const sortProductsAscendentBtn = document.querySelector(
  '.sort__btn--ascendent'
);

sortProductsAscendentBtn.addEventListener('click', () => {
  const sortByProductsInput = document.querySelector(
    '.sort__input__simple-select--sort-by'
  );

  // Get query string
  let queryString = getQueryString();

  // Create USP
  const usp = new URLSearchParams(queryString);

  // Set params
  usp.delete('sortDesc');
  if (sortByProductsInput.value == 'price') {
    usp.set('sortAsc', 'price');
  } else if (sortByProductsInput.value == 'date') {
    usp.set('sortAsc', 'date_char');
  }

  // Set URL
  setURL(usp.toString());
});

const sortProductsDescendentBtn = document.querySelector(
  '.sort__btn--descendent'
);

sortProductsDescendentBtn.addEventListener('click', () => {
  const sortByProductsInput = document.querySelector(
    '.sort__input__simple-select--sort-by'
  );

  // Get query string
  let queryString = getQueryString();

  // Create USP
  const usp = new URLSearchParams(queryString);

  // Set params
  usp.delete('sortAsc');
  if (sortByProductsInput.value == 'price') {
    usp.set('sortDesc', 'price');
  } else if (sortByProductsInput.value == 'date') {
    usp.set('sortDesc', 'date_char');
  }

  // Set URL
  setURL(usp.toString());
});

/* --------------- SEARCH SECTION --------------- */

const productsSearchBtn = document.querySelector('.search__btn');

productsSearchBtn.addEventListener('click', () => {
  const searchTextBox = document.querySelector('.search__input--text');

  // Get query string and Create USP
  const usp = new URLSearchParams(getQueryString());

  // Set params
  usp.set('name', searchTextBox.value);

  // Set URL
  setURL(usp.toString());
});

const productSearchInput = document.querySelector('.search__input--text');

productSearchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const searchTextBox = document.querySelector('.search__input--text');

    // Get query string and Create USP
    const usp = new URLSearchParams(getQueryString());

    // Set params
    usp.set('name', searchTextBox.value);

    // Set URL
    setURL(usp.toString());
  }
});

/* --------------- FILTER SECTION --------------- */

const productsFilterRangeMin = document.querySelector(
  '.filters__input--range--min'
);
const productsFilterRangeMax = document.querySelector(
  '.filters__input--range--max'
);

// ------ Filter button ------
document
  .querySelector('.filters__btn--filter')
  .addEventListener('click', () => {
    // Get query string and Create USP
    const usp = new URLSearchParams(getQueryString());

    // Set params
    // --- Price range
    usp.set('priceMin', productsFilterRangeMin.value);
    usp.set('priceMax', productsFilterRangeMax.value);

    // --- Category
    document
      .querySelectorAll('input[name="filters__input--radio-name"]')
      .forEach((radioBtn) => {
        if (radioBtn.checked) {
          usp.set('category', radioBtn.value);
        }
      });

    // --- In-stock
    usp.set(
      'in_stock',
      document.querySelector('.filters__input--checkbox').checked
    );

    // --- Subcategories
    let subcategoriesString = '';
    document
      .querySelectorAll('.filters__input--multiple-select-option')
      .forEach((option) => {
        if (option.selected) {
          subcategoriesString += `${option.label}+`;
        }
      });
    subcategoriesString = subcategoriesString.replace(/\+$/g, '');
    if (subcategoriesString) {
      usp.set('subcategory', subcategoriesString);
    } else usp.delete('subcategory');

    // Set URL
    setURL(usp.toString());
  });

// ------ Reset button ------
document.querySelector('.filters__btn--reset').addEventListener('click', () => {
  console.log('url: ', window.location.href.split('?')[0]);
  window.location.href = window.location.href.split('?')[0];
});

//------ Price range input ------
productsFilterRangeMin.addEventListener('change', () => {
  document.querySelector('.filters__input--range--min-value').innerHTML =
    productsFilterRangeMin.value;
});

productsFilterRangeMax.addEventListener('change', () => {
  document.querySelector('.filters__input--range--max-value').innerHTML =
    productsFilterRangeMax.value;
});
