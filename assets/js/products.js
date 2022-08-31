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




  /* --------------- SORT SECTION --------------- */
  const sortProductsAscendentBtn = document.querySelector(
    '.sort__btn--ascendent'
  );
  
  sortProductsAscendentBtn.addEventListener('click', () => {
    const sortByProductsInput = document.querySelector(
      '.sort__input--select'
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
      '.sort__input--select'
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
  

  /* --------------- FILTER SECTION --------------- */
  
  // ------ Filters menu ------
  document
    .querySelector('.filters__btn--filters')
    .addEventListener('click', () => {
      const filtersContainer = document.querySelector('.filters__container');

      const filtersBtnArrow = document.querySelector('.filters__btn--filters__arrow');

        if(!filtersContainer.classList.contains('open')) {
            filtersContainer.classList.add('open');
            filtersBtnArrow.classList.add('open')
        }
        else {
            filtersContainer.classList.remove('open');
            filtersBtnArrow.classList.remove('open');
        }
    })

  // Open Filters menu

  

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
        .querySelectorAll('input[name="filters__input--category"]')
        .forEach((radioBtn) => {
          if (radioBtn.checked) {
            usp.set('category', radioBtn.value);
          }
        });
  
      // --- In-stock
      usp.delete('in_stock');
      if(document.querySelector('input[name="filters__input--checkbox"]').checked){
        usp.set('in_stock', document.querySelector('input[name="filters__input--checkbox"]').checked);
      }
  
      // --- Subcategories
      let subcategoriesString = '';

        const subcategoriesArray = Array.from(document.querySelector('.filters__input--multiple'));

        subcategoriesArray.forEach((option) => {
            if (option.selected) {
                console.log(option);
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
  const rangeLabels = document.querySelectorAll('.filters__label--range');
  const thumbWidth = 6; // Thumb size in px - used for the offset in positioning

  rangeLabels.forEach( (rangeLabel) => {
    const rangeInput = rangeLabel.children[0];

    rangeLabel.insertAdjacentHTML(
      'beforeend', 
      `<span class="bubble"></span>`
    );
    
    const rangeBubble = rangeLabel.children[1];
    
    
    function positionBubble(bubbleElement, anchorElement) {
  
      const {min, max, value} = anchorElement;
  
      const total = max - min;
      const perc = (value - min) / total;
      const offset = (thumbWidth/2) - (thumbWidth * perc);
      
      bubbleElement.style.left = `calc(${perc * 100}% + ${offset}px)`;
      bubbleElement.textContent = value;
    }
  
    // Initial bubble position
    positionBubble(rangeBubble, rangeInput)
    
    // Move bubble position on change
    rangeInput.addEventListener('input', (e) => positionBubble(rangeBubble, e.target))
  })

  