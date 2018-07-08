'use strict';

window.sorting = (function () {
  var NUMBER_OF_NEW = 10;
  var DEBOUNCE_INTERVAL = 500;
  var filtersBlock = document.querySelector('.img-filters');
  var filterPopular = filtersBlock.querySelector('#filter-popular');
  var filterNew = filtersBlock.querySelector('#filter-new');
  var filterDiscussed = filtersBlock.querySelector('#filter-discussed');

  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var debouncedCreateNewTiles = debounce(function (sortingFunction, array) {
    createNewTiles(sortingFunction, array);
  });

  var removeClass = function (block, classname) {
    var classes = block.className.split(' ');
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] === classname) {
        classes.splice(i, 1);
        i--;
      }
    }
    block.className = classes.join(' ');
  };

  var switchActiveClass = function (block) {
    var filterButtons = document.querySelectorAll('.img-filters__button');
    Array.from(filterButtons).forEach(function (element) {
      element.classList.remove('img-filters__button--active');
    });
    block.classList.add('img-filters__button--active');
  };

  removeClass(filtersBlock, 'img-filters--inactive');

  var createNewTiles = function (sortingFunction, array) {
    var oldPictures = document.querySelectorAll('.picture__link');
    Array.from(oldPictures).forEach(function (element) {
      element.remove();
    });
    window.smallRender.renderTile(sortingFunction(array));
    var smallPictures = document.querySelectorAll('.picture__link');
    window.renderBig.addBigPictureListener(smallPictures);
  };

  var makeSorting = function (array) {
    var copyOfArray = array.slice();

    filterNew.addEventListener('click', function () {
      debouncedCreateNewTiles(makeSortByNew, copyOfArray);
      switchActiveClass(filterNew);
    });

    filterDiscussed.addEventListener('click', function () {
      debouncedCreateNewTiles(makeSortByComments, copyOfArray);
      switchActiveClass(filterDiscussed);
    });

    filterPopular.addEventListener('click', function () {
      debouncedCreateNewTiles(makeNoSorting, array);
      switchActiveClass(filterPopular);
    });
  };

  function shuffle(array) {
    var randomIndex;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  var makeSortByNew = function (array) {
    var tempArray = array.slice();
    shuffle(tempArray).splice(NUMBER_OF_NEW);
    return tempArray;
  };

  var makeSortByComments = function (array) {
    var tempArray = array.slice();
    tempArray.sort(function (right, left) {
      return left.comments.length - right.comments.length;
    });
    return tempArray;
  };

  var makeNoSorting = function (array) {
    return array;
  };

  // var newOrderList = createNewList();

  return {
    makeSorting: makeSorting,
    removeClass: removeClass
  };
})();
