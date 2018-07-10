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

  var debouncedCreateNewTiles = debounce(function (sortingFunction, pictures) {
    createNewTiles(sortingFunction, pictures);
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

  var createNewTiles = function (sortingFunction, pictures) {
    var oldPictures = document.querySelectorAll('.picture__link');
    Array.from(oldPictures).forEach(function (element) {
      element.remove();
    });
    window.renderSmall.renderTile(sortingFunction(pictures));
    var smallPictures = document.querySelectorAll('.picture__link');
    window.renderBig.addBigPictureListener(smallPictures);
  };

  var makeSorting = function (pictures) {
    var copyOfPictures = pictures.slice();

    filterNew.addEventListener('click', function () {
      debouncedCreateNewTiles(makeSortByNew, copyOfPictures);
      switchActiveClass(filterNew);
    });

    filterDiscussed.addEventListener('click', function () {
      debouncedCreateNewTiles(makeSortByComments, copyOfPictures);
      switchActiveClass(filterDiscussed);
    });

    filterPopular.addEventListener('click', function () {
      debouncedCreateNewTiles(makeNoSorting, pictures);
      switchActiveClass(filterPopular);
    });
  };

  var shuffle = function (array) {
    var randomIndex;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  };

  var makeSortByNew = function (pictures) {
    var tempPictures = pictures.slice();
    shuffle(tempPictures).splice(NUMBER_OF_NEW);
    return tempPictures;
  };

  var makeSortByComments = function (pictures) {
    var tempPictures = pictures.slice();
    tempPictures.sort(function (right, left) {
      return left.comments.length - right.comments.length;
    });
    return tempPictures;
  };

  var makeNoSorting = function (pictures) {
    return pictures;
  };

  return {
    makeSorting: makeSorting,
    removeClass: removeClass,
    filtersBlock: filtersBlock
  };
})();
