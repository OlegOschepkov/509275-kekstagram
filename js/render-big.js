'use strict';
window.renderBig = (function () {
  var MIN_AVATAR_NUMBER = 1; // эти две переменные отвечают за подбор случайного аватара (в задании src="img/avatar-{{случайное число от 1 до 6}}.svg")
  var MAX_AVATAR_NUMBER = 6;
  var AVATAR_HEIGHT = 35;
  var AVATAR_WIDTH = 35;
  var AVATAR_ALT = 'Аватар комментатора фотографии';
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureBlocks = bigPicture.querySelector('.social__comments');
  bigPicture.querySelector('.close');
  var loadMore = bigPicture.querySelector('.social__loadmore');
  var maxIndexNumber = 5;
  var indexNumber = 0;
  var currentBigPicture;

  var createNewElement = function (picture, comments) {
    for (indexNumber; indexNumber < comments.length && indexNumber < maxIndexNumber; indexNumber++) {
      var unnecessaryBlock = bigPicture.querySelectorAll('.social__comment');
      unnecessaryBlock[0].classList.add('visually-hidden');
      unnecessaryBlock[1].classList.add('visually-hidden');
      var listElement = document.createElement('li');
      listElement.className = 'social__comment social__comment--text';
      bigPictureBlocks.appendChild(listElement);
      var avatarAndText = document.createElement('img');
      var textBlock = document.createElement('p');
      listElement.appendChild(avatarAndText);
      listElement.appendChild(textBlock);
      avatarAndText.className = 'social__picture';
      avatarAndText.setAttribute('src', 'img/avatar-' + window.utility.getRandomInt(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg');
      avatarAndText.setAttribute('alt', AVATAR_ALT);
      avatarAndText.setAttribute('width', AVATAR_HEIGHT);
      avatarAndText.setAttribute('height', AVATAR_WIDTH);
      textBlock.insertAdjacentHTML('afterBegin', picture.comments[indexNumber]);
      if (maxIndexNumber >= picture.comments.length) {
        loadMore.classList.add('hidden');
      } else if (loadMore.classList.contains('hidden') && maxIndexNumber < picture.comments.length) {
        loadMore.classList.remove('hidden');
      }

    }
    return listElement;
  };

  var renderBigPicture = function (picture) {
    bigPicture.querySelector('img').src = picture.url;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = window.utility.getRandomElement(window.data.descriptions);
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    createNewElement(picture, picture.comments);
    document.addEventListener('keydown', onPopupEscPress);
    window.utility.findPopupCloseButton(bigPicture).addEventListener('click', onClosePress);
    loadMore.addEventListener('click', loadMoreComments);
  };

  var getIndexAndRender = function (evt) {
    var i = evt.currentTarget.getAttribute('data-index');
    renderBigPicture(window.data.pictures[i]);
    currentBigPicture = window.data.pictures[i];
  };

  var addBigPictureListener = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].addEventListener('click', getIndexAndRender);
    }
  };

  var removeOldElements = function () {
    var oldComments = bigPicture.querySelectorAll('.social__comment--text');
    for (var i = 0; i < oldComments.length; i++) {
      oldComments[i].remove();
    }
    maxIndexNumber = 5;
    indexNumber = 0;
  };

  var onClosePress = function () {
    removeOldElements();
    window.utility.addClassHidden(bigPicture);
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
    window.utility.findPopupCloseButton(bigPicture).removeEventListener('click', onClosePress);
    loadMore.removeEventListener('click', loadMoreComments);
  };


  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onClosePress();
    }
  };

  var loadMoreComments = function () {
    maxIndexNumber = maxIndexNumber + 5;
    createNewElement(currentBigPicture, currentBigPicture.comments);
  };

  return {
    addBigPictureListener: addBigPictureListener,
    renderBigPicture: renderBigPicture,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };

})();
